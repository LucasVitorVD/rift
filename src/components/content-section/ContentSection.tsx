"use client";

import { getCategoryRecommendations } from "@/lib/actions";
import { Category } from "@/schemas/form";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import RecommendationList from "../recommendation-list/RecommendationList";
import { useQuery } from "@tanstack/react-query";

interface Props extends React.ComponentProps<"section"> {
  title: string;
  description: string;
  category: Category;
}

export default function ContentSection({
  title,
  description,
  category,
  ...props
}: Props) {
  const {
    data: recommendations,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["category", category],
    queryFn: () => getCategoryRecommendations(category, 3)
  });

  return (
    <>
      <section
        className="container py-20 space-y-10 border-b-2 border-b-slate-200"
        {...props}
      >
        <div className="space-y-6">
          <div className="w-14 h-1 bg-primary" />
          <h2 className="text-2xl font-bold md:text-5xl">{title}</h2>
          <p className="text-sm font-medium">{description}</p>
        </div>

        <div className="flex flex-col items-center gap-14 lg:flex-row">
          <RecommendationList
            recommendations={recommendations ?? []}
            status={{ isLoading, error }}
          />

          {recommendations && recommendations.length > 0 && (
            <Link
              href={`/recommendations?category=${category}`}
              className="flex flex-col items-center hover:cursor-pointer group lg:-translate-y-12"
            >
              <ArrowRight className="size-10 text-primary" />
              <span className="text-xs font-medium group-hover:underline">
                Ver todas as recomendações
              </span>
            </Link>
          )}
        </div>
      </section>
    </>
  );
}