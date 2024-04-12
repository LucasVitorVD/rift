"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { toast } from "sonner";

export default function AddRecommendationButton() {
  const router = useRouter();
  const { googleSignIn, user, loading } = useAuthContext();

  async function handleAddRecommendation() {
    if (!user) {
      try {
        await googleSignIn()

        return
      } catch (error) {
        toast.error('Erro ao fazer login. Tente novamente mais tarde.');
      }
    } else {
      router.push("/profile?r=true");
    }
  }

  return (
    <div className="space-x-6">
      <Button onClick={handleAddRecommendation} disabled={loading}>
        <Plus size="20px" className="mr-1" />
        Fazer recomendação
      </Button>
    </div>
  );
}
