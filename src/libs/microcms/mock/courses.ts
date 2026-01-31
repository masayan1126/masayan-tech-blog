import type { Course } from "../course";
import { sortedMockArticles } from "./articles";

const createDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

const getArticleById = (id: string) => {
  const article = sortedMockArticles.find((a) => a.id === id);
  if (!article) throw new Error(`Article not found: ${id}`);
  return article;
};

export const mockCourses: Course[] = [
  {
    id: "mock-claude-code-course",
    createdAt: createDate(3),
    updatedAt: createDate(1),
    publishedAt: createDate(3),
    revisedAt: createDate(1),
    title: "Claude Code 完全マスターコース",
    description:
      "Claude Codeを入門から応用まで体系的に学ぶコースです。基本的な使い方からMCP連携、サブエージェント活用まで、実践的なスキルを身につけます。",
    eyecatch: {
      url: "/thum-sample/1.png",
      width: 1200,
      height: 630,
    },
    lessons: [
      {
        lesson_title: "Claude Codeの基本を理解しよう",
        article: getArticleById("mock-claude-code-intro"),
        estimated_minutes: 30,
      },
      {
        lesson_title: "Claude CodeでMCPを活用する",
        article: getArticleById("mock-claude-code-mcp"),
        estimated_minutes: 45,
      },
      {
        lesson_title: "応用テクニック：メモリ・サブエージェント・プラグイン",
        article: getArticleById("mock-claude-code-crash-course"),
        estimated_minutes: 60,
      },
    ],
  },
  {
    id: "mock-mcp-course",
    createdAt: createDate(7),
    updatedAt: createDate(2),
    publishedAt: createDate(7),
    revisedAt: createDate(2),
    title: "MCP（Model Context Protocol）実践ガイド",
    description:
      "MCPサーバーの構築からベストプラクティスまで、MCPを使いこなすための実践的なコースです。Claude Codeとの連携方法も学べます。",
    eyecatch: {
      url: "/thum-sample/2.png",
      width: 1200,
      height: 630,
    },
    lessons: [
      {
        lesson_title: "MCPサーバーを構築してみよう",
        article: getArticleById("mock-mcp-server-tutorial"),
        estimated_minutes: 50,
      },
      {
        lesson_title: "MCPのベストプラクティスを学ぶ",
        article: getArticleById("mock-mcp-best-practices"),
        estimated_minutes: 40,
      },
      {
        lesson_title: "Claude CodeからMCPを使う",
        article: getArticleById("mock-claude-code-mcp"),
        estimated_minutes: 45,
      },
    ],
  },
];

export const sortedMockCourses = [...mockCourses].sort(
  (a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);
