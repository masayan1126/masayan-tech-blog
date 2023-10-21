import type { Article } from "@/libs/microcms/blog";
import { useCallback, useState } from "react";
import { Icon } from "@iconify/react";
import { BlogCardSide } from "@/features/Blog/List/BlogCardSide";

type Props = {
  posts: Article[];
  articles: Article[];
};

export const BlogList = ({ posts, articles }: Props) => {
  const [sorted, setSorted] = useState<Article[]>(posts);
  //   const [searchTerm, setSearchTerm] = useState("");

  const sort = useCallback(() => {
    const sorted = [...posts].sort(() => Math.random() - 0.5);
    setSorted(sorted);
  }, [posts]);

  //   const filtered = allPosts.filter((post) => {
  //     return post.title.toLowerCase().includes(searchTerm.toLowerCase());
  //   });

  return (
    <section className="mb-20">
      {/* <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      /> */}
      {/* <div className="flex sm:hidden"> */}
      {/* <div className="" onClick={sort}>
        <Icon
          icon="material-symbols:sort"
          style={{ fontSize: "26px", marginRight: "auto" }}
          className="mr-2 mb-1 inline-block"
        />
        <span>並び替え</span>
      </div> */}
      {/* <SearchBar
        searchTerm={searchTerm}
        handleInputChange={handleInputChange}
      /> */}
      {/* <div className="flex gap-3 mb-12">
        <button className="p-3 bg-blue-400 rounded hidden sm:block">
          新着順
        </button>
        <button className="p-3 bg-blue-400 rounded hidden sm:block">
          人気順
        </button>
        <button className="p-3 bg-blue-400 rounded">VSCode</button>
        <button className="p-3 bg-blue-400 rounded">フロントエンド</button>
        <button className="p-3 bg-blue-400 rounded">バックエンド</button>
      </div> */}

      <div className="gap-14 grid grid-cols-1 lg:grid-cols-2">
        {sorted.map((post) => (
          <BlogCardSide post={post} key={post.id} />
        ))}
      </div>
    </section>
  );
};
