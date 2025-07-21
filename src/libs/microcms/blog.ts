import { FETCH_POSTS_MAX_LIMIT } from "@/constants/article";
import type { ArticleCategory } from "@/libs/microcms/category";
import { client } from "@/libs/microcms/config";
import type { MicroCMSQueries } from "microcms-js-sdk";

type ArticleEyecatch = {
  url: string;
  height: number;
  width: number;
};

export type Article = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  description: string;
  eyecatch: ArticleEyecatch;
  category: ArticleCategory[];
  youtube_link?: string; // Optional YouTube link for embedding
};

export type ArticlesResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: Article[];
};

export const getArticles = async (
  queries: MicroCMSQueries = { limit: FETCH_POSTS_MAX_LIMIT }
) => {
  return await client.get<ArticlesResponse>({ endpoint: "blogs", queries });
};
export const getArticlesByCategory = async (filters: string) => {
  const queries: MicroCMSQueries = { limit: FETCH_POSTS_MAX_LIMIT, filters };
  return await client.getList<Article>({ endpoint: "blogs", queries });
};
