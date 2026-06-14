"use client";

import { usePathname, useRouter } from "next/navigation";

interface MagazineNavigationParams {
  searchQuery: string;
  selectedCategory: string;
  currentPage: number;
}

export function useMagazineNavigation({
  searchQuery,
  selectedCategory,
  currentPage,
}: MagazineNavigationParams) {
  const router = useRouter();
  const pathname = usePathname();

  const navigate = (updates: {
    q?: string;
    categories?: string;
    page?: number;
  }) => {
    const params = new URLSearchParams();
    const q = updates.q ?? searchQuery;
    const category = updates.categories ?? selectedCategory;
    const page = updates.page ?? currentPage;

    if (q) params.set("q", q);
    if (category) params.set("categories", category);
    if (page > 1) params.set("page", String(page));

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return { navigate };
}
