import type { Blog } from "@/libs/microcms/blog";
import FormattedDate from "@/components/FormattedDate.astro";

import BlogCategoryBadgeGroup from "@/features/Blog/BlogCategoryBadgeGroup";
import { BlogListLink } from "@/features/Blog/List/BlogListLink";

type Props = {
  post: Blog;
};

export const BlogCardSide = ({ post }: Props) => {
  return (
    <div className="card card-skin">
      <div className="">
        <div className="">
          <h2 className="text-xl font-bold mt-8 mb-2">{post.title}</h2>
        </div>
        <BlogCategoryBadgeGroup
          categories={post.category.map((c) => {
            return {
              id: c.id,
              name: c.name,
            };
          })}
        />
        {/* <div className="text-sm mt-3">閲覧数: 20</div> */}
        <div className="text-sm">
          {/* <FormattedDate date={new Date(post.publishedAt)} /> */}
        </div>
        <div className="mt-3">
          <BlogListLink className="text-sm" href={`/blog/${post.id}/`}>
            この記事を読む
          </BlogListLink>
        </div>
      </div>
    </div>
  );
};
