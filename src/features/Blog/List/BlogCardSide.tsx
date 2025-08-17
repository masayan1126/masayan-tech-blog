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
      
      <style jsx>{`
        .modern-blog-card-astro {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: center;
          cursor: pointer;
        }
        
        .modern-blog-card-astro:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(127, 167, 255, 0.15);
          border: 1px solid rgba(127, 167, 255, 0.2);
          background: rgba(255, 255, 255, 0.05);
        }
        
        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(127, 167, 255, 0.1), rgba(127, 167, 255, 0.05));
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
          z-index: 1;
        }
        
        .modern-blog-card-astro:hover .card-overlay {
          opacity: 1;
        }
        
        .card-content {
          position: relative;
          z-index: 2;
          padding: 24px;
        }
        
        .card-title {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 0.5rem 0 1rem 0;
          color: var(--text-color);
          transition: color 0.3s ease;
        }
        
        .date-info {
          color: rgba(255, 255, 255, 0.7);
        }
        
        .card-link {
          display: block;
          text-decoration: none;
          color: inherit;
        }
        
        /* モバイル対応 */
        @media (max-width: 768px) {
          .modern-blog-card-astro:hover {
            transform: translateY(-4px) scale(1.01);
            box-shadow: 0 12px 25px rgba(127, 167, 255, 0.1);
          }
        }
      `}</style>
    </div>
  );
};
