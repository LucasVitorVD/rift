import { useAuthContext } from "@/context/AuthContext";
import { query, collection, where, onSnapshot } from "firebase/firestore"
import { db } from "@/firebase/config";
import { RecommendationDataSchemaType } from "@/schemas/recommendationSchema";
import { useState, useEffect } from "react";

export default function useGetUserRecommendations() {
  const [recommendations, setRecommendations] = useState<RecommendationDataSchemaType[] | undefined>(undefined);
  const { user } = useAuthContext();

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, "recommendations"), where("userId", "==", user?.uid)), (querySnapshot) => {
      const results: RecommendationDataSchemaType[] = querySnapshot.docs.map((doc) => ({
        ...doc.data() as RecommendationDataSchemaType,
        id: doc.id
      }))
      setRecommendations(results);
    });
  
    return () => unsubscribe();
  }, [user?.uid]);

  return { recommendations }
}