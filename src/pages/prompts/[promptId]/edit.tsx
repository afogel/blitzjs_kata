import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import { UpdatePromptSchema } from "src/prompts/schemas"
import getPrompt from "src/prompts/queries/getPrompt"
import updatePrompt from "src/prompts/mutations/updatePrompt"
import { PromptForm, FORM_ERROR } from "src/prompts/components/PromptForm"

export const EditPrompt = () => {
  const router = useRouter()
  const promptId = useParam("promptId", "number")
  const userId = useParam("userId", "number")
  const [prompt, { setQueryData }] = useQuery(
    getPrompt,
    { id: promptId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updatePromptMutation] = useMutation(updatePrompt)

  return (
    <>
      <div>
        <h1>Edit Prompt {prompt.id}</h1>
        <pre>{JSON.stringify(prompt, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <PromptForm
            submitText="Update Prompt"
            schema={UpdatePromptSchema}
            initialValues={prompt}
            onSubmit={async (values) => {
              try {
                const updated = await updatePromptMutation({
                  id: prompt.id,
                  ...values,
                })
                await setQueryData(updated)
                await router.push(Routes.ShowPromptPage({ userId: userId!, promptId: updated.id }))
              } catch (error: any) {
                console.error(error)
                return {
                  [FORM_ERROR]: error.toString(),
                }
              }
            }}
          />
        </Suspense>
      </div>
    </>
  )
}

const EditPromptPage = () => {
  const userId = useParam("userId", "number")

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPrompt />
      </Suspense>

      <p>
        <Link href={Routes.PromptsPage({ userId: userId! })}>Prompts</Link>
      </p>
    </div>
  )
}

EditPromptPage.authenticate = true
EditPromptPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditPromptPage
