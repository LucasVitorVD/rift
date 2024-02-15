"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import GoogleIcon from "public/google";
import SignInForm from "@/components/form/SignInForm";
import SignUpForm from "@/components/form/SignUpForm";
import { toast } from "sonner";
import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [currentTab, setCurrentTab] = useState<"sign-in" | "sign-up">("sign-in")
  const router = useRouter()
  const { googleSignIn } = useAuthContext()

  async function handleSigInWithGoogle() {
    try {
      await googleSignIn()

      router.push("/")
    } catch (error) {
      toast.error('Erro ao fazer login. Tente novamente mais tarde.');
    }
  }

  return (
    <section className="flex items-center justify-center h-screen bg-primary">
      <div className="flex justify-center absolute w-5/6 pb-10 bg-white rounded-md shadow-md z-10 overflow-hidden md:w-[530px]">
        <Tabs defaultValue="sign-in" value={currentTab} className="w-full">
          <TabsList>
            <TabsTrigger value="sign-in" onClick={() => setCurrentTab("sign-in")}>Login</TabsTrigger>
            <TabsTrigger value="sign-up" onClick={() => setCurrentTab("sign-up")}>Criar conta</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in" className="pt-4 px-10 space-y-6">
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

            <SignInForm />

            <p className="font-bold hover:underline">Esqueci minha senha</p>

            <p className="font-bold cursor-pointer group" onClick={() => setCurrentTab("sign-up")}>
              Não tem uma conta? <span className="text-primary group-hover:underline">Cadastrar</span>
            </p>
          </TabsContent>
          <TabsContent value="sign-up" className="pt-4 px-10 space-y-6">
            <h3 className="text-3xl font-bold">Criar sua conta</h3>

            <Button
              variant="ghost"
              className="flex items-center gap-2 shadow-md w-full py-6"
              onClick={handleSigInWithGoogle}
            >
              <GoogleIcon width={20} height={20} />
              Criar com com Google
            </Button>

            <p 
              className="flex items-center gap-4 font-bold text-sm text-muted-foreground before:content-[''] before:w-full before:h-px before:bg-gray-300 before:inline-block after:content-[''] after:w-full after:h-px after:bg-gray-300 after:inline-block"
            >
              OU
            </p>

            <SignUpForm />

            <p className="font-bold cursor-pointer group" onClick={() => setCurrentTab("sign-in")}>
              Já tem uma conta? <span className="text-primary group-hover:underline">Fazer login</span>
            </p>
          </TabsContent>
        </Tabs>
      </div>

      <video
        autoPlay
        muted
        loop
        preload="none"
        className="w-full h-full object-cover"
        src="/backgroundVideo.mp4"
      >
        <source src="/backgroundVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  );
}
