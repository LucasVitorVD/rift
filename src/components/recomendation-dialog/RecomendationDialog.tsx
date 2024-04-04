"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from "react";
import RecommendationForm from "../form/RecommendationForm";

export default function RecommendationDialog() {
  const searchParams = useSearchParams();
  const [shouldOpenModal, setShouldOpenModal] = useState(false);

  useEffect(() => {
    const recommend = searchParams.get('r')

    if (recommend === 'true') {
      setShouldOpenModal(true)
    } else {
      setShouldOpenModal(false)
    }
  }, [searchParams]);

  return (
    <Dialog open={shouldOpenModal} onOpenChange={setShouldOpenModal}>
      <DialogTrigger>
        <Button className="flex gap-1">
          <Plus />
          Fazer recomendação
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-h-[97vh] md:overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Adicionar recomendação</DialogTitle>
        </DialogHeader>

        <RecommendationForm />
      </DialogContent>
    </Dialog>
  );
}