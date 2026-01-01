import { FETCH_POSTS_MAX_LIMIT } from "@/constants/article";
import type { MicroCMSQueries } from "microcms-js-sdk";
import { client, IS_DEV_MODE } from "./config";
import { mockCategoriesResponse } from "./mock";

export type ArticleCategory = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
};

export type CategoryResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: ArticleCategory[];
};

export const getCategories = async (
  queries: MicroCMSQueries = {
    limit: FETCH_POSTS_MAX_LIMIT,
  }
) => {
  // 開発環境ではモックデータを返す
  if (IS_DEV_MODE) {
    return mockCategoriesResponse;
  }
  return await client.get<CategoryResponse>({
    endpoint: "categories",
    queries,
  });
};
