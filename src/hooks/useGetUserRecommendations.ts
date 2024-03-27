import { useAuthContext } from "@/context/AuthContext";
import { query, collection, where, getDocs } from "firebase/firestore"
import { db } from "@/firebase/config";
import { RecommendationDataSchemaType } from "@/schemas/recommendationSchema";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function useGetUserRecommendations() {
  const [recommendations, setRecommendations] = useState<RecommendationDataSchemaType[] | undefined>(undefined);
  const { user } = useAuthContext();

  const recommendationsRef = collection(db, "recommendations");
  const q = query(recommendationsRef, where("userId", "==", user?.uid))

  useEffect(() => {
    async function getData() {
      try {
        const querySnapshot = await getDocs(q);

        const results: RecommendationDataSchemaType[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data() as RecommendationDataSchemaType;
          results.push(data);
        });

        setRecommendations(results);
      } catch(error) {
        toast.error("Erro ao obter dados.")
      }
    }

    getData();

    return () => {}
  }, [user, q])

  return { recommendations }
}