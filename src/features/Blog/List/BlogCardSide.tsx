import type { Article } from '@/libs/microcms/blog';
import { Icon } from '@iconify/react';
import { PRIMARY_COLOR } from '@/constants/colors';
import { optimizeImageUrl } from '@/utils/imageOptimizer';

interface BlogCardSideProps {
  post: Article;
}

// 読了時間を計算（日本語は1分あたり約500文字）
const calculateReadingTime = (content: string): number => {
  // HTMLタグを除去してテキストのみを抽出
  const textOnly = content.replace(/<[^>]*>/g, '');
  const charCount = textOnly.length;
  const readingTime = Math.ceil(charCount / 500);
  return Math.max(1, readingTime); // 最低1分
};

// 概要を指定文字数で切り詰め
const truncateDescription = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const BlogCardSide = ({ post }: BlogCardSideProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP');
  };

  const readingTime = calculateReadingTime(post.content);

  const imageContainerStyle: React.CSSProperties = {
    width: '100%',
    overflow: 'hidden',
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: 'auto',
    display: 'block',
  };

  return (
    <div className="modern-blog-card-astro">
      <a href={`/blog/${post.id}/`} className="card-link">
        {/* アイキャッチ画像 */}
        <div className="card-image-container" style={imageContainerStyle}>
          {post.eyecatch ? (
            <picture>
              <source
                srcSet={`${optimizeImageUrl(post.eyecatch.url, { width: 400, format: 'avif', quality: 50 })} 400w, ${optimizeImageUrl(post.eyecatch.url, { width: 600, format: 'avif', quality: 50 })} 600w`}
                sizes="(max-width: 768px) 400px, 600px"
                type="image/avif"
              />
              <source
                srcSet={`${optimizeImageUrl(post.eyecatch.url, { width: 400, format: 'webp', quality: 55 })} 400w, ${optimizeImageUrl(post.eyecatch.url, { width: 600, format: 'webp', quality: 55 })} 600w`}
                sizes="(max-width: 768px) 400px, 600px"
                type="image/webp"
              />
              <img
                src={optimizeImageUrl(post.eyecatch.url, { width: 600, quality: 60 })}
                width={600}
                height={Math.round(600 * post.eyecatch.height / post.eyecatch.width)}
                alt={post.title}
                className="card-image"
                style={imageStyle}
                loading="lazy"
                decoding="async"
              />
            </picture>
          ) : (
            <div className="placeholder-image">
              <span className="placeholder-title">{post.title}</span>
            </div>
          )}
        </div>

        <div className="card-content">
          {/* タイトル */}
          <h2 className="card-title">{post.title}</h2>

          {/* 記事概要 */}
          {post.description && (
            <p className="card-description">
              {truncateDescription(post.description, 80)}
            </p>
          )}

          {/* カテゴリバッジ */}
          <div className="flex flex-wrap gap-2 mb-3">
            {post.category.map((c) => (
              <span key={c.id} className="category-badge">
                {c.name}
              </span>
            ))}
          </div>

          {/* メタ情報（公開日・読了時間） */}
          <div className="card-meta">
            <div className="meta-item">
              <Icon icon="ph:calendar-bold" className="meta-icon" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="meta-item">
              <Icon icon="ph:clock-bold" className="meta-icon" />
              <span>約{readingTime}分で読めます</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};
