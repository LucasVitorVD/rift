"use client";

import { usePathname } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { toast } from "sonner";
import security from "../../../public/security.svg";
import Image from "next/image";

export default function AuthGuard() {
  const pathname = usePathname();
  const { googleSignIn } = useAuthContext();

  async function handleSigInWithGoogle() {
    try {
      await googleSignIn();
    } catch (error) {
      toast.error("Erro ao fazer login. Tente novamente mais tarde.");
    }
  }

  return (
    <section className="flex items-center justify-center flex-1 pt-14">
      <div className="flex flex-col items-center gap-4">
        <Image src={security} alt="Ilustração" width={288} height={288} />

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
