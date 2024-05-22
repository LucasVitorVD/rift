import { Category } from "@/schemas/form";
import { UserProps } from "@/interfaces/user";
import { RecommendationProps } from "@/interfaces/recommendationTypes";

interface CategoryProps {
  id: number,
  name: string,
  recommendations: RecommendationProps[]
}

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

export async function getCategoryRecommendations(categoryName: Category) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories?category=${categoryName}`)

    if (!response.ok) throw new Error()

    const category: CategoryProps = await response.json()

    const recommendations: RecommendationProps[] = []
    const userIdSetList = new Set<string>()

    category.recommendations.slice(0, 3).forEach(recommendation => {
      if (!userIdSetList.has(recommendation.userId)) {
        userIdSetList.add(recommendation.userId)
        recommendations.push(recommendation)
      }
    })

    return recommendations
  } catch(err) {
    console.error("Erro ao obter recomendações da categoria: ", err)
    throw new Error(`Erro ao obter recomendações da categoria: ${categoryName}`)
  }
}

export async function getAllRecommendationsByCategory(categoryName: Category) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories?category=${categoryName}`)

    if (!response.ok) throw new Error()

    const category: CategoryProps = await response.json()

    return category.recommendations
  } catch (err) {
    console.log("Erro ao obter recomendações.", err)
    throw new Error("Erro ao obter recomendações.");
  }
}

export async function getUserRecommendations(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`)

    if (!response.ok) throw new Error()

    const userData: UserProps = await response.json()

    return userData.recommendations
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