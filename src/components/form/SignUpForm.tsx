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
import GoogleIcon from "public/google";

export default function SignUpForm() {
  const [shouldShowPassword, setShouldShowPassword] = useState(false);
  const { signUp, googleSignIn } = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const continueTo = searchParams.get("continueTo");

  const form = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
  });

  const handleTabClick = (tab: string) => {
    router.replace(`/register?tab=${tab}`);
  }

  async function handleSigInWithGoogle() {
    try {
      await googleSignIn()

      router.replace(continueTo ?? "/")
    } catch (error) {
      toast.error('Erro ao fazer login. Tente novamente mais tarde.');
    }
  }

  async function handleSignUpWithEmailAndPassword(values: SignUpType) {
    try {
      const { email, password } = values;
      await signUp(email, password);

      router.replace(continueTo ?? "/");
    } catch (error) {
      toast.error(handleAuthError(error as AuthError));
    }
  }

  return (
    <div className="pt-4 px-10 space-y-6">
      <h3 className="text-3xl font-bold">Criar sua conta</h3>

      <Button
        variant="ghost"
        className="flex items-center gap-2 shadow-md w-full py-6"
        onClick={handleSigInWithGoogle}
      >
        <GoogleIcon width={20} height={20} />
        Criar com com Google
      </Button>

      <p className="flex items-center gap-4 font-bold text-sm text-muted-foreground before:content-[''] before:w-full before:h-px before:bg-gray-300 before:inline-block after:content-[''] after:w-full after:h-px after:bg-gray-300 after:inline-block">
        OU
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignUpWithEmailAndPassword)} className="space-y-8">
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
          <Button
            type="submit"
            className="w-full py-6"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? <Loader /> : <p>Criar conta</p>}
          </Button>
        </form>
      </Form>

      <p
        className="font-bold cursor-pointer group"
        onClick={() => handleTabClick("sign-in")}
      >
        Já tem uma conta?{" "}
        <span className="text-primary group-hover:underline">Fazer login</span>
      </p>
    </div>
  );
}
