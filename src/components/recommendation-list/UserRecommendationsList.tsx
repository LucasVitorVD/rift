"use client"

import useGetUserRecommendations from "@/hooks/useGetUserRecommendations";
import Recommendation from "../recommendation/Recommendation";
import EmptyState from "../empty-state/EmptyState";

export default function UserRecommendationsList({ filter }: { filter?: string }) {
  const { recommendations } = useGetUserRecommendations(filter)

  return (
    <div className="flex items-baseline justify-center flex-wrap gap-10">
      {recommendations && recommendations.length > 0 ? (
        recommendations.map((recommendation) => (
          <Recommendation 
            key={recommendation.id}
            data={recommendation}
            showActions
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