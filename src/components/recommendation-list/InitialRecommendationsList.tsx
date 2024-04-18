"use client";

import { ArrowRight } from "lucide-react";
import EmptyState from "../empty-state/EmptyState";
import Recommendation from "../recommendation/Recommendation";
import { useState, useEffect } from "react";
import { Category } from "@/schemas/form";
import { RecommendationDataSchemaType } from "@/schemas/recommendationSchema";
import { getInitialRecommendations } from "@/lib/actions";
import Link from "next/link";
import { toast } from "sonner";

interface Props {
  category: Category;
  sectionId: string;
}

export default function InitialRecommendationsList({
  category,
  sectionId,
}: Props) {
  const [recommendations, setRecommendations] = useState<
    RecommendationDataSchemaType[]
  >([]);

  useEffect(() => {
    async function getRecommendations() {
      try {
        const data = await getInitialRecommendations(category);

        setRecommendations(data);
      } catch (err) {
        toast.error("Erro ao obter recomendações.");
      }
    }

    getRecommendations();
  });

  return (
    <>
      {recommendations && recommendations.length > 0 ? (
        recommendations.map((recommendation) => (
          <Recommendation key={recommendation.id} data={recommendation} />
        ))
      ) : (
        <div className="mx-auto">
          <EmptyState />
        </div>
      )}

      {recommendations.length > 0 && (
        <Link
          href={`/recommendations/${sectionId}`}
          className="flex flex-col items-center hover:cursor-pointer group lg:-translate-y-12"
        >
          <ArrowRight className="size-10 text-primary" />
          <span className="text-xs font-medium group-hover:underline">
            Ver todas as recomendações
          </span>
        </Link>
      )}
    </>
  );
}
