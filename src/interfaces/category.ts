import { RecommendationProps } from "./recommendationTypes";

export interface CategoryProps {
  id: number,
  name: string,
  recommendations: RecommendationProps[]
}

export enum CategoryEnum {
  "LIVRO" = 1,
  "MÚSICA",
  "FILME/SÉRIE",
}