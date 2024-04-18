import { db } from "@/firebase/config";
import { Category } from "@/schemas/form";
import { RecommendationDataSchemaType } from "@/schemas/recommendationSchema";
import { collection, query, where, limit, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { toast } from "sonner";

export async function getInitialRecommendations(category: Category) {
  const recommendationsRef = collection(db, "recommendations");

  const q = query(
    recommendationsRef,
    where("category", "==", category),
    limit(3)
  );

  const recommendations: RecommendationDataSchemaType[] = []
  const usersIds: { [id: string]: boolean } = {}

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const data = doc.data() as RecommendationDataSchemaType;

    if (!usersIds[data.userId]) {
      recommendations.push({ ...data, id: doc.id })
      usersIds[data.userId] = true;
    }
  });

  return recommendations
}

export async function addNewRecommendation(recommendation: Omit<RecommendationDataSchemaType, "id">) {
  try {
    await addDoc(collection(db, "recommendations"), recommendation);

    toast.success("Recomendação adicionada!");
  } catch (e) {
    toast.error("Erro ao adicionar recomendação.");
  }
}

export async function updateRecommendation(id: string, updatedRecommendation: RecommendationDataSchemaType) {
  try {
    await updateDoc(doc(db, "recommendations", id), updatedRecommendation);

    toast.success("Recomendação atualizada!");
  } catch (err) {
    toast.error("Erro ao atualizar recomendação.");
  }
}

export async function deleteRecommendation(id: string) {
  try {
    await deleteDoc(doc(db, "recommendations", id));
  } catch (err) {
    toast.error("Erro ao excluir a recomendação.");
  }
}