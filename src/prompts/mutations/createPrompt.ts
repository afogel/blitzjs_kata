import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreatePromptSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreatePromptSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const prompt = await db.prompt.create({ data: input })

    return prompt
  }
)
