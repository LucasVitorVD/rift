"use client";

import RecommendationList from "@/components/recommendation-list/RecommendationList";
import { getAllRecommendationsByCategory } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Category } from "@/schemas/form";

export default function AllRecommendations() {
  const params = useSearchParams()
  const category = params.get("category") as Category

  const {
    data: categoryRecommendations,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["categoryRecommendations", category],
    queryFn: () => getAllRecommendationsByCategory(category),
  });

  return (
    <section className="flex items-center justify-center flex-1 container py-6">
      <RecommendationList
        recommendations={categoryRecommendations ?? []}
        status={{ isLoading, error }}
        itemsAt="center"
      />
    </section>
  );
}
