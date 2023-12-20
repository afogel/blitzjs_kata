import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useParam } from "@blitzjs/next"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "src/core/layouts/Layout"
import { CreatePromptSchema } from "src/prompts/schemas"
import createPrompt from "src/prompts/mutations/createPrompt"
import { PromptForm, FORM_ERROR } from "src/prompts/components/PromptForm"
import { Suspense } from "react"

const NewPromptPage = () => {
  const router = useRouter()
  const userId = useParam("userId", "number")
  const [createPromptMutation] = useMutation(createPrompt)

  return (
    <Layout title={"Create New Prompt"}>
      <h1>Create New Prompt</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <PromptForm
          submitText="Create Prompt"
          schema={CreatePromptSchema}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const prompt = await createPromptMutation({ ...values, userId: userId! })
              await router.push(Routes.ShowPromptPage({ userId: userId!, promptId: prompt.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </Suspense>
      <p>
        <Link href={Routes.PromptsPage({ userId: userId! })}>Prompts</Link>
      </p>
    </Layout>
  )
}

NewPromptPage.authenticate = true

export default NewPromptPage
