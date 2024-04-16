"use client"

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Filters() {
  const searchParams = useSearchParams()
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleQuery(term: string) {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <form className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Search 
          className="text-primary size-7 rounded-full ring-1 ring-primary p-1"
        />
        <Input 
          className="rounded-full" 
          placeholder="Pesquisar..." 
          onChange={(e) => handleQuery(e.target.value)}
          defaultValue={searchParams.get('search')?.toString()}
        />
      </div>
    </form>
  );
}