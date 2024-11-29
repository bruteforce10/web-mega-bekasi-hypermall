import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";

const Paginantion = ({ currentPage, totalPages }) => {
  const getVisiblePages = (current, total) => {
    const delta = 1;
    const range = [];

    for (
      let i = Math.max(1, current - delta);
      i <= Math.min(total, current + delta);
      i++
    ) {
      range.push(i);
    }
    return range;
  };

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={`?page=${Math.max(1, currentPage - 1)}`} />
        </PaginationItem>

        {visiblePages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={`?page=${page}`}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {currentPage + 1 < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href={`?page=${Math.min(totalPages, currentPage + 1)}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Paginantion;
