import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import GoogleIcon from "public/google";
import SignInForm from "@/components/form/SignInForm";

export default function LoginPage() {
  return (
    <section className="flex items-center justify-center h-screen bg-primary">
      <div className="flex justify-center absolute w-5/6 pb-10 bg-white rounded-md shadow-md z-10 overflow-hidden md:w-[530px]">
        <Tabs defaultValue="sign-in" className="w-full">
          <TabsList>
            <TabsTrigger value="sign-in">Login</TabsTrigger>
            <TabsTrigger value="sign-up">Criar conta</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in" className="pt-4 px-10 space-y-6">
            <h3 className="text-3xl font-bold">Entre com a sua conta</h3>

            <Button
              variant="ghost"
              className="flex items-center gap-2 shadow-md w-full py-6"
            >
              <GoogleIcon width={20} height={20} />
              Entrar com Google
            </Button>

            <p className="text-center">Ou entre com os dados cadastrados:</p>

            <SignInForm />

            <p className="font-bold hover:underline">Esqueci minha senha</p>

            <p className="font-bold group">
              Não tem conta? <span className="text-primary group-hover:underline">Cadastrar</span>
            </p>
          </TabsContent>
          <TabsContent value="sign-up">Change your password here.</TabsContent>
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
