import { ArrowRight } from "lucide-react";
import Recommendation from "../recommendation/Recommendation";
import { Category } from "@/schemas/form";
import EmptyState from "../empty-state/EmptyState";
import Link from "next/link";
import { getInitialRecommendations } from "@/lib/actions";

interface ContentSectionProps extends React.ComponentProps<"section"> {
  title: string;
  description: string;
  category: Category;
}

export default async function ContentSection({
  title,
  description,
  category,
  ...props
}: ContentSectionProps) {
  const recommendationsList = await getInitialRecommendations(category)

  return (
    <section
      className="container py-20 space-y-10 border-b-2 border-b-slate-200"
      {...props}
    >
      <div className="space-y-6">
        <div className="w-14 h-1 bg-primary" />
        <h2 className="text-2xl font-bold md:text-5xl">{title}</h2>
        <p className="text-sm font-medium">{description}</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-14 lg:flex-row lg:justify-normal">
        {recommendationsList && recommendationsList.length > 0 ? (
          recommendationsList.map((recommendation) => (
            <Recommendation key={recommendation.id} data={recommendation} />
          ))
        ) : (
          <div className="mx-auto">
            <EmptyState />
          </div>
        )}

        {recommendationsList.length > 0 && (
          <Link href={`/recommendations/${props.id}`} className="flex flex-col items-center hover:cursor-pointer group lg:-translate-y-12">
            <ArrowRight className="size-10 text-primary" />
            <span className="text-xs font-medium group-hover:underline">
              Ver todas as recomendações
            </span>
          </Link>
        )}
      </div>
    </section>
  );
}
