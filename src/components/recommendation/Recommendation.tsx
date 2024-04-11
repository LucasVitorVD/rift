import { RecommendationDataSchemaType } from "@/schemas/recommendationSchema";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ActionButtons from "../action-buttons/ActionButtons";

interface Props {
  data: RecommendationDataSchemaType;
  showActions?: boolean
}

export default function Recommendation({ data, showActions }: Props) {
  return (
    <div
      className="space-y-4 pb-3 rounded-md shadow-lg transition-all hover:translate-x-2 hover:-translate-y-2"
      key={data.id}
    >
      <Image
        src={data.image}
        alt="Imagem da recomendação"
        height={250}
        width={250}
        style={{ maxHeight: 288 }}
        className={`mx-auto w-auto h-auto ${data.category === "livro" ? "rounded-t-md" : "rounded-md"}`}
      />
      <div>
        <h3 className="font-bold">{data.name || <Skeleton />}</h3>
        <p>{`Recomendado por: ${data.userName}` || <Skeleton />}</p>
      </div>
      <div className="flex items-center justify-between px-1">
        <Dialog>
          <DialogTrigger 
            className="border border-primary bg-background text-primary shadow-sm p-2 rounded-md transition-colors hover:bg-primary hover:text-secondary"
          >
            Ver mais
          </DialogTrigger>
          <DialogContent>
            <div className="grid place-content-center space-y-4">
              <Image
                src={data.image}
                alt="Imagem da recomendação"
                height={288}
                width={288}
                sizes="100vw"
                className="rounded-md mx-auto w-auto h-auto"
              />
              <div>
                <p className="font-bold text-3xl mb-4">{data.name}</p>
                <p>Recomendado por: {data.userName}</p>
                <p>Categoria: {data.category}</p>
              </div>
              {data.personalComment && (
                <div className="space-y-2">
                  <p className="font-bold text-2xl">Comentário:</p>
                  <p>{data.personalComment}</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
        {showActions && <ActionButtons data={data} />}
      </div>
    </div>
  );
}
