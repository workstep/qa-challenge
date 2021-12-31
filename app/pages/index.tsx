import { useEffect, useState } from "react"
import { Head, usePaginatedQuery, useRouter, BlitzPage, Routes, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCandidates from "app/candidates/queries/getCandidates"
import updateCandidate from "app/candidates/mutations/updateCandidate"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import clsx from "clsx"

import { CandidateStepForm, STEPS } from "app/candidates/components/CandidateStepForm"
import { FORM_ERROR } from "app/candidates/components/CandidateForm"

const ITEMS_PER_PAGE = 100

export const CandidatesList = ({ candidates }) => {
  const router = useRouter()
  const [updateCandidateMutation] = useMutation(updateCandidate)

  return (
    <div className="flex w-full">
      <table className="border-collapse">
        <thead>
          <tr className="border-b border-gray-300 text-sm uppercase text-gray-350">
            <th className="pb-1 pt-2.5 pr-10 font-normal text-left">Candidate</th>
            <th className="pb-1 pt-2.5 pr-10 font-normal text-left">Date Interviewed</th>
            <th className="pb-1 pt-2.5"></th>
          </tr>
        </thead>
        <tbody>
          {candidates &&
            candidates.length > 0 &&
            candidates
              .filter((candidate) => {
                return candidate
              })
              .map((candidate) => {
                return (
                  <tr key={candidate.id} className="border-b border-gray-300">
                    <td className="py-3 pr-10">{candidate.name}</td>
                    <td className="py-3 pr-10 text-gray-450">
                      {new Date(candidate.interviewed_at).toDateString()}
                    </td>
                    <td className="py-3">
                      <CandidateStepForm
                        initialValues={{ step: candidate.step }}
                        onSubmit={async (values) => {
                          try {
                            await updateCandidateMutation({
                              id: candidate.id,
                              ...values,
                            })
                            router.reload()
                          } catch (error: any) {
                            console.error(error)
                            return {
                              [FORM_ERROR]: error.toString(),
                            }
                          }
                        }}
                      />
                    </td>
                  </tr>
                )
              })}
        </tbody>
      </table>
    </div>
  )
}

const Home: BlitzPage = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ candidates }] = usePaginatedQuery(getCandidates, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const [filteredCandidates, setFilteredCandidates] = useState(candidates)
  const [currentStep, setCurrentStep] = useState<string | null>(null)
  const [currentQuery, setCurrentQuery] = useState<string | null>(null)

  useEffect(() => {
    setFilteredCandidates(candidates)
  }, [candidates])

  const candidatesCountByStep = (step: string) => {
    return candidates?.filter((candidate) => candidate.step === step).length
  }

  const handleStepChange = (step: string | null) => {
    setCurrentStep(step)

    if (step === null) {
      setFilteredCandidates(candidates)
      return
    }

    const candidatesForStep = candidates?.filter((candidate) => candidate.step === step)
    setFilteredCandidates(candidatesForStep)
  }

  const handleSearchQuery = (query: string | null) => {
    setCurrentQuery(query)

    if (query === null) {
      setFilteredCandidates(candidates)
      return
    }

    const candidatesForStep = candidates?.filter((candidate) => candidate.name.includes(query))
    setFilteredCandidates(candidatesForStep)
  }

  return (
    <>
      <Head>
        <title>Workstep QA Challenge</title>
      </Head>

      <div className="container mx-auto py-10">
        <div className="flex justify-around w-8/12 mx-auto">
          <div className="flex w-4/12">
            <ul className="uppercase space-y-4 mt-20">
              <li
                className={clsx("border-l-4 pl-3 font-bold text-md cursor-pointer", {
                  "border-teal-650": currentStep === null,
                  "border-transparent": currentStep !== null,
                })}
                onClick={() => handleStepChange(null)}
              >
                All Candidates ({candidates?.length})
              </li>
              {STEPS.map((step) => (
                <li
                  key={step}
                  className={clsx("border-l-4 pl-3 text-gray-450 cursor-pointer", {
                    "border-teal-650": currentStep === step,
                    "border-transparent": currentStep !== step,
                  })}
                  onClick={() => handleStepChange(step)}
                >
                  {step} ({candidatesCountByStep(step)})
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col w-8/12">
            <div className="relative">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute bottom-8 mb-0.5 w-4 text-gray-350 -scale-x-100 scale-y-100"
              />
              <input
                onChange={(e) => handleSearchQuery(e.target.value)}
                type="search"
                className="w-1/2 mb-5 pr-0 pl-7 border-0 border-b-2 border-teal-650 outline-none focus:border-b-2 focus:border-teal-650 focus:outline-transparent focus:ring-0 text-gray-450 placeholder:text-gray-350"
                placeholder="Start typing to filter by name..."
              />
            </div>
            <CandidatesList candidates={filteredCandidates} />
          </div>
        </div>
      </div>
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Workstep QA Challenge">{page}</Layout>

export default Home
