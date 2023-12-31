import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdatePromptSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdatePromptSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const prompt = await db.prompt.update({ where: { id }, data })

    return prompt
  }
)
