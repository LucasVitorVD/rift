"use client";

import RecommendationDialog from "@/components/recomendation-dialog/RecomendationDialog";
import { useSession } from "next-auth/react";
import { getUserRecommendations } from "@/lib/actions";
import RecommendationList from "@/components/recommendation-list/RecommendationList";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Paginator from "@/components/paginator/Paginator";

export default function ProfilePage() {
  const params = useSearchParams();
  const currentPage = Number(params.get("page")) ?? 0
  const limit = 6
  const session = useSession();

  const {
    data: userRecommendations,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["userRecommendations", session.data?.user?.id!, currentPage],
    queryFn: () => getUserRecommendations(session.data?.user?.id!, currentPage, limit),
    staleTime: 600000, // 10 min,
    refetchInterval: 300000, // 5 min
    placeholderData: keepPreviousData
  });

  return (
    <section className="container pt-6 pb-12 space-y-10">
      <div className="flex justify-center">
        <div className="flex items-center gap-6 flex-wrap">
          <Avatar className="size-28 mx-auto md:mx-0">
            <AvatarImage src={session.data?.user?.image ?? ""} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="text-center md:text-start">
            <h1 className="text-2xl font-bold md:text-3xl">
              Olá {session.data?.user?.name ?? ""}
            </h1>
            <p>Veja, crie e gerencie suas recomendações aqui!</p>
          </div>
        </div>
      </div>

      <RecommendationDialog />

      <hr />

      <RecommendationList
        recommendations={userRecommendations ?? []}
        status={{ isLoading, error }}
        itemsAt="center"
      />

      <Paginator 
        paginationLimit={limit}
        totalItems={userRecommendations?.length ?? 0} 
        currentPage={currentPage} 
      />
    </section>
  );
}