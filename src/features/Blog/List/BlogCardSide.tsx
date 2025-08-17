import { useState } from 'react';
import type { Article } from '@/libs/microcms/blog';
import { Icon } from '@iconify/react';

interface BlogCardSideProps {
  post: Article;
}

export const BlogCardSide = ({ post }: BlogCardSideProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP');
  };

  return (
    <div className="modern-blog-card-astro">
      <a href={`/blog/${post.id}/`} className="card-link">
        <div className="card-overlay"></div>
        <div className="card-content">
          <h2 className="card-title">{post.title}</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.category.map((c) => (
              <a
                key={c.id}
                href={`/category/${c.id}/page/1`}
                className="inline-block px-2 py-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 hover:border-blue-500/50 rounded text-xs text-white transition-all duration-200 hover:scale-105"
              >
                {c.name}
              </a>
            ))}
          </div>
          <div className="text-sm mt-3 date-info">
            <Icon icon="noto:calendar" className="w-5 h-5 mr-1 inline-block align-middle text-gray-300" />
            {formatDate(post.publishedAt)}
          </div>
        </div>
      </a>
    </div>
  );
};
