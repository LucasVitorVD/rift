"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import GoogleIcon from "public/google";

export default function GoogleAuthButton() {
  async function handleSigInWithGoogle() {
    const signInResponse = await signIn("google");

    if (signInResponse && signInResponse.error) {
      toast.error("Erro ao fazer login. Tente novamente mais tarde.")
    }
  }

  return (
    <Button
      variant="ghost"
      className="flex items-center gap-2 shadow-md py-6"
      onClick={handleSigInWithGoogle}
    >
      <GoogleIcon width={20} height={20} />
      Fazer Login
    </Button>
  );
}