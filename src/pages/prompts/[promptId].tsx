import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getPrompt from "src/prompts/queries/getPrompt"
import deletePrompt from "src/prompts/mutations/deletePrompt"

export const Prompt = () => {
  const router = useRouter()
  const promptId = useParam("promptId", "number")
  const userId = useParam("userId", "number")
  const [deletePromptMutation] = useMutation(deletePrompt)
  const [prompt] = useQuery(getPrompt, { id: promptId })

  return (
    <>
      <div>
        <h1>Prompt {prompt.id}</h1>
        <pre>{JSON.stringify(prompt, null, 2)}</pre>

        <Link href={Routes.EditPromptPage({ userId: userId!, promptId: prompt.id })}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deletePromptMutation({ id: prompt.id })
              await router.push(Routes.PromptsPage({ userId: userId! }))
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

const ShowPromptPage = () => {
  const userId = useParam("userId", "number")

  return (
    <div>
      <p>
        <Link href={Routes.PromptsPage({ userId: userId! })}>Prompts</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Prompt />
      </Suspense>
    </div>
  )
}

ShowPromptPage.authenticate = true
ShowPromptPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPromptPage
