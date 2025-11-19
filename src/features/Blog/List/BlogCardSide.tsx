import { useState } from 'react';
import type { Article } from '@/libs/microcms/blog';
import { Icon } from '@iconify/react';
import { PRIMARY_COLOR } from '@/constants/colors';

interface BlogCardSideProps {
  post: Article;
}

export const BlogCardSide = ({ post }: BlogCardSideProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP');
  };

  return (
    <div className="modern-blog-card-astro">
      <div className="card-link">
        <div className="card-overlay"></div>
        <div className="card-content">
          <a href={`/blog/${post.id}/`} className="block mb-2">
            <h2 className="card-title">{post.title}</h2>
          </a>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.category.map((c) => (
              <a
                key={c.id}
                href={`/category/${c.id}/page/1`}
                className="inline-block px-2 py-1 rounded text-xs transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: PRIMARY_COLOR.rgba(0.2),
                  borderColor: PRIMARY_COLOR.rgba(0.4),
                  border: '1px solid',
                  color: PRIMARY_COLOR.hex
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = PRIMARY_COLOR.rgba(0.35);
                  e.currentTarget.style.borderColor = PRIMARY_COLOR.rgba(0.6);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = PRIMARY_COLOR.rgba(0.2);
                  e.currentTarget.style.borderColor = PRIMARY_COLOR.rgba(0.4);
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {c.name}
              </a>
            ))}
          </div>
          <div className="text-sm mt-3 date-info">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-middle mr-1.5" style={{ color: PRIMARY_COLOR.hex, marginBottom: '2px' }}>
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {formatDate(post.publishedAt)}
          </div>
        </div>
      </div>
    </div>
  );
};
