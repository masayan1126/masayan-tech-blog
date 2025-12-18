import type { Article } from '@/libs/microcms/blog';
import { Icon } from '@iconify/react';
import { PRIMARY_COLOR } from '@/constants/colors';

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

  return (
    <div className="modern-blog-card-astro">
      <a href={`/blog/${post.id}/`} className="card-link">
        <div className="card-overlay"></div>
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
              <span
                key={c.id}
                className="inline-block px-2 py-1 rounded text-xs"
                style={{
                  backgroundColor: PRIMARY_COLOR.rgba(0.2),
                  borderColor: PRIMARY_COLOR.rgba(0.4),
                  border: '1px solid',
                  color: PRIMARY_COLOR.hex
                }}
              >
                {c.name}
              </span>
            ))}
          </div>
          
          {/* メタ情報（公開日・読了時間） */}
          <div className="card-meta">
            <div className="meta-item">
              <Icon icon="ph:calendar-bold" className="meta-icon" style={{ color: PRIMARY_COLOR.hex }} />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="meta-item">
              <Icon icon="ph:clock-bold" className="meta-icon" style={{ color: PRIMARY_COLOR.hex }} />
              <span>約{readingTime}分で読めます</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};
