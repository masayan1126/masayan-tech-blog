# 技術SEOガイド

検索エンジンのクローラビリティとインデックス品質を向上させる技術SEOの詳細ガイド。

## 構造化データの実装

### Article / TechArticle Schema

```astro
---
// layouts/BlogPost.astro
import type { MarkdownLayoutProps } from 'astro';

type Props = MarkdownLayoutProps<{
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  author: string;
  image: string;
  category: string;
  tags: string[];
}>;

const { frontmatter } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);

const structuredData = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": frontmatter.title,
  "description": frontmatter.description,
  "image": {
    "@type": "ImageObject",
    "url": new URL(frontmatter.image, Astro.site).toString(),
    "width": 1200,
    "height": 630
  },
  "datePublished": frontmatter.pubDate.toISOString(),
  "dateModified": (frontmatter.updatedDate || frontmatter.pubDate).toISOString(),
  "author": {
    "@type": "Person",
    "name": frontmatter.author,
    "url": "https://maasaablog.com/about",
    "sameAs": [
      "https://twitter.com/yourusername",
      "https://github.com/yourusername"
    ]
  },
  "publisher": {
    "@type": "Organization",
    "name": "Masayan Tech Blog",
    "logo": {
      "@type": "ImageObject",
      "url": "https://maasaablog.com/logo.png",
      "width": 600,
      "height": 60
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": canonicalURL.toString()
  },
  "articleSection": frontmatter.category,
  "keywords": frontmatter.tags.join(", "),
  "inLanguage": "ja-JP"
};
---

<script type="application/ld+json" set:html={JSON.stringify(structuredData)} />
```

### BreadcrumbList Schema

```astro
---
// components/Breadcrumb.astro
interface Props {
  items: Array<{
    name: string;
    url: string;
  }>;
}

const { items } = Astro.props;

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": new URL(item.url, Astro.site).toString()
  }))
};
---

<nav aria-label="パンくず" class="breadcrumb">
  <ol>
    {items.map((item, index) => (
      <li>
        {index < items.length - 1 ? (
          <a href={item.url}>{item.name}</a>
        ) : (
          <span aria-current="page">{item.name}</span>
        )}
      </li>
    ))}
  </ol>
</nav>

<script type="application/ld+json" set:html={JSON.stringify(breadcrumbData)} />

<style>
  .breadcrumb ol {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: 1rem 0;
  }

  .breadcrumb li:not(:last-child)::after {
    content: '/';
    margin: 0 0.5rem;
    color: var(--text-tertiary);
  }

  .breadcrumb a {
    color: var(--text-secondary);
    text-decoration: none;
  }

  .breadcrumb a:hover {
    color: var(--accent-color);
    text-decoration: underline;
  }

  .breadcrumb span[aria-current="page"] {
    color: var(--text-primary);
    font-weight: 500;
  }
</style>
```

**使用例:**
```astro
<Breadcrumb
  items={[
    { name: 'ホーム', url: '/' },
    { name: 'ブログ', url: '/blog' },
    { name: 'Claude', url: '/blog/category/claude' },
    { name: '記事タイトル', url: `/blog/${slug}` }
  ]}
/>
```

### BlogPosting Schema（ブログ一覧ページ）

```astro
---
// pages/blog/index.astro
const posts = await Astro.glob('./posts/*.mdx');

const blogData = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Masayan Tech Blog",
  "description": "AI、Claude、プロダクト開発に関する技術ブログ",
  "url": "https://maasaablog.com/blog",
  "blogPost": posts.slice(0, 10).map(post => ({
    "@type": "BlogPosting",
    "headline": post.frontmatter.title,
    "description": post.frontmatter.description,
    "datePublished": post.frontmatter.pubDate,
    "author": {
      "@type": "Person",
      "name": post.frontmatter.author
    },
    "url": `https://maasaablog.com/blog/${post.frontmatter.slug}`
  }))
};
---

<script type="application/ld+json" set:html={JSON.stringify(blogData)} />
```

### Person Schema（著者情報）

```astro
---
// pages/about.astro
const authorData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Masayan",
  "jobTitle": "Software Engineer",
  "description": "Web開発とAI技術に情熱を注ぐエンジニア",
  "url": "https://maasaablog.com/about",
  "image": "https://maasaablog.com/profile.jpg",
  "sameAs": [
    "https://twitter.com/yourusername",
    "https://github.com/yourusername",
    "https://www.linkedin.com/in/yourusername"
  ],
  "knowsAbout": ["Web Development", "AI", "Claude", "Product Development"],
  "alumniOf": {
    "@type": "Organization",
    "name": "Your University"
  }
};
---

<script type="application/ld+json" set:html={JSON.stringify(authorData)} />
```

### SearchAction Schema（サイト内検索）

```astro
---
// layouts/BaseLayout.astro
const searchData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://maasaablog.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://maasaablog.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};
---

<script type="application/ld+json" set:html={JSON.stringify(searchData)} />
```

## メタタグの最適化

### SEOヘッドコンポーネント

```astro
---
// components/SEOHead.astro
interface Props {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  publishDate?: Date;
  updateDate?: Date;
  author?: string;
  tags?: string[];
  noindex?: boolean;
}

const {
  title,
  description,
  canonical,
  image = '/default-og-image.png',
  type = 'website',
  publishDate,
  updateDate,
  author,
  tags = [],
  noindex = false
} = Astro.props;

const canonicalURL = canonical
  ? new URL(canonical, Astro.site)
  : new URL(Astro.url.pathname, Astro.site);

const ogImage = new URL(image, Astro.site);

// タイトルの長さチェック（60文字推奨）
const fullTitle = `${title} | Masayan Tech Blog`;
if (fullTitle.length > 60) {
  console.warn(`Title too long (${fullTitle.length} chars): ${fullTitle}`);
}

// ディスクリプションの長さチェック（120-160文字推奨）
if (description.length < 120 || description.length > 160) {
  console.warn(`Description length not optimal (${description.length} chars)`);
}
---

<!-- 基本メタタグ -->
<title>{fullTitle}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonicalURL} />

<!-- Robot指示 -->
{noindex ? (
  <meta name="robots" content="noindex, nofollow" />
) : (
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
)}

<!-- 著者情報 -->
{author && <meta name="author" content={author} />}

<!-- Open Graph -->
<meta property="og:type" content={type} />
<meta property="og:site_name" content="Masayan Tech Blog" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonicalURL} />
<meta property="og:image" content={ogImage} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content={title} />
<meta property="og:locale" content="ja_JP" />

<!-- Article用のOpen Graph -->
{type === 'article' && (
  <>
    {publishDate && <meta property="article:published_time" content={publishDate.toISOString()} />}
    {updateDate && <meta property="article:modified_time" content={updateDate.toISOString()} />}
    {author && <meta property="article:author" content={author} />}
    {tags.map(tag => <meta property="article:tag" content={tag} />)}
  </>
)}

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@yourusername" />
<meta name="twitter:creator" content="@yourusername" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImage} />
<meta name="twitter:image:alt" content={title} />

<!-- その他 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta charset="UTF-8" />
<meta name="format-detection" content="telephone=no" />
```

### robots.txt

```txt
# /public/robots.txt
User-agent: *
Allow: /

# クロール不要なパス
Disallow: /api/
Disallow: /admin/
Disallow: /*.json$
Disallow: /*?*sort=
Disallow: /*?*filter=

# サイトマップの場所
Sitemap: https://maasaablog.com/sitemap.xml
Sitemap: https://maasaablog.com/sitemap-index.xml

# クロール速度制限（オプション）
Crawl-delay: 0

# 特定ボットの制限（必要な場合）
# User-agent: BadBot
# Disallow: /
```

## サイトマップの最適化

### 動的サイトマップ生成

```astro
---
// pages/sitemap.xml.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  // 全記事取得
  const posts = await Astro.glob('../pages/blog/posts/*.mdx');

  // 静的ページ
  const staticPages = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/blog', changefreq: 'daily', priority: 0.9 },
    { url: '/about', changefreq: 'monthly', priority: 0.8 },
    { url: '/contact', changefreq: 'monthly', priority: 0.7 },
  ];

  // 記事ページ
  const postPages = posts.map(post => ({
    url: `/blog/${post.frontmatter.slug}`,
    lastmod: (post.frontmatter.updatedDate || post.frontmatter.pubDate).toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.8,
  }));

  // カテゴリページ
  const categories = [...new Set(posts.map(p => p.frontmatter.category))];
  const categoryPages = categories.map(cat => ({
    url: `/blog/category/${cat}`,
    changefreq: 'weekly',
    priority: 0.7,
  }));

  const allPages = [...staticPages, ...postPages, ...categoryPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${new URL(page.url, site).toString()}</loc>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
```

### RSSフィードの最適化

```astro
---
// pages/rss.xml.ts
import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  const posts = await Astro.glob('../pages/blog/posts/*.mdx');

  // 公開日順にソート
  const sortedPosts = posts.sort((a, b) =>
    new Date(b.frontmatter.pubDate).getTime() - new Date(a.frontmatter.pubDate).getTime()
  );

  return rss({
    title: 'Masayan Tech Blog',
    description: 'AI、Claude、プロダクト開発に関する技術ブログ',
    site: site!,
    items: sortedPosts.map(post => ({
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      link: `/blog/${post.frontmatter.slug}`,
      pubDate: new Date(post.frontmatter.pubDate),
      author: post.frontmatter.author,
      categories: [post.frontmatter.category, ...post.frontmatter.tags],
      // コンテンツ全文を含める（オプション）
      content: post.compiledContent(),
      // カスタム名前空間（例: メディア）
      customData: `
        <media:content
          url="${new URL(post.frontmatter.image, site).toString()}"
          medium="image"
          type="image/webp"
        />
      `,
    })),
    // RSS名前空間
    xmlns: {
      media: 'http://search.yahoo.com/mrss/',
      atom: 'http://www.w3.org/2005/Atom',
    },
    // Atomリンク
    customData: `
      <atom:link href="${new URL('/rss.xml', site).toString()}" rel="self" type="application/rss+xml" />
      <language>ja</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    `,
  });
};
```

## 内部リンク戦略

### 自動内部リンク生成

```astro
---
// components/AutoInternalLinks.astro
interface Props {
  content: string;
  currentSlug: string;
}

const { content, currentSlug } = Astro.props;

// 全記事取得
const allPosts = await Astro.glob('../pages/blog/posts/*.mdx');

// キーワードマッピング
const keywordMap = allPosts
  .filter(post => post.frontmatter.slug !== currentSlug)
  .map(post => ({
    keywords: [post.frontmatter.title, ...post.frontmatter.tags],
    url: `/blog/${post.frontmatter.slug}`,
    title: post.frontmatter.title,
  }));

// コンテンツ内のキーワードを自動リンク化
function addInternalLinks(text: string): string {
  let result = text;
  const linkedKeywords = new Set<string>();

  keywordMap.forEach(({ keywords, url, title }) => {
    keywords.forEach(keyword => {
      // 同じキーワードは1回のみリンク化
      if (linkedKeywords.has(keyword)) return;

      const regex = new RegExp(`(^|[^\\w])(${keyword})([^\\w]|$)`, 'gi');
      if (regex.test(result)) {
        result = result.replace(
          regex,
          `$1<a href="${url}" title="${title}">$2</a>$3`
        );
        linkedKeywords.add(keyword);
      }
    });
  });

  return result;
}
---

<div set:html={addInternalLinks(content)} />
```

### 関連記事セクション（SEO最適化版）

```astro
---
// components/RelatedArticlesForSEO.astro
interface Props {
  currentSlug: string;
  currentCategory: string;
  currentTags: string[];
}

const { currentSlug, currentCategory, currentTags } = Astro.props;

const allPosts = await Astro.glob('../pages/blog/posts/*.mdx');
const relatedPosts = allPosts
  .filter(post => post.frontmatter.slug !== currentSlug)
  .filter(post =>
    post.frontmatter.category === currentCategory ||
    post.frontmatter.tags.some(tag => currentTags.includes(tag))
  )
  .slice(0, 5);
---

{relatedPosts.length > 0 && (
  <section class="related-articles" aria-labelledby="related-heading">
    <h2 id="related-heading">関連記事</h2>
    <ul>
      {relatedPosts.map(post => (
        <li>
          <article>
            <a href={`/blog/${post.frontmatter.slug}`}>
              <h3>{post.frontmatter.title}</h3>
              <p>{post.frontmatter.description}</p>
            </a>
          </article>
        </li>
      ))}
    </ul>
  </section>
)}
```

## ページ速度とSEO

### Critical CSS の自動抽出

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import critters from 'astro-critters';

export default defineConfig({
  integrations: [
    critters({
      // クリティカルCSSを自動抽出・インライン化
      preload: 'swap',
    }),
  ],
});
```

### 画像のalt属性自動チェック

```javascript
// scripts/check-images.js
import { glob } from 'glob';
import { readFile } from 'fs/promises';

async function checkImages() {
  const files = await glob('src/**/*.astro');
  const errors = [];

  for (const file of files) {
    const content = await readFile(file, 'utf-8');
    const imgRegex = /<img[^>]*>/g;
    const matches = content.match(imgRegex) || [];

    matches.forEach(img => {
      if (!img.includes('alt=')) {
        errors.push(`${file}: Missing alt attribute in ${img}`);
      } else if (img.includes('alt=""') && !img.includes('role="presentation"')) {
        errors.push(`${file}: Empty alt without role="presentation" in ${img}`);
      }
    });
  }

  if (errors.length > 0) {
    console.error('❌ Image accessibility errors found:');
    errors.forEach(err => console.error(err));
    process.exit(1);
  } else {
    console.log('✅ All images have proper alt attributes');
  }
}

checkImages();
```

## モバイルファーストインデックス対応

```html
<!-- モバイル最適化のメタタグ -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="theme-color" content="#0066cc" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#1a1a1a" media="(prefers-color-scheme: dark)">

<!-- PWA対応（オプション） -->
<link rel="manifest" href="/manifest.json">
<link rel="apple-touch-icon" href="/icon-192.png">
```

## 構造化データのテスト

```bash
# Google の構造化データテストツール
# https://search.google.com/test/rich-results

# または Schema.org Validator
# https://validator.schema.org/

# コマンドラインでテスト
npx schema-dts-gen --url https://maasaablog.com/blog/your-post
```

## まとめ

技術SEOの優先順位:

1. **構造化データ**: Article, Breadcrumb, Person Schema
2. **メタタグ**: 適切なタイトル、description、OGP
3. **サイトマップ**: 動的生成、更新日の反映
4. **内部リンク**: 関連記事、自動リンク化
5. **ページ速度**: Critical CSS、画像最適化

これらの施策により、検索エンジンからの評価が向上し、オーガニック流入が増加する。
