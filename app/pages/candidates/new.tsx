import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createCandidate from "app/candidates/mutations/createCandidate"
import { CandidateForm, FORM_ERROR } from "app/candidates/components/CandidateForm"

const NewCandidatePage: BlitzPage = () => {
  const router = useRouter()
  const [createCandidateMutation] = useMutation(createCandidate)

  return (
    <div>
      <h1>Create New Candidate</h1>

      <CandidateForm
        submitText="Create Candidate"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateCandidate}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const candidate = await createCandidateMutation(values)
            router.push(Routes.ShowCandidatePage({ candidateId: candidate.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.CandidatesPage()}>
          <a>Candidates</a>
        </Link>
      </p>
    </div>
  )
}

NewCandidatePage.authenticate = false
NewCandidatePage.getLayout = (page) => <Layout title={"Create New Candidate"}>{page}</Layout>

export default NewCandidatePage
