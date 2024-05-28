"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, Pencil } from "lucide-react";
import RecommendationForm from "@/components/form/RecommendationForm";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { RecommendationProps } from "@/interfaces/recommendationTypes";
import { useState } from "react";
import { deleteRecommendation } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
  data: RecommendationProps;
}

export default function ActionButtons({ data }: Props) {
  const [shouldOpenModal, setShouldOpenModal] = useState(false);
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get("page")) ?? 0
  const session = useSession();
  const queryClient = useQueryClient();

  const { mutateAsync: deleteRecommendationFn } = useMutation({
    mutationFn: deleteRecommendation,
    onSuccess: (result, variables) => {
      const id: string = variables

      queryClient.setQueryData(["userRecommendations", session.data?.user?.id!, currentPage], (oldData: RecommendationProps[]) => {
        return oldData.filter(recommendation => recommendation.id !== id)
      })

      toast.success("Recomendação excluída!");
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return (
    <>
      {data.userId === session.data?.user?.id && (
        <div className="flex items-center space-x-2">
          <Dialog open={shouldOpenModal} onOpenChange={setShouldOpenModal}>
            <DialogTrigger>
              <Pencil />
            </DialogTrigger>
            <DialogContent>
              <RecommendationForm
                previewData={data}
                setShouldOpenModal={setShouldOpenModal}
              />
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger>
              <Trash2 />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tem certeza que deseja exlcuir esta recomendação?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteRecommendationFn(data.id)}>
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </>
  );
}
