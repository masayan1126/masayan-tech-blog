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
             className="relative fadeUp category-button-container"
             ref={containerRef}
             style={{ marginBottom: "20px", zIndex: 1000 }}
           >
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className={`
          text-sm font-medium
          border-b-2 border-transparent
          hover:border-b-2 hover:border-blue-400
          transition-all duration-150
          ${isOpen ? 'border-blue-400' : ''}
        `}
        style={{
          color: 'var(--text-color)',
          padding: '0 0 4px 0',
          background: 'transparent',
          border: 'none',
          borderBottom: isOpen ? '2px solid rgb(46, 122, 255)' : '2px solid transparent',
          cursor: 'pointer'
        }}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="category-dropdown"
      >
        人気のカテゴリ ▼
      </button>
      {isOpen && (
        <div
          style={{ 
            position: "absolute",
            top: "calc(100% + 8px)",
            left: "0",
            minWidth: "200px",
            backgroundColor: 'var(--bg-color)',
            border: '1px solid var(--border-color)',
            borderRadius: '4px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            zIndex: 9999
          }}
          id="category-dropdown"
          role="listbox"
        >
          {categories.map((cat, index) => (
            <a
              key={cat.id}
              href={`/category/${cat.id}${ARTICLES_PATH}`}
              style={{
                display: 'block',
                padding: '8px 12px',
                color: 'var(--text-color)',
                textDecoration: 'none',
                fontSize: '14px',
                borderBottom: index === categories.length - 1 ? 'none' : '1px solid var(--border-color)'
              }}
              className="hover:opacity-75"
              role="option"
              aria-label={cat.label}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(127, 167, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {cat.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
