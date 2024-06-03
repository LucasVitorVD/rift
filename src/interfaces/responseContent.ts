import { RecommendationProps } from "./recommendationTypes"

export interface ResponseContent {
  content: RecommendationProps[],
  pageNumber: number,
	pageSize: number,
	totalElements: number,
	totalPages: number,
	last: boolean
}