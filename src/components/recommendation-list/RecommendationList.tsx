"use client"

import useGetRecommendations from "@/hooks/useGetRecommedations";
import Recommendation from "../recommendation/Recommendation";
import Loader from "../loader/Loader";

export default function RecommendationList() {
  const { recommendations, isLoading } = useGetRecommendations()

  return (
    <div className="flex items-baseline flex-wrap gap-10">
      {isLoading && <Loader></Loader>}

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
