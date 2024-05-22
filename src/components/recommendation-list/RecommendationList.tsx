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
      data-itemsAt={itemsAt} 
      className="flex flex-col items-center justify-center gap-14 lg:flex-row lg:flex-wrap lg:items-baseline data-[itemsAt=start]:lg:justify-normal data-[itemsAt=center]:lg:justify-center"
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