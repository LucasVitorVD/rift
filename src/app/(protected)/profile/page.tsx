"use client";

import { useAuthContext } from "@/context/AuthContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, SlidersHorizontal, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { user } = useAuthContext();

  return (
    <section className="container pt-6 space-y-10">
      <div className="flex justify-center">
        <div className="flex items-center gap-6">
          <Avatar className="size-28">
            <AvatarImage src={user?.photoURL ?? ""} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">Olá{` ${user?.displayName}`},</h1>
            <p>Veja, crie e gerencie suas recomendações aqui!</p>
          </div>
        </div>
      </div>

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
        <Dialog>
          <DialogTrigger>
            <Button className="flex gap-1">
              <Plus />
              Fazer recomendação
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <hr />

      <div className="flex items-center flex-wrap gap-10">
        <div className="space-y-4">
          <div className="w-[256px] h-[300px] bg-slate-600" /> {/* imagem */}
          <div>
            <h3>Título</h3>
            <p>Indicado por: Nome</p>
          </div>
          <Button variant="outline">Ver mais</Button>
        </div>

        <div className="space-y-4">
          <div className="w-[256px] h-[300px] bg-slate-600" /> {/* imagem */}
          <div>
            <h3>Título</h3>
            <p>Indicado por: Nome</p>
          </div>
          <Button variant="outline">Ver mais</Button>
        </div>
      </div>
    </section>
  );
}
