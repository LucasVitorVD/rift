"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession, signIn } from "next-auth/react";

export default function AddRecommendationButton() {
  const router = useRouter();
  const session = useSession()

  async function handleAddRecommendation() {
    if (session.status === "authenticated") {
      router.push("/profile?r=true");

      return
    }

    try {
      await signIn("google")
    } catch (error) {
      toast.error('Erro ao fazer login. Tente novamente mais tarde.');
    }
  }

  return (
    <div className="space-x-6">
      <Button onClick={handleAddRecommendation} disabled={session.status === "loading"}>
        <Plus size="20px" className="mr-1" />
        Fazer recomendação
      </Button>
    </div>
  );
}
