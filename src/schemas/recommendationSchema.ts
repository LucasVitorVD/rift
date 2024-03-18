import { z } from "zod";

export const RecommendationDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  personalComment: z.string().optional(),
  category: z.enum(["book", "song", "tv-show"]),
  userId: z.string()
})

export type RecommendationDataSchemaType = z.infer<typeof RecommendationDataSchema>