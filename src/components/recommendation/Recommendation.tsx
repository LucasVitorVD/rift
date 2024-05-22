"use client"

import { RecommendationProps } from "@/interfaces/recommendationTypes";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ActionButtons from "../action-buttons/ActionButtons";
import { getUserDetails } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
import { CategoryEnum } from "@/interfaces/category";
import { usePathname } from "next/navigation";

interface Props {
  recommendation: RecommendationProps;
}

export default function Recommendation({ recommendation }: Props) {
  const pathName = usePathname()

  const { data: user } = useQuery({
    queryKey: ["userDetails", recommendation.userId],
    queryFn: () => getUserDetails(recommendation.userId),
    enabled: !!recommendation.userId
  })

  return (
    <div
      className="space-y-4 pb-3 w-80 h-auto rounded-md shadow-lg transition-all hover:translate-x-2 hover:-translate-y-2"
      key={recommendation.id}
    >
      <Image
        src={recommendation.image}
        alt="Imagem da recomendação"
        height={250}
        width={250}
        data-category={CategoryEnum[recommendation.categoryId].toLowerCase()}
        className="mx-auto h-auto data-[category=livro]:bookImg data-[category=filme/série]:tvImg data-[category=música]:songImg"
      />
      <div className="px-1 space-y-2">
        <h3 className="font-bold text-wrap">{recommendation.name || <Skeleton />}</h3>
        {user && (
          <div className="flex items-center gap-3">
            <Image
              alt="usuário"
              src={user.picture}
              width={30}
              height={30}
              className="rounded-full"
            />
            <p>{user.name}</p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between px-1">
        <Dialog>
          <DialogTrigger className="border border-primary bg-background text-primary shadow-sm p-2 rounded-md transition-colors hover:bg-primary hover:text-secondary">
            Ver mais
          </DialogTrigger>
          <DialogContent>
            <div className="grid place-content-center space-y-4">
              <Image
                src={recommendation.image}
                alt="Imagem da recomendação"
                height={288}
                width={288}
                className="rounded-md mx-auto w-auto h-auto max-h-70"
              />
              <div>
                <p className="font-bold text-3xl mb-4 text-wrap">{recommendation.name}</p>
                {user && <p>Recomendado por: {user?.name}</p>}
                <p>Categoria: {CategoryEnum[recommendation.categoryId]}</p>
              </div>
              {recommendation.personalComment && (
                <div className="space-y-2">
                  <p className="font-bold text-2xl">Comentário:</p>
                  <p>{recommendation.personalComment ?? "Nenhum comentário pessoal."}</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
        {pathName === "/profile" && <ActionButtons data={recommendation} />}
      </div>
    </div>
  );
}