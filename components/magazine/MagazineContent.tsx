import BlogCard from "@/components/blog/BlogCard";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import type { BlogItem } from "@/types/api";

import { MagazinePagination } from "./MagazinePagination";
import { MagazineSidebar } from "./MagazineSidebar";

export interface MagazineContentProps {
  posts: BlogItem[];
  featuredPost?: BlogItem;
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  selectedCategory: string;
}

export default function MagazineContent({
  posts,
  featuredPost,
  currentPage,
  totalPages,
  searchQuery,
  selectedCategory,
}: MagazineContentProps) {
  const gridPosts = featuredPost
    ? posts.filter((post) => post.id !== featuredPost.id)
    : posts;

  const hasResults = featuredPost || gridPosts.length > 0;

  return (
      <div className="flex flex-col gap-8 lg:flex-row mt-4 lg:mt-8">
        <aside className="w-full lg:w-1/4">
          <MagazineSidebar
            currentPage={currentPage}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />
        </aside>
        <main className="flex-1 space-y-8 lg:w-3/4">
          {featuredPost && <FeaturedPost post={featuredPost} />}

          {gridPosts.length > 0 && (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {gridPosts.map((post) => (
                <BlogCard key={post.id} blog={post} />
              ))}
            </div>
          )}

          {!hasResults && (
            <p className="py-12 text-center text-txt-sec">
              مقاله‌ای یافت نشد.
            </p>
          )}

          <MagazinePagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />
        </main>   
      </div>
    
  );
}
