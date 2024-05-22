import { z } from "zod";

export const recommendationFormSchema = z.object({
  category: z.enum(["livro", "música", "filme/série"], { required_error: "Campo obrigatório!" }),
  searchTerm: z.string({ required_error: "Campo obrigatório!" }),
  personalComment: z.string().max(200, "Limite de caracteres atingido!").optional(),
})

export type RecommendationFormType = z.infer<typeof recommendationFormSchema>
export type Category = "livro" | "música" | "filme/série"