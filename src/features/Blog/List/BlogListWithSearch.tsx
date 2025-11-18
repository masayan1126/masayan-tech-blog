import { useState, useMemo, useEffect } from 'react';
import { Icon } from '@iconify/react';
import type { Article } from '@/libs/microcms/blog';
import { BlogCardSide } from '@/features/Blog/List/BlogCardSide';
import { SearchBar } from '@/features/Search/SearchBar';
import buildPaginationItem from '@/features/Pagination/buildPaginationItem';
import { PRIMARY_COLOR } from '@/constants/colors';

interface BlogListWithSearchProps {
  allArticles: Article[];
  initialArticles: Article[];
  currentPage?: number;
  totalPages?: number;
  totalArticles?: number;
  pageSize?: number;
}

export const BlogListWithSearch = ({ 
  allArticles, 
  initialArticles,
  currentPage = 1,
  totalPages = 1,
  totalArticles = 0,
  pageSize = 10
}: BlogListWithSearchProps) => {
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // クライアントサイドでのみ実行
  useEffect(() => {
    setIsClient(true);
    setDisplayedArticles(initialArticles);
  }, [initialArticles]);

  // 検索結果を処理
  const handleSearchResults = (results: Article[]) => {
    setDisplayedArticles(results);
    setIsSearching(results.length !== allArticles.length);
  };

  // 現在表示すべき記事を取得
  const getCurrentPageArticles = () => {
    if (!isClient) {
      return initialArticles; // サーバーサイドでは初期記事を表示
    }
    
    if (isSearching) {
      // 検索時は全検索結果を表示
      return displayedArticles;
    } else {
      // 通常時はinitialArticles（既にpageSize分の記事が渡されている）
      return initialArticles;
    }
  };

  // 検索結果の表示
  const renderSearchResults = () => {
    const currentArticles = getCurrentPageArticles();
    
    if (currentArticles.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2 text-white">
            検索結果が見つかりませんでした
          </h3>
          <p className="text-white/60">
            別のキーワードで検索してみてください
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
        {currentArticles.map((article) => (
          <BlogCardSide post={article} key={article.id} />
        ))}
      </div>
    );
  };

  // ページネーションアイテムを生成（シンプルな実装）
  const generatePaginationItems = () => {
    const items = [];
    const maxVisible = 5; // 最大表示数
    
    if (totalPages <= maxVisible) {
      // ページ数が少ない場合は全て表示
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      // 現在のページを中心に表示
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + maxVisible - 1);
      
      // 最後のページが表示されない場合は調整
      if (end === totalPages) {
        start = Math.max(1, end - maxVisible + 1);
      }
      
      // 最初のページ
      if (start > 1) {
        items.push(1);
        if (start > 2) items.push('...');
      }
      
      // 中間のページ
      for (let i = start; i <= end; i++) {
        items.push(i);
      }
      
      // 最後のページ
      if (end < totalPages) {
        if (end < totalPages - 1) items.push('...');
        items.push(totalPages);
      }
    }
    
    return items;
  };

  // モバイル用のページネーションアイテムを生成（より少ない表示数）
  const generateMobilePaginationItems = () => {
    const items = [];
    const maxVisible = 3; // モバイル用は最大3ページ
    
    if (totalPages <= maxVisible) {
      // ページ数が少ない場合は全て表示
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      // 現在のページを中心に表示
      let start = Math.max(1, currentPage - 1);
      let end = Math.min(totalPages, start + maxVisible - 1);
      
      // 最後のページが表示されない場合は調整
      if (end === totalPages) {
        start = Math.max(1, end - maxVisible + 1);
      }
      
      // 最初のページ
      if (start > 1) {
        items.push(1);
        if (start > 2) items.push('...');
      }
      
      // 中間のページ
      for (let i = start; i <= end; i++) {
        items.push(i);
      }
      
      // 最後のページ
      if (end < totalPages) {
        if (end < totalPages - 1) items.push('...');
        items.push(totalPages);
      }
    }
    
    return items;
  };

  // ページネーションアイテムをレンダリング
  const renderPaginationItems = (items: (number | string)[]) => {
    return items.map((item, index) => (
      <li key={index} className="list-none">
        {item === '...' ? (
          <span className="flex justify-center items-center w-11 h-11 text-white/40">
            <span>{item}</span>
          </span>
        ) : (
          <a
            href={Number(item) === 1 ? "/page/1" : `/page/${item}`}
            className={`flex justify-center items-center w-11 h-11 rounded-xl transition-all duration-200 ${
              currentPage === Number(item)
                ? 'text-black shadow-lg'
                : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white'
            }`}
            style={currentPage === Number(item) ? { backgroundColor: PRIMARY_COLOR.hex } : undefined}
          >
            <span>{item}</span>
          </a>
        )}
      </li>
    ));
  };

  // ページネーションコンポーネント
  const renderPagination = () => {
    if (isSearching || totalPages <= 1) {
      return null;
    }

    const paginationItems = generatePaginationItems();
    const mobilePaginationItems = generateMobilePaginationItems();

    return (
      <div className="mt-12">
        {/* モバイル用ページネーション (768px以下) */}
        <div className="md:hidden">
          <ul className="flex items-center justify-center gap-2 p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl overflow-hidden">
            {/* 前のページ */}
            {currentPage > 1 && (
              <li className="list-none flex-shrink-0">
                <a
                  href={currentPage === 2 ? "/page/1" : `/page/${currentPage - 1}`}
                  className="flex justify-center items-center w-9 h-9 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-all duration-200 text-sm"
                >
                  ←
                </a>
              </li>
            )}

            {/* ページ番号 */}
            {mobilePaginationItems.map((item, index) => (
              <li key={index} className="list-none flex-shrink-0">
                {item === '...' ? (
                  <span className="flex justify-center items-center w-9 h-9 text-white/40 text-sm">
                    <span>{item}</span>
                  </span>
                ) : (
                  <a
                    href={Number(item) === 1 ? "/page/1" : `/page/${item}`}
                    className={`flex justify-center items-center w-9 h-9 rounded-lg transition-all duration-200 text-sm ${
                      currentPage === Number(item)
                        ? 'text-black shadow-lg'
                        : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white'
                    }`}
                    style={currentPage === Number(item) ? { backgroundColor: PRIMARY_COLOR.hex } : undefined}
                  >
                    <span>{item}</span>
                  </a>
                )}
              </li>
            ))}

            {/* 次のページ */}
            {currentPage < totalPages && (
              <li className="list-none flex-shrink-0">
                <a
                  href={`/page/${currentPage + 1}`}
                  className="flex justify-center items-center w-9 h-9 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-all duration-200 text-sm"
                >
                  →
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* デスクトップ用ページネーション (769px以上) */}
        <div className="hidden md:block">
          <ul className="flex items-center justify-center gap-3 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
            {/* 前のページ */}
            {currentPage > 1 && (
              <li className="list-none">
                <a
                  href={currentPage === 2 ? "/page/1" : `/page/${currentPage - 1}`}
                  className="flex justify-center items-center w-11 h-11 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all duration-200"
                >
                  ←
                </a>
              </li>
            )}

            {/* ページ番号 */}
            {renderPaginationItems(paginationItems)}

            {/* 次のページ */}
            {currentPage < totalPages && (
              <li className="list-none">
                <a
                  href={`/page/${currentPage + 1}`}
                  className="flex justify-center items-center w-11 h-11 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all duration-200"
                >
                  →
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="blog-list-with-search">
      {/* 検索バー */}
      <SearchBar 
        allArticles={allArticles} 
        onSearchResults={handleSearchResults}
      />
      
      {/* 検索結果ヘッダー */}
      {isSearching && (
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold mb-2 text-white">
            検索結果
          </h2>
          <p className="text-white/60">
            {displayedArticles.length}件の記事が見つかりました
          </p>
        </div>
      )}

      {/* 通常表示時のヘッダー */}
      {!isSearching && (
        <div className="mb-8 flex items-center justify-between">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2 text-white">記事一覧</h2>
            {totalPages > 1 && (
              <p className="text-white/60">
                全{totalArticles}件中 {((currentPage - 1) * pageSize) + 1}〜{Math.min(currentPage * pageSize, totalArticles)}件を表示
              </p>
            )}
          </div>
          <a
            href="/rss.xml"
            aria-label="RSSフィード"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition-colors"
            style={{ 
              borderColor: PRIMARY_COLOR.hex,
              color: PRIMARY_COLOR.hex
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#E5AD35';
              e.currentTarget.style.color = '#E5AD35';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = PRIMARY_COLOR.hex;
              e.currentTarget.style.color = PRIMARY_COLOR.hex;
            }}
          >
            <Icon icon="mdi:rss" width={22} height={22} />
            <span className="hidden sm:inline">RSS</span>
          </a>
        </div>
      )}
      
      {/* 記事一覧 */}
      <section className="mb-20">
        {renderSearchResults()}
      </section>

      {/* ページネーション - 検索中は非表示 */}
      {renderPagination()}
    </div>
  );
};
