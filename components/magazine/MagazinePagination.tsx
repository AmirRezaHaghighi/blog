"use client";

import Pagination from "@/components/blog/Pagination";
import { useMagazineNavigation } from "@/hooks/useMagazineNavigation";

interface MagazinePaginationProps {
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  selectedCategory: string;
}

export function MagazinePagination({
  currentPage,
  totalPages,
  searchQuery,
  selectedCategory,
}: MagazinePaginationProps) {
  const { navigate } = useMagazineNavigation({
    searchQuery,
    selectedCategory,
    currentPage,
  });

  return (
    <div className="shrink-0">
      <Pagination
        page={currentPage}
        totalPages={totalPages}
        onChange={(page) => navigate({ page })}
      />
    </div>
  );
}
