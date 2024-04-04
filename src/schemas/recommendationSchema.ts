import { z } from "zod";

export const RecommendationDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  personalComment: z.string().optional(),
  category: z.enum(["livro", "música", "filme/série"]),
  userId: z.string(),
  userName: z.string().optional().nullish()
})

export type RecommendationDataSchemaType = z.infer<typeof RecommendationDataSchema>