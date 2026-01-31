import type { ArticlesResponse, Article } from "../blog";
import type { CategoryResponse } from "../category";
import type { CoursesResponse, Course } from "../course";
import { mockCategories } from "./categories";
import { sortedMockArticles } from "./articles";
import { sortedMockCourses } from "./courses";

export { mockCategories } from "./categories";
export { mockArticles, sortedMockArticles } from "./articles";
export { mockCourses, sortedMockCourses } from "./courses";

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

export const mockCoursesResponse: CoursesResponse = {
  totalCount: sortedMockCourses.length,
  offset: 0,
  limit: 100,
  contents: sortedMockCourses,
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

// IDでコースを取得
export const getMockCourseById = (id: string): Course | undefined => {
  return sortedMockCourses.find((course) => course.id === id);
};
