import { SearchResultProps } from "@/interfaces/recommendationTypes";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";

interface Props {
  result: SearchResultProps
  handleSelectResult?: (result: SearchResultProps) => void;
}

export default function SearchResult({ result, handleSelectResult }: Props) {
  return (
    <div
      className={`flex items-center gap-4 transition-colors hover:bg-muted ${handleSelectResult && "hover:cursor-pointer"}`}
      onClick={handleSelectResult ? () => handleSelectResult(result) : () => {}}
    >
      <Image
        src={result.image}
        alt="imagem da pesquisa"
        width="0"
        height="0"
        sizes="100vw"
        className="rounded-md w-16 h-auto"
      />

      <div className="space-y-px">
        <p className="font-medium line-clamp-2">
          {result.name ?? <Skeleton containerClassName="flex-1" />}
        </p>
        <p className="text-muted-foreground">
          {result.description ?? <Skeleton containerClassName="flex-1" />}
        </p>
      </div>
    </div>
  );
}
