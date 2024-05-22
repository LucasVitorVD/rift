"use client";

import useGetResults from "@/hooks/useGetResults";
import SearchResult from "@/components/search-result/SearchResult";
import Loader from "@/components/loader/Loader";
import { Category } from "@/schemas/form";
import { toast } from "sonner";
import { SearchResultProps } from "@/interfaces/recommendationTypes";
import { useEffect, useRef } from "react";

interface Props extends React.ComponentProps<"div"> {
  category: Category;
  searchTerm: string;
  showSearchList: boolean,
  setShowSearchList: React.Dispatch<boolean>
  handleSelectResult: (result: SearchResultProps) => void;
}

export default function SearchResultsList({
  category,
  searchTerm,
  showSearchList,
  setShowSearchList,
  handleSelectResult,
  ...props
}: Props) {
  const searchListRef = useRef<HTMLDivElement>(null);

  const {
    data: results,
    isLoading,
    error,
  } = useGetResults(category, searchTerm);

  if (error) {
    toast.error(error.message);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchListRef.current && !searchListRef.current.contains(event.target as Node)) {
        setShowSearchList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div
      ref={searchListRef}
      className="z-10 w-full h-56 absolute top-[37px] rounded-b-md bg-white border-2 border-input shadow-sm overflow-y-scroll space-y-4 transition-all ease-in-out duration-300 animate-in fade-in slide-in-from-top-[1rem]"
    >
      {isLoading && (
        <div className="flex justify-center mt-4">
          <Loader />
        </div>
      )}

      {!isLoading && results && results.length > 0 && (
        results.map((result) => (
          <SearchResult
            key={result.id}
            result={result}
            handleSelectResult={handleSelectResult}
          />
        ))
      )}

      {!isLoading && results && results.length === 0 && (
        <p className="text-center mt-4">Sem resultados para: {searchTerm}</p>
      )}
    </div>
  );
}
