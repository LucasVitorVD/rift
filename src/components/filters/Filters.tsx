import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { SlidersHorizontal } from "lucide-react";

export default function Filters() {
  return (
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
  );
}