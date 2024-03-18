import { SearchResultSchemaType } from "@/schemas/searchResult";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";

interface Props {
  result: SearchResultSchemaType
  handleSelectResult?: (result: SearchResultSchemaType) => void;
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
        width={64}
        height={64}
        className="rounded-md"
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
