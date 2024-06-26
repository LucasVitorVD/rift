"use client";

import RecommendationList from "@/components/recommendation-list/RecommendationList";
import { getAllRecommendationsByCategory } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Category } from "@/schemas/form";
import Paginator from "@/components/paginator/Paginator";

export default function AllRecommendations() {
  const params = useSearchParams();
  const category = params.get("category") as Category;
  const currentPage = Number(params.get("page")) ?? 1
  const limit = 6

  const {
    data,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["categoryRecommendations", category, currentPage],
    queryFn: () => getAllRecommendationsByCategory(category, currentPage, limit),
    enabled: currentPage >= 0,
  });

  return (
    <section className="flex flex-col items-center justify-center flex-1 container gap-6 py-6">
      <RecommendationList
        recommendations={data?.content ?? []}
        status={{ isLoading, error }}
        itemsAt="center"
      />

      <Paginator 
        totalPages={data?.totalPages ?? 0}
        currentPage={currentPage}
        isLastPage={data?.last ?? false}
       />
    </section>
  );
}
