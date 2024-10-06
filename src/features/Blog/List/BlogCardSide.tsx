import type { Article } from "@/libs/microcms/blog";
import FormattedDate from "@/components/FormattedDate.astro";

import BlogCategoryBadgeGroup from "@/features/Blog/BlogCategoryBadgeGroup";
import { BlogListLink } from "@/features/Blog/List/BlogListLink";

type Props = {
  post: Article;
};

const style = {
  padding: "0 20px 15px",
  //   background: "rgba(74, 74, 74, 0.3)",
  //   boxShadow: "0 2px 6px 0 rgba(68, 68, 68, 0.37)",
  backdropFilter: "blur(0px)",
  // -webkit-backdrop-filter: blur(0px),
  borderRadius: "4px",
  //   border: "1px solid rgba(255, 255, 255, 0.18)",
};

export const BlogCardSide = ({ post }: Props) => {
  const date = new Date(post.publishedAt);
  console.log(date);
  return (
    <div className="card card-skin" style={style}>
      <div className="">
        <div className="">
          <h2 className="card-title text-xl font-bold mt-8 mb-2">
            {post.title}
          </h2>
        </div>
        <BlogCategoryBadgeGroup
          categories={post.category.map((c) => {
            return {
              id: c.id,
              name: c.name,
            };
          })}
        />
        <div className="text-sm mt-1">
          公開日:
          <time datetime={date.toISOString()}>
            {date.toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "short",
              day: "numeric",
              weekday: "short", // 曜日を表示する場合は追加
            })}
          </time>
        </div>
        <div className="mt-3">
          <BlogListLink
            className="text-sm text-link"
            href={`/blog/${post.id}/`}
          >
            この記事を読む
          </BlogListLink>
        </div>
      </div>
    </div>
  );
};
