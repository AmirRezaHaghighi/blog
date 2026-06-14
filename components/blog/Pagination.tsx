"use client";

import { cn, formatPersianNumber } from "@/lib/utils";
import { ChevronLeft,ChevronRight } from "lucide-react";


type PageItem = number | "ellipsis";

function buildPageItems(pages: number[]): PageItem[] {
  const sorted = [...new Set(pages)]
    .filter((p) => p >= 1)
    .sort((a, b) => a - b);

  const items: PageItem[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      items.push("ellipsis");
    }
    items.push(sorted[i]);
  }
  return items;
}

function getPageItems(current: number, total: number): PageItem[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set<number>([1, 2, total - 1, total, current]);
  if (current > 1) pages.add(current - 1);
  if (current < total) pages.add(current + 1);

  return buildPageItems(
    [...pages].filter((p) => p >= 1 && p <= total),
  );
}

function getMobilePageItems(current: number, total: number): PageItem[] {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  return buildPageItems([1, current, total]);
}

const buttonBase =
  "inline-flex size-8 shrink-0 items-center justify-center rounded-lg border text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed md:size-10 md:text-sm";

function PageButtons({
  items,
  page,
  onChange,
}: {
  items: PageItem[];
  page: number;
  onChange: (p: number) => void;
}) {
  return (
    <>
      {items.map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="inline-flex size-8 items-center justify-center text-sm tracking-[0.2em] text-txt-secondary md:size-10 md:tracking-[0.25em]"
            aria-hidden="true"
          >
            ....
          </span>
        ) : (
          <button
            key={item}
            type="button"
            aria-label={`صفحه ${item}`}
            aria-current={item === page ? "page" : undefined}
            onClick={() => onChange(item)}
            className={cn(
              buttonBase,
              item === page
                ? "border-primary bg-primary text-bg"
                : "border-secondary bg-bg text-txt-secondary",
            )}
          >
            {formatPersianNumber(item)}
          </button>
        ),
      )}
    </>
  );
}

function PaginationControls({
  items,
  page,
  totalPages,
  onChange,
}: {
  items: PageItem[];
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  const isFirstPage = page <= 1;
  const isLastPage = page >= totalPages;

  return (
    <div dir="ltr" className="flex items-center gap-2">
      <button
        type="button"
        aria-label="صفحه قبلی"
        disabled={isFirstPage}
        onClick={() => onChange(page - 1)}
        className={cn(
          buttonBase,
          isFirstPage
            ? "border-transparent bg-gray text-txt-secondary"
            : "border-secondary bg-secondary text-bg",
        )}
      >
        <ChevronLeft className="size-5"/>
      </button>

      <PageButtons items={items} page={page} onChange={onChange} />

      <button
        type="button"
        aria-label="صفحه بعدی"
        disabled={isLastPage}
        onClick={() => onChange(page + 1)}
        className={cn(
          buttonBase,
          isLastPage
            ? "border-transparent bg-gray text-txt-secondary"
            : "border-secondary bg-secondary text-bg",
        )}
      >
        <ChevronRight className="size-5"/>
      </button>
    </div>
  );
}

export default function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;

  const desktopItems = getPageItems(page, totalPages);
  const mobileItems = getMobilePageItems(page, totalPages);

  return (
    <nav aria-label="صفحه‌بندی" className="flex w-full items-center justify-center">
      <div className="sm:hidden">
        <PaginationControls
          items={mobileItems}
          page={page}
          totalPages={totalPages}
          onChange={onChange}
        />
      </div>
      <div className="hidden sm:block">
        <PaginationControls
          items={desktopItems}
          page={page}
          totalPages={totalPages}
          onChange={onChange}
        />
      </div>
    </nav>
  );
}
