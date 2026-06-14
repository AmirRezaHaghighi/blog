import { Suspense } from "react";
import { MagazineLoading } from "./loading";
import MagazineContent from "@/components/magazine/MagazineContent";
import type { BlogItem } from "@/types/api";
import { BLOGS_PAGE_SIZE, fetchBlogsSafe } from "@/lib/api/posts";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { House } from "lucide-react";

interface PageProps {
  searchParams: {
    q?: string;
    categories?: string;
    page?: string;
  };
}

function buildJsonLd(posts: BlogItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "مجله",
    description: "مجله تخصصی با مقالات آموزشی، راهنمای خرید و اخبار",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.content,
      datePublished: post.created_datetime,
      author: {
        "@type": "Organization",
        name: "نیم محتوا ما",
      },
      image: post.image,
    })),
  };
}

async function MagazinePageContent({
  searchParams,
}: {
  searchParams: PageProps["searchParams"];
}) {
  const page = Number(searchParams.page ?? "1");
  const search = searchParams.q ?? "";
  const category = searchParams.categories ?? "";

  const result = await fetchBlogsSafe({
    page,
    search,
    category,
  });

  if ("error" in result) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
          <h1 className="text-lg font-bold text-red-800">خطا در بارگذاری</h1>
          <p className="mt-2 text-sm text-red-600">{result.error}</p>
        </div>
      </div>
    );
  }

  const { results, count } = result.data;
  const jsonLd = buildJsonLd(results);
  const featuredPost = page === 1 ? results[0] : undefined;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <Breadcrumb items={[{name:"خانه",icon:House},{name:"مجله"}]}/>
        <MagazineContent
          posts={results}
          featuredPost={featuredPost}
          currentPage={page}
          totalPages={Math.max(1, Math.ceil(count / BLOGS_PAGE_SIZE))}
          searchQuery={search}
          selectedCategory={category}
        />
      </div>  
    </>
  );
}

export default function HomePage({ searchParams }: PageProps) {
  return (
    <Suspense fallback={<MagazineLoading />}>
      <MagazinePageContent searchParams={searchParams} />
    </Suspense>
  );
}
