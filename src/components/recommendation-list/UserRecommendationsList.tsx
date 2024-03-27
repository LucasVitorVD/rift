"use client"

import useGetUserRecommendations from "@/hooks/useGetUserRecommendations";
import Recommendation from "../recommendation/Recommendation";

export default function UserRecommendationsList() {
  const { recommendations } = useGetUserRecommendations()

  return (
    <div className="flex items-baseline flex-wrap gap-10">
      {recommendations && recommendations.length > 0 ? (
        recommendations.map((recommendation) => (
          <Recommendation 
            key={recommendation.id}
            data={recommendation}
          />
        ))
      ) : (
        <p>Sem recomendações!</p>
      )}
    </div>
  );
}