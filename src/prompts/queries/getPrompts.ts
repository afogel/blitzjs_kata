import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetPromptsInput
  extends Pick<Prisma.PromptFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetPromptsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: prompts,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.prompt.count({ where }),
      query: (paginateArgs) => db.prompt.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      prompts,
      nextPage,
      hasMore,
      count,
    }
  }
)
