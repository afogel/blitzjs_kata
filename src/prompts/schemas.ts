import { z } from "zod"

export const CreatePromptSchema = z.object({
  input: z.string(),
  output: z.string().optional(),
  id: z.string().optional(),
  user: z.object({
    connect: z.object({
      id: z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val) : undefined)),
    }),
  }),
  // template: __fieldName__: z.__zodType__(),
})

export const UpdatePromptSchema = CreatePromptSchema.merge(
  z.object({
    id: z.number(),
    userId: z.number(),
  })
)

export const DeletePromptSchema = z.object({
  id: z.number(),
})
