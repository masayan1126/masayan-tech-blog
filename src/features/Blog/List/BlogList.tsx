import type { Blog } from "@/libs/microcms/blog";
import { useCallback, useState } from "react";
import { Icon } from "@iconify/react";
import { BlogCardSide } from "@/features/Blog/List/BlogCardSide";

type Props = {
  posts: Blog[];
};

export const BlogList = ({ posts }: Props) => {
  const [sorted, setSorted] = useState<Blog[]>(posts);

  const sort = useCallback(() => {
    const sorted = [...posts].sort(() => Math.random() - 0.5);
    setSorted(sorted);
  }, [posts]);

  return (
    <section className="mb-20">
      <div className="flex sm:hidden">
        <Icon
          icon="material-symbols:sort"
          onClick={sort}
          style={{ fontSize: "26px", marginLeft: "auto" }}
          className="mb-10 mr-1"
        />
        <span>並び替え</span>
      </div>
      <div className="flex gap-3 mb-12">
        <button className="p-3 bg-blue-400 rounded hidden sm:block">
          新着順
        </button>
        <button className="p-3 bg-blue-400 rounded hidden sm:block">
          人気順
        </button>
        <button className="p-3 bg-blue-400 rounded">VSCode</button>
        <button className="p-3 bg-blue-400 rounded">フロントエンド</button>
        <button className="p-3 bg-blue-400 rounded">バックエンド</button>
      </div>

      <div className="gap-14 grid grid-cols-1 lg:grid-cols-2">
        {sorted.map((post) => (
          <BlogCardSide post={post} key={post.id} />
        ))}
      </div>
    </section>
  );
};