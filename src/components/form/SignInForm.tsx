"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInType } from "@/schemas/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import signIn from "@/firebase/auth/signin";

export default function SignInForm() {
  const [shouldShowPassword, setShouldShowPassword] = useState(false);
  const router = useRouter()

  const form = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
  });

  async function handleSigInWithEmailAndPassword(values: SignInType) {
    const { email, password } = values

    const { error } = await signIn(email, password)

    if (error) {
      return toast.error('Erro ao fazer login. Tente novamente mais tarde.');
    } else {
      router.push("/")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSigInWithEmailAndPassword)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input data-testid="signInInput" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <div className="flex gap-4">
                <FormControl>
                  <Input
                    data-testid="signInInput"
                    type={shouldShowPassword ? "text" : "password"}
                    {...field}
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={() => setShouldShowPassword(!shouldShowPassword)}
                >
                  {shouldShowPassword ? <Eye /> : <EyeOff className="text-muted-foreground" />}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full py-6">
          Entrar
        </Button>
      </form>
    </Form>
  );
}
