import { getTracks } from "@/lib/api/spotify";
import { useQuery } from "@tanstack/react-query";
import type { Category } from "@/schemas/form";

const useGetResults = (category: Category, searchTerm: string) => {
  return useQuery({
    queryKey: ["resultData", searchTerm],
    queryFn: async () => {
      switch (category) {
        case "book":
          // api book...
          break;
        case "song": 
          return await getTracks(searchTerm)
        case "tv-show":
          // api tv-show...
        default:
          break;
      }
    },
    enabled: searchTerm !== "",
  });
};

export default useGetResults;