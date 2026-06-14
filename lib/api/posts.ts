import axios from 'axios';
import { apiBaseUrl } from '@/lib/env';
import type {
  BlogCreateRequest,
  Category,
  FetchBlogsParams,
  PaginatedBlogResponse,
} from '@/types/api';

export const api = axios.create({
  baseURL: apiBaseUrl,
  headers: { 'Content-Type': 'application/json' },
});

export const BLOGS_PAGE_SIZE = 24;

export async function fetchBlogs(params: FetchBlogsParams) {
  const { data } = await api.get<PaginatedBlogResponse>('/blog/blogs/', { params });
  return data;
}

export async function fetchBlogsSafe(params: FetchBlogsParams) {
  try {
    const data = await fetchBlogs(params);
    return { data } as const;
  } catch {
    return { error: "خطا در دریافت مقالات. لطفاً دوباره تلاش کنید." } as const;
  }
}

export async function fetchCategories() {
  const { data } = await api.get<Category[]>('/blog/blog-categories/');
  return data;
}

export async function createBlog(payload: BlogCreateRequest) {
  const { data } = await api.post('/blog/blog/', payload);
  return data;
}