"use client";

import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import security from "../../../public/security.svg";
import Image from "next/image";

export default function AuthGuard() {
  const pathname = usePathname();

  async function handleSigInWithGoogle() {
    try {
      await signIn("google");
    } catch (error) {
      toast.error("Erro ao fazer login. Tente novamente mais tarde.");
    }
  }

  return (
    <section className="flex items-center justify-center flex-1 py-14">
      <div className="flex flex-col items-center gap-4">
        <Image src={security} alt="Ilustração" width={288} height={288} sizes="100vw" priority />

        <div className="text-center">
          <pre>Você está tentando acessar: {pathname}</pre>
          <p>
            Por favor, faça{" "}
            <span
              className="underline text-blue-500 cursor-pointer"
              onClick={handleSigInWithGoogle}
            >
              Login
            </span>{" "}
            para continuar.
          </p>
        </div>
      </div>
    </section>
  );
}