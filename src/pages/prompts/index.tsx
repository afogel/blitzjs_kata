import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { usePaginatedQuery, useMutation, invalidateQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import Layout from "src/core/layouts/Layout"
import getPrompts from "src/prompts/queries/getPrompts"
import { PromptForm, FORM_ERROR } from "src/prompts/components/PromptForm"
import { CreatePromptSchema } from "src/prompts/schemas"
import createPrompt from "src/prompts/mutations/createPrompt"

const ITEMS_PER_PAGE = 5

export const PromptsList = () => {
  const currentUser = useCurrentUser()
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ prompts, hasMore }] = usePaginatedQuery(getPrompts, {
    where: { user: { id: currentUser?.id } },
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <>
      <ul>
        {prompts.map((prompt) => (
          <li key={prompt.id}>
            <Link href={Routes.ShowPromptPage({ promptId: prompt.id })}>{prompt.input}</Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </>
  )
}

const PromptsPage = () => {
  const [createPromptMutation] = useMutation(createPrompt)
  return (
    <Layout title="Prompts">
      <Suspense fallback={<div>Loading...</div>}>
        <PromptForm
          submitText="Create Prompt"
          // schema={CreatePromptSchema}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              await createPromptMutation({ ...values })
            } catch (error: any) {
              console.error(error)
              return { [FORM_ERROR]: error.toString() }
            }
            await invalidateQuery(getPrompts)
          }}
        />
        <PromptsList />
      </Suspense>
    </Layout>
  )
}

export default PromptsPage
PromptsPage.authenticate = true
