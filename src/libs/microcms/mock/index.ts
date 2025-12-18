import type { ArticlesResponse, Article } from "../blog";
import type { CategoryResponse } from "../category";
import { mockCategories } from "./categories";
import { sortedMockArticles } from "./articles";

export { mockCategories } from "./categories";
export { mockArticles, sortedMockArticles } from "./articles";

export const mockArticlesResponse: ArticlesResponse = {
  totalCount: sortedMockArticles.length,
  offset: 0,
  limit: 100,
  contents: sortedMockArticles,
};

export const mockCategoriesResponse: CategoryResponse = {
  totalCount: mockCategories.length,
  offset: 0,
  limit: 100,
  contents: mockCategories,
};

// カテゴリでフィルタリングされた記事を取得
export const getMockArticlesByCategory = (categoryId: string): Article[] => {
  return sortedMockArticles.filter((article) =>
    article.category.some((c) => c.id === categoryId)
  );
};

// IDで記事を取得
export const getMockArticleById = (id: string): Article | undefined => {
  return sortedMockArticles.find((article) => article.id === id);
};
