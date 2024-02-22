"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpType } from "@/schemas/form";
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
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import Loader from "../loader/Loader";
import { handleAuthError } from "@/lib/utils";
import { AuthError } from "firebase/auth";

export default function SignUpForm() {
  const [shouldShowPassword, setShouldShowPassword] = useState(false);

  const { signUp } = useAuthContext()

  const router = useRouter();
  const searchParams = useSearchParams()
  const continueTo = searchParams.get("continueTo")

  const form = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit(values: SignUpType) {
    try {
      const { email, password } = values;
      await signUp(email, password)

      router.replace(continueTo ?? "/")
    } catch (error) {
      toast.error(handleAuthError(error as AuthError));
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input data-testid="signUpInput" {...field} />
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
              <FormLabel>Senha*</FormLabel>
              <div className="flex gap-4">
                <FormControl>
                  <Input
                    data-testid="signUpInput"
                    type={shouldShowPassword ? "text" : "password"}
                    {...field}
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={() => setShouldShowPassword(!shouldShowPassword)}
                >
                  {shouldShowPassword ? (
                    <Eye />
                  ) : (
                    <EyeOff className="text-muted-foreground" />
                  )}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confime sua senha*</FormLabel>
              <div className="flex gap-4">
                <FormControl>
                  <Input
                    data-testid="signUpInput"
                    type={shouldShowPassword ? "text" : "password"}
                    {...field}
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={() => setShouldShowPassword(!shouldShowPassword)}
                >
                  {shouldShowPassword ? (
                    <Eye />
                  ) : (
                    <EyeOff className="text-muted-foreground" />
                  )}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full py-6" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? <Loader /> : <p>Criar conta</p>}
        </Button>
      </form>
    </Form>
  );
}
