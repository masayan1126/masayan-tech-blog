import type { APIRoute } from 'astro';
import { getArticlesMeta } from '@/libs/microcms/blog';

const SITE_URL = 'https://maasaablog.com';

// YouTube URLからVideo IDを抽出
function extractVideoId(youtubeUrl: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,
    /youtube\.com\/embed\/([^?&\s]+)/,
  ];

  for (const pattern of patterns) {
    const match = youtubeUrl.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

// YouTube Video IDからサムネイルURLを生成
function getThumbnailUrl(videoId: string): string {
  // 高画質サムネイル (1280x720) を優先
  return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
}

export const GET: APIRoute = async () => {
  try {
    // 全記事を取得
    const response = await getArticlesMeta();
    const articles = response.contents;

    // YouTube動画を持つ記事のみフィルタリング
    const articlesWithVideo = articles.filter(article => article.youtube_link);

    // 動画サイトマップXMLを生成
    const videoEntries = articlesWithVideo
      .map(article => {
        const videoId = extractVideoId(article.youtube_link!);
        if (!videoId) return null;

        const articleUrl = `${SITE_URL}/blog/${article.id}`;
        const thumbnailUrl = getThumbnailUrl(videoId);
        const playerUrl = `https://www.youtube.com/embed/${videoId}`;

        // XMLエスケープ処理（無効な制御文字も除去）
        const escapeXml = (str: string) => {
          return str
            // XML 1.0で無効な制御文字を除去 (0x00-0x08, 0x0B-0x0C, 0x0E-0x1F, 0x7F-0x9F)
            .replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F-\x9F]/g, '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
        };

        const title = escapeXml(article.title);
        const description = escapeXml(article.description || article.title);
        const publicationDate = new Date(article.publishedAt).toISOString();

        return `  <url>
    <loc>${articleUrl}</loc>
    <video:video>
      <video:thumbnail_loc>${thumbnailUrl}</video:thumbnail_loc>
      <video:title>${title}</video:title>
      <video:description>${description}</video:description>
      <video:player_loc allow_embed="yes">${playerUrl}</video:player_loc>
      <video:publication_date>${publicationDate}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>
  </url>`;
      })
      .filter(Boolean)
      .join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${videoEntries}
</urlset>`;

    return new Response(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // 1時間キャッシュ
      },
    });
  } catch (error) {
    console.error('Error generating video sitemap:', error);

    return new Response('Error generating video sitemap', {
      status: 500,
    });
  }
};
