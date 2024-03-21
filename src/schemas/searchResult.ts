import { z } from "zod"

export const SearchResultSchema = z.object({
  id: z.string().optional(),
  image: z.string(),
  name: z.string(),
  description: z.string().optional()
})

export type SearchResultSchemaType = z.infer<typeof SearchResultSchema>