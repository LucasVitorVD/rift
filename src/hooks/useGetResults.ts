import { getTracks } from "@/lib/api/spotify";
import { getBooks } from "@/lib/api/books";
import { useQuery } from "@tanstack/react-query";
import type { Category } from "@/schemas/form";

const useGetResults = (category: Category, searchTerm: string) => {
  return useQuery({
    queryKey: ["resultData", searchTerm],
    queryFn: async () => {
      switch (category) {
        case "livro":
          return await getBooks(searchTerm)
        case "música": 
          return await getTracks(searchTerm)
        case "filme/série":
          // api tv-show...
        default:
          break;
      }
    },
    enabled: searchTerm !== "",
  });
};

export default useGetResults;