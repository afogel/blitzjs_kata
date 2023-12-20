import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeletePromptSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeletePromptSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const prompt = await db.prompt.deleteMany({ where: { id } })

    return prompt
  }
)
