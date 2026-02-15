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

const BATCH_SIZE = 50;

// ビルド内メモ化: 同一クエリの結果をキャッシュしてAPI呼び出しを削減
const buildCache = new Map<string, ArticlesResponse>();

function getCacheKey(queries: MicroCMSQueries): string {
  return JSON.stringify(queries);
}

async function fetchArticlesWithPagination(
  queries: MicroCMSQueries
): Promise<ArticlesResponse> {
  const maxLimit = queries.limit || FETCH_POSTS_MAX_LIMIT;

  // 小さいリクエストはそのまま取得
  if (maxLimit <= BATCH_SIZE) {
    return await client.get<ArticlesResponse>({ endpoint: "blogs", queries });
  }

  // 大量取得時はページネーションで分割取得
  let allContents: Article[] = [];
  let offset = queries.offset || 0;
  let totalCount = 0;

  do {
    const batchLimit = Math.min(BATCH_SIZE, maxLimit - allContents.length);
    const res = await client.get<ArticlesResponse>({
      endpoint: "blogs",
      queries: { ...queries, limit: batchLimit, offset },
    });
    totalCount = res.totalCount;
    allContents = allContents.concat(res.contents);
    offset += batchLimit;
  } while (allContents.length < totalCount && allContents.length < maxLimit);

  return {
    totalCount,
    offset: 0,
    limit: maxLimit,
    contents: allContents,
  };
}

export const getArticles = async (
  queries: MicroCMSQueries = { limit: FETCH_POSTS_MAX_LIMIT }
): Promise<ArticlesResponse> => {
  // 開発環境ではモックデータを返す
  if (IS_DEV_MODE) {
    return mockArticlesResponse;
  }

  const cacheKey = getCacheKey(queries);
  const cached = buildCache.get(cacheKey);
  if (cached) return cached;

  const result = await fetchArticlesWithPagination(queries);
  buildCache.set(cacheKey, result);
  return result;
};

// contentフィールドを除外した軽量版（一覧・集計用）
const META_FIELDS =
  "id,title,description,publishedAt,revisedAt,updatedAt,createdAt,eyecatch,category,youtube_link";

export const getArticlesMeta = async (): Promise<ArticlesResponse> => {
  return getArticles({
    limit: FETCH_POSTS_MAX_LIMIT,
    fields: META_FIELDS,
  });
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
