"use client"

// import useGetUserRecommendations from "@/hooks/useGetUserRecommendations";
import Recommendation from "../recommendation/Recommendation";
import EmptyState from "../empty-state/EmptyState";
import { useState } from "react";

export default function UserRecommendationsList({ filter }: { filter?: string }) {
  // const { recommendations } = useGetUserRecommendations(filter)
  const [recommendations] = useState([])

  return (
    <div className="flex items-baseline justify-center flex-wrap gap-10">
      {recommendations && recommendations.length > 0 ? (
        recommendations.map((recommendation, i) => (
          <Recommendation 
            key={i}
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