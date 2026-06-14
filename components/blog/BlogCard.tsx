import Image from "next/image";
import Link from "next/link";
import { Calendar, CircleUserRound, Eye } from "lucide-react";

import type { BlogItem } from "@/types/api";

const NOTCH_SIZE = "20%";

export default function BlogCard({ blog }: { blog: BlogItem }) {
  const formattedDate = new Date(blog.created_datetime).toLocaleDateString(
    "fa-IR",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    },
  );

  return (
    <article className="relative h-full">
      <div aria-hidden className="blog-card-bg absolute inset-0 border border-gray shadow-card" />

      <div className="relative z-[1] flex min-h-full flex-col gap-2 p-2 md:gap-3 md:p-3">
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-lg">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <span className="absolute left-3 top-3 rounded bg-secondary px-2 py-1 text-xs text-bg">
            {blog.category.title}
          </span>
        </div>

        <div className="flex flex-1 flex-col">
          <h3 className="line-clamp-2 text-sm text-txt md:text-lg">
            {blog.title}
          </h3>

          <footer
            className="mt-auto flex w-full items-end justify-start pt-2"
            style={{ minHeight: NOTCH_SIZE }}
          >
            <div className="flex flex-col items-start gap-1 text-xs text-txt-secondary md:text-sm">
              <span className="flex items-center gap-2">
                <Calendar className="size-5 shrink-0" aria-hidden="true" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-2">
                <CircleUserRound
                  className="size-5 shrink-0"
                  aria-hidden="true"
                />
                تیم محتوای ما
              </span>
            </div>
          </footer>
        </div>
      </div>

      <Link
        href=""
        className="absolute bottom-0 left-0 z-[2] flex aspect-square w-1/5 min-w-[36px] max-w-[52px] items-center justify-center rounded md:rounded-lg border border-gray bg-white shadow-card"
        aria-label={`مشاهده ${blog.title}`}
      >
        <Eye className="size-5 text-txt" aria-hidden="true" />
      </Link>
    </article>
  );
}
