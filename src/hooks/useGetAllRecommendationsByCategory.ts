import { query, collection, where, onSnapshot } from "firebase/firestore"
import { db } from "@/firebase/config";
import { RecommendationDataSchemaType } from "@/schemas/recommendationSchema";
import { useState, useEffect } from "react";
import { Category } from "@/schemas/form";

export default function useGetAllRecommendationsByCategory(category: Category) {
  const [recommendations, setRecommendations] = useState<RecommendationDataSchemaType[] | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, "recommendations"), where("category", "==", category)), (querySnapshot) => {
      const results: RecommendationDataSchemaType[] = querySnapshot.docs.map((doc) => ({
        ...doc.data() as RecommendationDataSchemaType,
        id: doc.id
      }))
      setRecommendations(results);
    });
  
    return () => unsubscribe();
  }, [category]);

  return { recommendations }
}