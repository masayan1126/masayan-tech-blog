import BlogCategoryBadgeGroup from "@/features/Blog/BlogCategoryBadgeGroup";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("ブログのカテゴリバッチグループのコンポーネント", () => {
  const categories = [
    { id: "category-1", name: "React" },
    { id: "category-2", name: "TypeScript" },
    { id: "category-3", name: "Next.js" },
    { id: "category-4", name: "Vercel" },
  ];

  test("リンクのテキストがカテゴリ名になっている", async () => {
    const { getByText } = render(
      <BlogCategoryBadgeGroup categories={categories} />
    );

    categories.forEach((category) => {
      expect(getByText(category.name)).toBeInTheDocument();
    });
  });

  test("リンクのhrefがカテゴリごとの記事一覧へのurlになっている", () => {
    const { getByText } = render(
      <BlogCategoryBadgeGroup categories={categories} />
    );

    categories.forEach((category) => {
      const anchorElement = getByText(category.name).closest("a");
      expect(anchorElement).toBeInTheDocument();
      expect(anchorElement).toHaveAttribute(
        "href",
        `/category/${category.id}/page/1`
      );

      // 実際の遷移はテストできない(E2Eテストで行う)
      userEvent.click(getByText(category.name));
    });
  });
});
