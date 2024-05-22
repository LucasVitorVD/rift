import { getTracks } from "@/lib/api/spotify";
import { getBooks } from "@/lib/api/books";
import { getShows } from "@/lib/api/tv-shows";
import { useQuery } from "@tanstack/react-query";
import type { Category } from "@/schemas/form";

const useGetResults = (category: Category, searchTerm: string) => {
  return useQuery({
    queryKey: ["searchData", searchTerm],
    queryFn: async () => {
      switch (category) {
        case "livro":
          return await getBooks(searchTerm)
        case "música": 
          return await getTracks(searchTerm)
        case "filme/série":
          return await getShows(searchTerm)
        default:
          break;
      }
    },
    enabled: searchTerm !== "",
  });
};

export default useGetResults;