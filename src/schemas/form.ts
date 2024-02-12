import { z } from "zod";

export const signInSchema = z.object({
  email: z.string({ required_error: "Campo obrigatório!" })
    .email("E-mail inválido!"),
  password: z.string({ required_error: "Campo obrigatório!" })
    .min(5).max(20),
});

export const signUpSchema = z.object({
  email: z.string({ required_error: "Campo obrigatório!" })
    .email("E-mail inválido!"),
  password: z.string({ required_error: "Campo obrigatório!" })
    .min(5).max(20),
  confirmPassword: z.string({ required_error: "Campo obrigatório!" })
    .min(5).max(20),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem. Tente novamente.",
  path: ["confirmPassword"]
})

export type SignInType = z.infer<typeof signInSchema>
export type SignUpType = z.infer<typeof signUpSchema>