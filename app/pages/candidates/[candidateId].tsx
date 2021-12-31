import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCandidate from "app/candidates/queries/getCandidate"
import deleteCandidate from "app/candidates/mutations/deleteCandidate"

export const Candidate = () => {
  const router = useRouter()
  const candidateId = useParam("candidateId", "number")
  const [deleteCandidateMutation] = useMutation(deleteCandidate)
  const [candidate] = useQuery(getCandidate, { id: candidateId })

  return (
    <>
      <Head>
        <title>Candidate {candidate.id}</title>
      </Head>

      <div>
        <h1>Candidate {candidate.id}</h1>
        <pre>{JSON.stringify(candidate, null, 2)}</pre>

        <Link href={Routes.EditCandidatePage({ candidateId: candidate.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteCandidateMutation({ id: candidate.id })
              router.push(Routes.CandidatesPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowCandidatePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.CandidatesPage()}>
          <a>Candidates</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Candidate />
      </Suspense>
    </div>
  )
}

ShowCandidatePage.authenticate = false
ShowCandidatePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowCandidatePage
