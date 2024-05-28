import { RecommendationProps } from "@/interfaces/recommendationTypes";
import EmptyState from "../empty-state/EmptyState";
import Recommendation from "../recommendation/Recommendation";
import Loader from "../loader/Loader";
import ServerErrorState from "../serverErrorState/serverErrorState";

interface Props {
  recommendations: RecommendationProps[],
  status?: { isLoading: boolean, error: unknown }
  itemsAt?: "start" | "center"
}

export default function RecommendationList({ recommendations, status, itemsAt }: Props) {
  if (status?.isLoading) {
    return <Loader />
  }

  if (status?.error) {
    return <ServerErrorState />
  }

  return (
    <div
      data-itemsat={itemsAt} 
      className="flex flex-col items-center justify-center flex-wrap gap-14 lg:flex-row lg:items-baseline data-[itemsat=start]:lg:justify-normal data-[itemsat=center]:lg:justify-center"
    >
      {recommendations && recommendations.length > 0 ? (
        recommendations.map((recommendation) => (
          <Recommendation key={recommendation.id} recommendation={recommendation} />
        ))
      ) : (
        <div className="mx-auto w-full">
          <EmptyState />
        </div>
      )}
    </div>
  )
}