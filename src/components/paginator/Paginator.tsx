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
import { useCallback, useMemo } from "react";

interface Props {
  totalPages: number;
  currentPage: number;
  isLastPage: boolean;
}

export default function Paginator({
  totalPages,
  currentPage,
  isLastPage,
}: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, String(value));

      return params.toString();
    },
    [searchParams]
  );

  const pages: number[] = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  return (
    <>
      {totalPages > 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={
                  currentPage === 1
                    ? "#"
                    : pathname +
                      "?" +
                      createQueryString("page", currentPage - 1 ?? 0)
                }
              />
            </PaginationItem>
            <PaginationItem>
              {pages.map((page) => (
                <PaginationLink
                  key={page}
                  href={pathname + "?" + createQueryString("page", page)}
                  className={
                    currentPage === page ? "text-primary" : "text-black"
                  }
                >
                  {page}
                </PaginationLink>
              ))}
            </PaginationItem>
            {pages.length > 5 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                href={
                  isLastPage
                    ? "#"
                    : pathname +
                      "?" +
                      createQueryString("page", currentPage + 1 ?? 0)
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
