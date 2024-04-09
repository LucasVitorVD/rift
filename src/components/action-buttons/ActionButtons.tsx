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
import { RecommendationDataSchemaType } from "@/schemas/recommendationSchema";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { toast } from "sonner";

interface Props {
  data: RecommendationDataSchemaType;
}

export default function ActionButtons({ data }: Props) {
  async function handleDelete() {
    try {
      await deleteDoc(doc(db, "recommendations", data.id));
    } catch (err) {
      console.log(err);
      toast.error("Erro ao excluir a recomendação.");
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Dialog>
        <DialogTrigger>
          <Pencil />
        </DialogTrigger>
        <DialogContent>
          <RecommendationForm data={data} />
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
            <AlertDialogAction onClick={handleDelete}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}