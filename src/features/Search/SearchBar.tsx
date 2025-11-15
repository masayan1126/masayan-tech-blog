import { useState, useEffect, useMemo } from 'react';
import type { Article } from '@/libs/microcms/blog';
import { Icon } from '@iconify/react';

// 簡易的な検索クラス
class SimpleSearch {
  constructor(private articles: Article[]) {}
  
  search(query: string): Article[] {
    if (!query.trim()) {
      return this.articles;
    }
    
    const queryLower = query.toLowerCase();
    return this.articles.filter(article => {
      const title = article.title.toLowerCase();
      const description = article.description.toLowerCase();
      const content = article.content.toLowerCase();
      const categories = article.category.map(cat => cat.name.toLowerCase()).join(' ');
      
      return title.includes(queryLower) || 
             description.includes(queryLower) || 
             content.includes(queryLower) ||
             categories.includes(queryLower);
    });
  }
}

interface SearchBarProps {
  allArticles: Article[];
  onSearchResults: (results: Article[]) => void;
}

export const SearchBar = ({ allArticles, onSearchResults }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const search = useMemo(() => {
    return new SimpleSearch(allArticles);
  }, [allArticles]);

  // クライアントサイドでのみ実行
  useEffect(() => {
    setIsClient(true);
  }, []);

  // デバウンス機能付きのリアルタイム検索（クライアントサイドでのみ実行）
  useEffect(() => {
    if (!isClient) return;

    const timeoutId = setTimeout(() => {
      if (searchTerm.trim() === '') {
        // 空の場合は全記事を表示
        onSearchResults(allArticles);
        setIsSearching(false);
      } else {
        // 検索実行
        setIsSearching(true);
        const results = search.search(searchTerm);
        onSearchResults(results);
        setIsSearching(false);
      }
    }, 300); // 300msのデバウンス

    return () => clearTimeout(timeoutId);
  }, [searchTerm, search, onSearchResults, allArticles, isClient]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  return (
    <div className="search-bar-container mb-8">
      <div className="relative flex items-center max-w-2xl mx-auto">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="記事を検索..."
          className="w-full px-4 py-3 pr-16 border-2 border-white/10 rounded-xl bg-white/5 backdrop-blur-md text-white text-base transition-all duration-300 focus:outline-none focus:border-[#F3BC45]/50 focus:shadow-lg focus:shadow-[#F3BC45]/10 placeholder:text-white/50"
        />
        <div className="absolute right-2 flex items-center justify-center w-10 h-10">
          {isSearching ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Icon icon="mdi:magnify" className="w-5 h-5 text-white/60" />
          )}
        </div>
      </div>
      
      {/* 検索状態表示 */}
      {searchTerm && isClient && (
        <div className="text-center mt-2">
          <p className="text-white/60 text-sm">
            {isSearching ? '検索中...' : `「${searchTerm}」の検索結果`}
          </p>
        </div>
      )}
    </div>
  );
};
