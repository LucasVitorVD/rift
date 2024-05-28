import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

interface Props {
  paginationLimit: number,
  totalItems: number,
  currentPage: number
}

export default function Paginator({ paginationLimit, totalItems, currentPage }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: number) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, String(value))
 
      return params.toString()
    },
    [searchParams]
  )

  const totalPages: number[] = Array.from({ length: Math.ceil(totalItems / paginationLimit) }, (_, i) => i + 1);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={currentPage === 0 ? "#" : pathname + '?' + createQueryString("page", currentPage - 1 ?? 0)} />
        </PaginationItem>
        <PaginationItem>
          {totalPages.length > 0 && (
            totalPages.map(page => (
              <PaginationLink
                key={page} 
                href={pathname + '?' + createQueryString("page", page)}
              >
                {page}
              </PaginationLink>
            ))
          )}
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href={currentPage === totalPages.length ? "#" : pathname + '?' + createQueryString("page", currentPage + 1 ?? 0)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
