"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SlidersHorizontal, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import RecommendationForm from "../form/RecommendationForm";

export default function RecommendationDialog() {
  const searchParams = useSearchParams();

  const [shouldOpenModal, setShouldOpenModal] = useState(Boolean(searchParams.get("r")) ?? false)

  return (
    <div className="flex justify-between">
      <form className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Search className="text-primary size-7 rounded-full ring-1 ring-primary p-1" />
          <Input className="rounded-full" placeholder="Pesquisar..." />
        </div>
        <Popover>
          <PopoverTrigger className="flex items-center gap-2 font-medium rounded-full ring-1 ring-slate-400 focus:ring-primary hover:ring-primary px-4 py-1">
            <SlidersHorizontal className="text-primary size-4" />
            Filtrar
          </PopoverTrigger>
          <PopoverContent>Place content for the popover here.</PopoverContent>
        </Popover>
      </form>
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
    </div>
  );
}
