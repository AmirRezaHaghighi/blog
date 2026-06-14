import Image from "next/image";
import { CircleUserRound } from "lucide-react";
import type { BlogItem } from "@/types/api";

interface FeaturedPostProps {
  post: BlogItem;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <article className="rounded-lg md:rounded-xl bg-bg border border-gray p-2 md:p-3 shadow-card">
      <div className="flex flex-row gap-2 md:gap-3">
        <div className="flex flex-1 flex-col gap-4 self-stretch">
          <div className="w-full rounded bg-gray px-4 py-2 text-center text-xs md:text-sm text-txt-secondary">
            جدیدترین
          </div>

          <h2 className="text-sm md:text-lg text-txt">
            {post.title}
          </h2>

          <p className="hidden md:block md:line-clamp-3 md:text-base md:text-txt-secondary">
            {post.content}
          </p>

          <footer className="mt-auto flex items-center gap-2.5 md:gap-[20px] text-txt-secondary">
            <CircleUserRound className="size-5 md:size-10 text-secondary" aria-hidden="true" />
            <span className=" text-[7px] md:text-sm">تیم محتوای ما</span>
          </footer>
        </div>

        <div className="relative aspect-[16/10] w-1/2">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
          />
          <span className="absolute right-3 top-3 rounded bg-primary px-2 py-1 text-sm text-bg">
            {post.category.title}
          </span>
        </div>

      </div>
    </article>
  );
}
