import { useAuthContext } from "@/context/AuthContext";
import { query, collection, where, getDocs } from "firebase/firestore"
import { db } from "@/firebase/config";
import { RecommendationDataSchemaType } from "@/schemas/recommendationSchema";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function useGetRecommendations() {
  const [recommendations, setRecommendations] = useState<RecommendationDataSchemaType[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuthContext();

  const recommendationsRef = collection(db, "recommendations");
  const q = query(recommendationsRef, where("userId", "==", user?.uid));

  useEffect(() => {
    async function getData() {
      try {
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty || !user) {
          throw new Error()
        }

        const results: RecommendationDataSchemaType[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data() as RecommendationDataSchemaType;
          results.push(data);
        });

        setRecommendations(results);
      } catch(error) {
        toast.error("Erro ao obter dados.")
      } finally {
        setIsLoading(false)
      } 
    }

    getData();

    return () => {}
  }, [q, user])

  return { recommendations, isLoading }
}