import { CategoryEnum } from "./category"

export interface SearchResultProps {
  readonly id: string,
  image: string,
  name: string,
  description?: string,
  previewUrl?: string
}

export interface RecommendationProps extends SearchResultProps {
  personalComment?: string,
  categoryId: CategoryEnum,
  readonly userId: string
  readonly createdAt?: Date
  readonly updatedAt?: Date
}