"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useSearchParams } from 'next/navigation';
import { useState } from "react";
import RecommendationForm from "../form/RecommendationForm";

export default function RecommendationDialog() {
  const searchParams = useSearchParams();
  const [shouldOpenModal, setShouldOpenModal] = useState(Boolean(searchParams.get('r')) ?? false);

  return (
    <div className="flex justify-center md:justify-end">
      <Dialog open={shouldOpenModal} onOpenChange={setShouldOpenModal}>
        <DialogTrigger className="flex gap-1 bg-primary text-primary-foreground p-2 rounded-md shadow hover:opacity-90">
          <Plus />
          Fazer recomendação
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar recomendação</DialogTitle>
          </DialogHeader>
          <RecommendationForm setShouldOpenModal={setShouldOpenModal} />
        </DialogContent>
      </Dialog>
    </div>
  );
}