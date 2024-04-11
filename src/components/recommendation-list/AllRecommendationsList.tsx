"use client"

import useGetAllRecommendationsByCategory from "@/hooks/useGetAllRecommendationsByCategory";
import Recommendation from "@/components/recommendation/Recommendation";
import { Category } from "@/schemas/form";
import EmptyState from "../empty-state/EmptyState";

interface Props {
  category: Category
}

export default function AllRecommendationsList({ category }: Props) {
  const { recommendations } = useGetAllRecommendationsByCategory(category)

  return (
    <div className="flex items-baseline justify-center flex-wrap gap-10">
      {recommendations && recommendations.length > 0 ? (
        recommendations.map((recommendation) => (
          <Recommendation 
            key={recommendation.id}
            data={recommendation}
          />
        ))
      ) : (
        <div className="mx-auto">
          <EmptyState />
        </div>
      )}
    </div>
  );
}