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
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import RecommendationForm from "../form/RecommendationForm";
import { open } from "fs";

export default function RecommendationDialog() {
  const searchParams = useSearchParams();

  const [shouldOpenModal, setShouldOpenModal] = useState(
    Boolean(searchParams.get("r")) ?? false
  );

  return (
    <Dialog open={shouldOpenModal} onOpenChange={setShouldOpenModal}>
      <DialogTrigger>
        <Button className="flex gap-1">
          <Plus />
          Fazer recomendação
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar recomendação</DialogTitle>
        </DialogHeader>

        <RecommendationForm />
      </DialogContent>
    </Dialog>
  );
}