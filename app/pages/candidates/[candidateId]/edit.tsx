import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCandidate from "app/candidates/queries/getCandidate"
import updateCandidate from "app/candidates/mutations/updateCandidate"
import { CandidateForm, FORM_ERROR } from "app/candidates/components/CandidateForm"

export const EditCandidate = () => {
  const router = useRouter()
  const candidateId = useParam("candidateId", "number")
  const [candidate, { setQueryData }] = useQuery(
    getCandidate,
    { id: candidateId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateCandidateMutation] = useMutation(updateCandidate)

  return (
    <>
      <Head>
        <title>Edit Candidate {candidate.id}</title>
      </Head>

      <div>
        <h1>Edit Candidate {candidate.id}</h1>
        <pre>{JSON.stringify(candidate, null, 2)}</pre>

        <CandidateForm
          submitText="Update Candidate"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateCandidate}
          initialValues={candidate}
          onSubmit={async (values) => {
            try {
              const updated = await updateCandidateMutation({
                id: candidate.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowCandidatePage({ candidateId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditCandidatePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditCandidate />
      </Suspense>

      <p>
        <Link href={Routes.CandidatesPage()}>
          <a>Candidates</a>
        </Link>
      </p>
    </div>
  )
}

EditCandidatePage.authenticate = false
EditCandidatePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditCandidatePage
