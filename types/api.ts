export interface Category {
  id: number;
  title: string;
  blog_count: number;
}

export interface BlogCategoryRef {
  id: number;
  title: string;
}

export interface BlogItem {
  id: number;
  category: BlogCategoryRef;
  image: string;
  title: string;
  content: string;
  created_datetime: string;
}

export interface PaginatedBlogResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: BlogItem[];
}

export interface FetchBlogsParams {
  page?: number;
  category?: string;
  search?: string;
}

export interface BlogCreateRequest {
  category: number;
  title: string;
  content: string;
}
