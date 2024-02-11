import { z } from "zod";

export const signInSchema = z.object({
  email: z.string({ required_error: "Campo obrigatório!" })
    .email("E-mail inválido!"),
  password: z.string({ required_error: "Campo obrigatório!" }),
});

export type SignInType = z.infer<typeof signInSchema>