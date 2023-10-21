import { FETCH_POSTS_MAX_LIMIT } from "@/constants/article";
import type { BlogCategory } from "@/libs/microcms/blogCategory";
import { client } from "@/libs/microcms/config";
import type { MicroCMSQueries } from "microcms-js-sdk";

type BlogDetailEyecatch = {
  url: string;
  height: number;
  width: number;
};

export type Blog = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  description: string;
  eyecatch: BlogDetailEyecatch;
  category: BlogCategory[];
};

export type BlogResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: Blog[];
};

export const getBlogs = async (
  queries: MicroCMSQueries = { limit: FETCH_POSTS_MAX_LIMIT }
) => {
  return await client.get<BlogResponse>({ endpoint: "blogs", queries });
};
export const getBlogsByCategory = async (filters: string) => {
  const queries: MicroCMSQueries = { limit: FETCH_POSTS_MAX_LIMIT, filters };
  return await client.getList<Blog>({ endpoint: "blogs", queries });
};

export const getBlogDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client.getListDetail<Blog>({
    endpoint: "blogs",
    contentId,
    queries,
  });
};
