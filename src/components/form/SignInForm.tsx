"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInType } from "@/schemas/form";
import { useForm } from "react-hook-form";
import GoogleIcon from "public/google";
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
import { handleAuthError } from "@/lib/utils";
import Loader from "../loader/Loader";
import { AuthError } from "firebase/auth";

export default function SignInForm() {
  const [shouldShowPassword, setShouldShowPassword] = useState(false);
  const { signIn, googleSignIn } = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const continueTo = searchParams.get("continueTo");

  const form = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
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

  async function handleSignInWithEmailAndPassword(values: SignInType) {
    try {
      const { email, password } = values;
      await signIn(email, password);

      router.replace(continueTo ?? "/");
    } catch (error) {
      toast.error(handleAuthError(error as AuthError));
    }

    form.reset({ email: "", password: "" });
  }

  return (
    <div className="pt-4 px-10 space-y-6">
      <h3 className="text-3xl font-bold">Entre com a sua conta</h3>

      <Button
        variant="ghost"
        className="flex items-center gap-2 shadow-md w-full py-6"
        onClick={handleSigInWithGoogle}
      >
        <GoogleIcon width={20} height={20} />
        Entrar com Google
      </Button>

      <p className="text-center">Ou entre com os dados cadastrados:</p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSignInWithEmailAndPassword)}
          className="space-y-8"
        >
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
            role="signInButton"
          >
            {form.formState.isSubmitting ? <Loader /> : <p>Entrar</p>}
          </Button>
        </form>
      </Form>

      <p className="font-bold hover:underline">Esqueci minha senha</p>

      <p
        className="font-bold cursor-pointer group"
        onClick={() => handleTabClick("sign-up")}
      >
        Não tem uma conta?{" "}
        <span className="text-primary group-hover:underline">Cadastrar</span>
      </p>
    </div>
  );
}
