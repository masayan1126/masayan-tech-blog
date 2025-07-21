import { ARTICLES_PATH } from "@/features/Blog/List/constants/path";
import { useEffect, useRef, useState } from "react";

const categories = [
  { id: "ai", label: "AI" },
  { id: "visual-studio-code", label: "VisualStudioCode" },
  { id: "frontend", label: "フロントエンド" },
  { id: "python", label: "Python" },
  { id: "laravel", label: "Laravel" },
  { id: "php", label: "PHP" },
  { id: "typescript", label: "Typescript" },
];

export const BlogListSortByCategoryButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div
      className="relative"
      ref={containerRef}
      style={{ width: "200px", marginBottom: "20px" }}
    >
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="bg-white/80 text-gray-800 border border-gray-200 shadow-sm hover:bg-blue-50 hover:text-blue-700 focus:ring-2 focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-1 transition-colors duration-200"
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="category-dropdown"
      >
        人気のカテゴリ
        <svg
          className="w-2.5 h-2.5 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div
          style={{ position: "absolute" }}
          id="category-dropdown"
          className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow min-w-[180px] w-56 dark:bg-gray-700"
          role="listbox"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {categories.map((cat) => (
              <li key={cat.id}>
                <a
                  href={`/category/${cat.id}${ARTICLES_PATH}`}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="option"
                  aria-label={cat.label}
                >
                  {cat.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
