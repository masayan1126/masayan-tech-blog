import type { Article } from "@/libs/microcms/blog";
import FormattedDate from "@/components/FormattedDate.astro";

import BlogCategoryBadgeGroup from "@/features/Blog/BlogCategoryBadgeGroup";
import { BlogListLink } from "@/features/Blog/List/BlogListLink";
import { Icon } from "@iconify/react";

type Props = {
  post: Article;
};

const cardStyle = {
  position: "relative" as const,
  overflow: "hidden",
  borderRadius: "12px",
  background: "rgba(255, 255, 255, 0.02)",
  backdropFilter: "blur(8px)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  transformOrigin: "center",
  cursor: "pointer",
  // 強制的にスタイルを適用
  minHeight: "200px",
  display: "block",
  width: "100%",
};

export const BlogCardSide = ({ post }: Props) => {
  const date = new Date(post.publishedAt);
  
  return (
    <div 
      className="modern-blog-card"
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(127, 167, 255, 0.15)";
        e.currentTarget.style.border = "1px solid rgba(127, 167, 255, 0.2)";
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
        // オーバーレイを表示
        const overlay = e.currentTarget.querySelector('.card-overlay') as HTMLElement;
        if (overlay) overlay.style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
        e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.08)";
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
        // オーバーレイを非表示
        const overlay = e.currentTarget.querySelector('.card-overlay') as HTMLElement;
        if (overlay) overlay.style.opacity = "0";
      }}
    >
      {/* Glassmorphism オーバーレイ */}
      <div 
        className="card-overlay"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, rgba(127, 167, 255, 0.1), rgba(127, 167, 255, 0.05))",
          opacity: 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      
      <div className="card-content" style={{ position: "relative", zIndex: 2, padding: "24px" }}>
        <h2 className="card-title text-xl font-bold mt-2 mb-4" style={{ 
          transition: "color 0.3s ease",
          color: "var(--text-color)"
        }}>
          {post.title}
        </h2>
        
        <BlogCategoryBadgeGroup
          categories={post.category.map((c) => {
            return {
              id: c.id,
              name: c.name,
            };
          })}
        />
        
        <div className="text-sm mt-3" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
          <Icon icon="material-symbols:calendar-month" className="w-5 h-5 mr-1 inline-block align-middle text-gray-300" />
          公開日:
          <time dateTime={date.toISOString()}>
            {date.toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "short",
              day: "numeric",
              weekday: "short",
            })}
          </time>
        </div>
        
        <div className="mt-4">
          <BlogListLink
            className="text-sm text-link modern-link"
            href={`/blog/${post.id}/`}
            style={{
              display: "inline-block",
              padding: "8px 16px",
              background: "rgba(127, 167, 255, 0.1)",
              border: "1px solid rgba(127, 167, 255, 0.2)",
              borderRadius: "6px",
              transition: "all 0.3s ease",
              textDecoration: "none",
            }}
          >
            この記事を読む
          </BlogListLink>
        </div>
      </div>
    </div>
  );
};
