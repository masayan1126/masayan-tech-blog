import { FETCH_POSTS_MAX_LIMIT } from "@/consts";
import { createClient, MicroCMSQueries } from "microcms-js-sdk";
const client = createClient({
  serviceDomain: import.meta.env.VITE_MICRO_CMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.VITE_MICRO_CMS_API_KEY,
});

export type BlogCategory = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
};

export type BlogCategoryResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: BlogCategory[];
};

export const getCategories = async (
  queries: MicroCMSQueries = {
    limit: FETCH_POSTS_MAX_LIMIT,
  }
) => {
  return await client.get<BlogCategoryResponse>({
    endpoint: "categories",
    queries,
  });
};
