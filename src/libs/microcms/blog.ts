import { FETCH_POSTS_MAX_LIMIT } from "@/constants/article";
import type { ArticleCategory } from "@/libs/microcms/category";
import { client, IS_DEV_MODE } from "@/libs/microcms/config";
import type { MicroCMSQueries } from "microcms-js-sdk";
import {
  mockArticlesResponse,
  getMockArticlesByCategory,
  getMockArticleById,
  sortedMockArticles,
} from "./mock";

export type ArticleEyecatch = {
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
  eyecatch?: ArticleEyecatch;
  category: ArticleCategory[];
  youtube_link?: string; // Optional YouTube link for embedding
  more_readings?: Article[]; // Optional curated reading list
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
  // 開発環境ではモックデータを返す
  if (IS_DEV_MODE) {
    return mockArticlesResponse;
  }
  return await client.get<ArticlesResponse>({ endpoint: "blogs", queries });
};
export const getArticlesByCategory = async (filters: string) => {
  // 開発環境ではモックデータを返す
  if (IS_DEV_MODE) {
    // filtersからカテゴリIDを抽出 (例: "category[contains]claude-code")
    const match = filters.match(/category\[contains\]([a-z-]+)/);
    const categoryId = match ? match[1] : "";
    const filteredArticles = getMockArticlesByCategory(categoryId);
    return {
      totalCount: filteredArticles.length,
      offset: 0,
      limit: FETCH_POSTS_MAX_LIMIT,
      contents: filteredArticles,
    };
  }
  const queries: MicroCMSQueries = { limit: FETCH_POSTS_MAX_LIMIT, filters };
  return await client.getList<Article>({ endpoint: "blogs", queries });
};

export const getArticleDraft = async (id: string, draftKey: string) => {
  // 開発環境ではモックデータを返す（idに一致する記事、なければ最初の記事）
  if (IS_DEV_MODE) {
    const mockArticle = getMockArticleById(id) || sortedMockArticles[0];
    return mockArticle;
  }
  return await client.getListDetail<Article>({
    endpoint: "blogs",
    contentId: id,
    queries: { draftKey },
  });
};
