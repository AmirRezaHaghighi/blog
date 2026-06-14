"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import { createBlog, fetchCategories } from "@/lib/api/posts";
import { cn, formatPersianNumber } from "@/lib/utils";
import type { BlogCreateRequest, Category } from "@/types/api";

import { NewBlogModal } from "./NewBlogModal";
import { useMagazineNavigation } from "@/hooks/useMagazineNavigation";

interface MagazineSidebarProps {
  searchQuery: string;
  selectedCategory: string;
  currentPage: number;
}

export function MagazineSidebar({
  searchQuery,
  selectedCategory,
  currentPage,
}: MagazineSidebarProps) {
  const router = useRouter();
  const { navigate } = useMagazineNavigation({
    searchQuery,
    selectedCategory,
    currentPage,
  });

  const [query, setQuery] = useState(searchQuery);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    setIsCategoriesLoading(true);
    fetchCategories()
      .then(setCategories)
      .catch(() => setCategories([]))
      .finally(() => setIsCategoriesLoading(false));
  }, []);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    navigate({ q: query.trim(), page: 1 });
  };

  const handleCategoryToggle = (categoryId: number) => {
    const id = String(categoryId);
    navigate({
      categories: selectedCategory === id ? "" : id,
      page: 1,
    });
  };

  const handleCreateBlog = async (data: BlogCreateRequest) => {
    await createBlog(data);
    router.refresh();
  };

  return (
    <>
      <aside className="flex flex-col gap-6">
        <section aria-labelledby="search-heading">
          <h2
            id="search-heading"
            className="mb-1 text-sm md:text-lg text-txt-secondary"
          >
            جستجوی مجله
          </h2>

          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                id="search-query"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="مثال: راهنمای خرید و فروش"
                className="w-full h-[40px] rounded-lg border border-gray pl-4 pr-10 text-sm outline-none text-txt-secondary"
              />
              <button
                type="submit"
                className="w-6 h-6 absolute right-3 top-1/2 -translate-y-1/2 border-l border-gray"
                aria-label="جستجو"
              >
                <Search className="size-5 text-txt-secondary" />
              </button>
            </div>
          </form>
        </section>

        <section
          aria-labelledby="categories-heading"
          className="rounded-xl border border-gray"
        >
          <h2 id="categories-heading" className="bg-white text-lg text-primary">
            <button
              type="button"
              aria-expanded={isCategoriesOpen}
              aria-controls="categories-panel"
              onClick={() => setIsCategoriesOpen((open) => !open)}
              className="flex w-full items-center justify-between p-4 text-start"
            >
              <span className="text-txt-primary text-sm md:text-lg">دسته‌بندی‌ها</span>
              <ChevronDown
                className={cn(
                  "size-5 shrink-0 text-txt-primary transition-transform duration-200",
                  isCategoriesOpen && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>
          </h2>

          {isCategoriesOpen && (
            <div
              id="categories-panel"
              role="region"
              aria-labelledby="categories-heading"
              className="bg-white px-4 pb-4"
            >
              {isCategoriesLoading ? (
                <ul
                  className="flex flex-col gap-5"
                  aria-busy="true"
                  aria-label="در حال بارگذاری دسته‌بندی‌ها"
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <li key={index}>
                      <div className="h-6 animate-pulse rounded bg-gray" />
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="flex flex-col gap-5">
                  {categories.map((category) => {
                    const isChecked = selectedCategory === String(category.id);

                    return (
                      <li key={category.id}>
                        <label className="flex cursor-pointer items-center gap-3 text-base text-txt-secondary">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleCategoryToggle(category.id)}
                            className="size-4 rounded border-primary accent-primary"
                          />
                          <span>
                            {category.title}{" "}
                            <span className="text-txt-secondary">
                              ({formatPersianNumber(category.blog_count)})
                            </span>
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </section>

        <section aria-labelledby="add-blog-heading">
          <h2
            id="add-blog-heading"
            className="mb-1 text-sm md:text-lg text-txt-secondary"
          >
            اضافه کردن بلاگ
          </h2>

          <Button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full"
          >
            نوشتن بلاگ جدید
          </Button>
        </section>
      </aside>

      <NewBlogModal
        isOpen={isModalOpen}
        categories={categories}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateBlog}
        onSuccess={() =>
          toast.success("بلاگ با موفقیت ثبت و منتشر شد.")
        }
      />
    </>
  );
}
