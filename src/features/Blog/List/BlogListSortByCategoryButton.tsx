import { ARTICLES_PATH } from "@/features/Blog/List/constants/path";
import { type RefObject, useEffect, useRef, useState } from "react";

// BlogListFilterDropdown
export const BlogListSortByCategoryButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // DropDownのボタンをクリックした場合は、閉じずに開く
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleToggleClick = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  return (
    <div
      className="containerRef"
      ref={containerRef}
      style={{ width: "200px", marginBottom: "20px" }}
    >
      <button
        style={{ backgroundColor: "#ebecec", color: "#252525" }}
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="text-white focus:ring-4  font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center mb-1"
        type="button"
        onClick={handleToggleClick}
      >
        人気のカテゴリ{" "}
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
          id="dropdown"
          className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-1/2 dark:bg-gray-700"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <a
                href={`/category/visual-studio-code${ARTICLES_PATH}`}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                VisualStudioCode
              </a>
            </li>
            <li>
              <a
                href={`/category/frontend${ARTICLES_PATH}`}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                フロントエンド
              </a>
            </li>
            <li>
              <a
                href={`/category/python${ARTICLES_PATH}`}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Python
              </a>
            </li>
            <li>
              <a
                href={`/category/laravel${ARTICLES_PATH}`}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Laravel
              </a>
            </li>
            <li>
              <a
                href={`/category/php${ARTICLES_PATH}`}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                PHP
              </a>
            </li>
            <li>
              <a
                href={`/category/typescript${ARTICLES_PATH}`}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Typescript
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
