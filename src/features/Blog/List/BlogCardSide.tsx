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
                className="inline-block px-2 py-1 rounded text-xs transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: 'rgba(243, 188, 69, 0.2)',
                  borderColor: 'rgba(243, 188, 69, 0.4)',
                  border: '1px solid',
                  color: '#F3BC45'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(243, 188, 69, 0.35)';
                  e.currentTarget.style.borderColor = 'rgba(243, 188, 69, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(243, 188, 69, 0.2)';
                  e.currentTarget.style.borderColor = 'rgba(243, 188, 69, 0.4)';
                }}
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
