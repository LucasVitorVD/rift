import { Category } from "@/schemas/form";
import { UserProps } from "@/interfaces/user";
import { RecommendationProps } from "@/interfaces/recommendationTypes";

export async function getUserDetails(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`)

    if (!response.ok) throw new Error()
      
    const user: UserProps = await response.json()

    return user
  } catch (err) {
    console.error("Erro ao obter dados do usuário.", err)
    throw new Error("Erro ao obter dados do usuário.")
  }
}

export async function getCategoryRecommendations(categoryName: Category, limit: number = 3) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recommendations?category=${categoryName}&size=${limit}`)

    if (!response.ok) throw new Error()

    const recommendations: RecommendationProps[] = await response.json()

    const recommendationsListSet: RecommendationProps[] = []
    const userIdSetList = new Set<string>()

    recommendations.forEach(recommendation => {
      if (!userIdSetList.has(recommendation.userId)) {
        userIdSetList.add(recommendation.userId)
        recommendationsListSet.push(recommendation)
      }
    })

    return recommendations
  } catch(err) {
    console.error("Erro ao obter recomendações da categoria: ", err)
    throw new Error(`Erro ao obter recomendações da categoria: ${categoryName}`)
  }
}

export async function getAllRecommendationsByCategory(categoryName: Category, page: number = 0, limit: number ) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recommendations?category=${categoryName}&page=${page}&size=${limit}`)

    if (!response.ok) throw new Error()

    const recommendations: RecommendationProps[] = await response.json()

    return recommendations
  } catch (err) {
    console.log("Erro ao obter recomendações.", err)
    throw new Error("Erro ao obter recomendações.");
  }
}

export async function getUserRecommendations(id: string, page: number = 0, limit: number) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recommendations/user/${id}?page=${page}&size=${limit}`)

    if (!response.ok) throw new Error()

    const userRecommendations: RecommendationProps[] = await response.json()

    return userRecommendations
  } catch (err) {
    console.error("Erro ao obter recomendações.", err)
    throw new Error("Erro ao obter recomendações.")
  }
}

export async function addNewRecommendation(recommendation: Omit<RecommendationProps, "id">) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recommendations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(recommendation)
    })

    if (!response.ok) throw new Error()

    const data: RecommendationProps = await response.json()

    return data
  } catch (err) {
    console.error("Erro ao adicionar recomendação.", err)
    throw new Error("Erro ao adicionar recomendação.");
  }
}

export async function updateRecommendation(updatedRecommendation: RecommendationProps) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recommendations`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedRecommendation)
    })

    if (!response.ok) throw new Error()

    const data: RecommendationProps = await response.json()

    return data
  } catch (err) {
    console.error("Erro ao atualizar recomendação.", err)
    throw new Error("Erro ao atualizar recomendação.");
  }
}

export async function deleteRecommendation(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recommendations/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) throw new Error()
  } catch (err) {
    console.error("Erro ao excluir a recomendação.", err)
    throw new Error("Erro ao excluir a recomendação.");
  }
}