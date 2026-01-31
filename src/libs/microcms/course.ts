import type { Article, ArticleEyecatch } from "@/libs/microcms/blog";
import { client, IS_DEV_MODE } from "@/libs/microcms/config";
import type { MicroCMSQueries } from "microcms-js-sdk";
import {
  mockCoursesResponse,
  getMockCourseById,
} from "./mock";

export type CourseLesson = {
  lesson_title: string;
  article: Article;
  estimated_minutes?: number;
};

export type Course = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  description: string;
  eyecatch?: ArticleEyecatch;
  lessons: CourseLesson[];
};

export type CoursesResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: Course[];
};

export const getCourses = async (
  queries: MicroCMSQueries = { limit: 100 }
) => {
  if (IS_DEV_MODE) {
    return mockCoursesResponse;
  }
  return await client.get<CoursesResponse>({ endpoint: "courses", queries });
};

export const getCourse = async (id: string) => {
  if (IS_DEV_MODE) {
    const course = getMockCourseById(id);
    if (!course) throw new Error(`Course not found: ${id}`);
    return course;
  }
  return await client.getListDetail<Course>({
    endpoint: "courses",
    contentId: id,
  });
};
