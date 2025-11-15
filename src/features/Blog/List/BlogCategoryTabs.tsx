import { ARTICLES_PATH } from "@/features/Blog/List/constants/path";
import { useEffect, useState } from "react";

type Category = {
  id: string;
  label: string;
  count: number;
};

type Props = {
  categories: Category[];
  totalArticles: number;
  currentCategoryId: string | null;
};

export const BlogCategoryTabs = ({ categories, totalArticles, currentCategoryId }: Props) => {
  const [isClient, setIsClient] = useState(false);

  // クライアントサイドでのみ実行
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div
      className="category-tabs-container fadeUp"
      style={{
        marginBottom: "24px",
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "8px",
          minWidth: "min-content",
          paddingBottom: "8px",
        }}
      >
        {/* すべて */}
        <a
          href={ARTICLES_PATH}
          className="category-tab"
          data-active={currentCategoryId === null}
          style={{
            display: "inline-block",
            padding: "8px 16px",
            fontSize: "14px",
            fontWeight: currentCategoryId === null ? "700" : "400",
            color: "var(--text-color)",
            textDecoration: "none",
            whiteSpace: "nowrap",
            borderBottom: currentCategoryId === null ? "2px solid #F3BC45" : "2px solid transparent",
            transition: "all 0.2s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            if (currentCategoryId !== null) {
              e.currentTarget.style.backgroundColor = "rgba(243, 188, 69, 0.15)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          すべて ({totalArticles})
        </a>

        {/* カテゴリタブ */}
        {categories.map((cat) => (
          <a
            key={cat.id}
            href={`/category/${cat.id}${ARTICLES_PATH}`}
            className="category-tab"
            data-active={currentCategoryId === cat.id}
            style={{
              display: "inline-block",
              padding: "8px 16px",
              fontSize: "14px",
              fontWeight: currentCategoryId === cat.id ? "700" : "400",
              color: "var(--text-color)",
              textDecoration: "none",
              whiteSpace: "nowrap",
              borderBottom: currentCategoryId === cat.id ? "2px solid #F3BC45" : "2px solid transparent",
              transition: "all 0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              if (currentCategoryId !== cat.id) {
                e.currentTarget.style.backgroundColor = "rgba(243, 188, 69, 0.15)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            {cat.label} ({cat.count})
          </a>
        ))}
      </div>

      <style>{`
        .category-tabs-container::-webkit-scrollbar {
          height: 6px;
        }
        .category-tabs-container::-webkit-scrollbar-track {
          background: transparent;
        }
        .category-tabs-container::-webkit-scrollbar-thumb {
          background: rgba(128, 128, 128, 0.3);
          border-radius: 3px;
        }
        .category-tabs-container::-webkit-scrollbar-thumb:hover {
          background: rgba(128, 128, 128, 0.5);
        }
      `}</style>
    </div>
  );
};
