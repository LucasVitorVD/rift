import { RecommendationProps } from "./recommendationTypes";

export interface UserProps {
  id: string,
  name: string,
  email: string,
  picture: string,
  recommendations: RecommendationProps[]
}