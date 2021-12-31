import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCandidates from "app/candidates/queries/getCandidates"

const ITEMS_PER_PAGE = 100

export const CandidatesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ candidates, hasMore }] = usePaginatedQuery(getCandidates, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.id}>
            <Link href={Routes.ShowCandidatePage({ candidateId: candidate.id })}>
              <a>{candidate.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const CandidatesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Candidates</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewCandidatePage()}>
            <a>Create Candidate</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <CandidatesList />
        </Suspense>
      </div>
    </>
  )
}

CandidatesPage.authenticate = false
CandidatesPage.getLayout = (page) => <Layout>{page}</Layout>

export default CandidatesPage
