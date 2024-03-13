import { SearchResult as Props } from "@/interfaces/searchResult";
import Image from "next/image"
import { Plus } from "lucide-react"

export default function SearchResult({ ...result }: Props) {
  return (
    <div className="flex items-center gap-4 transition-colors hover:cursor-pointer hover:bg-muted">
      <Image src={result.image} alt="imagem da pesquisa" width={64} height={64} className="rounded-md" />

      <div className="flex items-center justify-between flex-1">
        <div className="space-y-px">
          <p className="font-medium line-clamp-2">{result.name}</p>
          <p className="text-muted-foreground">{result.description ?? ""}</p>
        </div>

        <Plus className="text-muted-foreground cursor-pointer" />
      </div>
    </div>
  );
}