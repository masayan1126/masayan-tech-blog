# Code Changes Log

このファイルには、Claude Codeによるコード変更の履歴が記録されます。

---


## 2025年11月08日

### ✏️ Edited `LinkCardReplacer.tsx` - 2025-11-08 19:24:06

**変更内容**: console.logを削除

**ファイルパス**: `src/features/LinkCard/LinkCardReplacer.tsx`

_※ 変更内容が大きいため省略_

---


## 2025年11月09日

### ✏️ Edited `BaseHead.astro` - 2025-11-09 20:05:59

**変更内容**: コードを修正

**ファイルパス**: `src/components/BaseHead.astro`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
export interface Props {
  title: string;
  description: string;
  // image?: string;
}

const canonicalURL = new URL(Astro.url.pathname, Astro.site);

const { title, description } = Astro.props;
```

**変更後**:
```
export interface Props {
  title: string;
  description: string;
  image?: string;
}

const canonicalURL = new URL(Astro.url.pathname, Astro.site);

const { title, description, image = '/masayan-illust.png' } = Astro.props;
```
</details>

---

### ✏️ Edited `BaseHead.astro` - 2025-11-09 20:06:04

**変更内容**: コードを修正

**ファイルパス**: `src/components/BaseHead.astro`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `BaseHead.astro` - 2025-11-09 20:06:08

**変更内容**: コードを修正

**ファイルパス**: `src/components/BaseHead.astro`

_※ 変更内容が大きいため省略_

---


## 2025年11月16日

### 📝 Updated `video-sitemap.xml.ts` - 2025-11-16 13:33:47

**変更内容**: ファイルを更新

**ファイルパス**: `src/pages/video-sitemap.xml.ts`

---

### ✏️ Edited `robots.txt` - 2025-11-16 13:34:05

**変更内容**: コードを修正

**ファイルパス**: `public/robots.txt`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
User-agent: *
Allow: /

Sitemap: https://maasaablog.com/sitemap-index.xml
```

**変更後**:
```
User-agent: *
Allow: /

Sitemap: https://maasaablog.com/sitemap-index.xml
Sitemap: https://maasaablog.com/video-sitemap.xml
```
</details>

---

### ✏️ Edited `BlogDetailLayout.astro` - 2025-11-16 13:34:28

**変更内容**: 関数を修正

**ファイルパス**: `src/layouts/BlogDetailLayout.astro`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `BlogDetailLayout.astro` - 2025-11-16 13:34:35

**変更内容**: コードを修正

**ファイルパス**: `src/layouts/BlogDetailLayout.astro`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
<BaseLayout
  {title}
  {description}
  context={"blog"}
  {breadCrumbsList}
>
```

**変更後**:
```
<BaseLayout
  {title}
  {description}
  context={"blog"}
  {breadCrumbsList}
>
  {videoStructuredData && (
    <Fragment slot="head">
      <script type="application/ld+json" set:html={JSON.stringify(videoStructuredData)} />
    </Fragment>
  )}
```
</details>

---

### ✏️ Edited `BlogDetailLayout.astro` - 2025-11-16 13:34:41

**変更内容**: コードを修正

**ファイルパス**: `src/layouts/BlogDetailLayout.astro`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
  {videoStructuredData && (
    <Fragment slot="head">
      <script type="application/ld+json" set:html={JSON.stringify(videoStructuredData)} />
    </Fragment>
  )}
```

**変更後**:
```
  {videoStructuredData && (
    <Fragment slot="head">
      <script type="application/ld+json" is:inline set:html={JSON.stringify(videoStructuredData)} />
    </Fragment>
  )}
```
</details>

---

### ✏️ Edited `video-sitemap.xml.ts` - 2025-11-16 13:48:15

**変更内容**: 関数を修正

**ファイルパス**: `src/pages/video-sitemap.xml.ts`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `package.json` - 2025-11-16 14:27:49

**変更内容**: コードを修正

**ファイルパス**: `package.json`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `astro.config.mjs` - 2025-11-16 14:27:57

**変更内容**: import文を修正

**ファイルパス**: `astro.config.mjs`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
import vercel from "@astrojs/vercel/serverless";
```

**変更後**:
```
import vercel from "@astrojs/vercel";
```
</details>

---

### ✏️ Edited `astro.config.mjs` - 2025-11-16 14:34:47

**変更内容**: コードを修正

**ファイルパス**: `astro.config.mjs`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
export default defineConfig({
  output: 'hybrid',
  adapter: vercel({ runtime: 'nodejs20.x' }),
```

**変更後**:
```
export default defineConfig({
  output: 'server',
  adapter: vercel({ runtime: 'nodejs20.x' }),
```
</details>

---

### ✏️ Edited `[page].astro` - 2025-11-16 14:46:11

**変更内容**: import文を修正

**ファイルパス**: `src/pages/page/[page].astro`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `[...slug].astro` - 2025-11-16 14:50:52

**変更内容**: import文を修正

**ファイルパス**: `src/pages/blog/[...slug].astro`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `codeHighlight.ts` - 2025-11-16 14:51:04

**変更内容**: 関数を修正

**ファイルパス**: `src/libs/codeHighlight.ts`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
export const attachCodeHighlight = (content: string) => {
  const $ = load(content);
```

**変更後**:
```
export const attachCodeHighlight = (content: string) => {
  if (!content || typeof content !== 'string') {
    return content || '';
  }
  const $ = load(content);
```
</details>

---

### ✏️ Edited `[page].astro` - 2025-11-16 14:51:19

**変更内容**: import文を修正

**ファイルパス**: `src/pages/category/[categoryId]/page/[page].astro`

_※ 変更内容が大きいため省略_

---


## 2025年11月19日

### ✏️ Edited `BlogCardSide.tsx` - 2025-11-19 14:31:22

**変更内容**: コードを修正

**ファイルパス**: `src/features/Blog/List/BlogCardSide.tsx`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `BlogCardSide.astro` - 2025-11-19 14:32:00

**変更内容**: import文を修正

**ファイルパス**: `src/features/Blog/List/BlogCardSide.astro`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `BlogCard.astro` - 2025-11-19 14:32:38

**変更内容**: import文を修正

**ファイルパス**: `src/features/Blog/List/BlogCard.astro`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `TableOfContents.astro` - 2025-11-19 14:39:40

**変更内容**: console.logを削除

**ファイルパス**: `src/components/TableOfContents.astro`

_※ 変更内容が大きいため省略_

---


## 2025年12月02日

### ✏️ Edited `global.css` - 2025-12-02 20:46:29

**変更内容**: コードを修正

**ファイルパス**: `src/styles/global.css`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
.copy-btn:hover, .copy-btn:focus {
  opacity: 1;
  background: rgba(100, 100, 100, 0.95);
  color: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}
```

**変更後**:
```
.copy-btn:hover, .copy-btn:focus {
  opacity: 1;
  background: rgba(100, 100, 100, 0.95);
  color: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

/* Twitter/X埋め込みを左寄せにする */
.twitter-tweet,
.twitter-tweet-rendered {
  margin: 10px auto 10px 0 !important;
}
```
</details>

---


## 2025年12月18日

### 📝 Updated `categories.ts` - 2025-12-18 14:58:00

**変更内容**: ファイルを更新

**ファイルパス**: `src/libs/microcms/mock/categories.ts`

---

### 📝 Updated `articles.ts` - 2025-12-18 14:58:47

**変更内容**: ファイルを更新

**ファイルパス**: `src/libs/microcms/mock/articles.ts`

---

### 📝 Updated `index.ts` - 2025-12-18 14:59:07

**変更内容**: ファイルを更新

**ファイルパス**: `src/libs/microcms/mock/index.ts`

---

### ✏️ Edited `config.ts` - 2025-12-18 14:59:23

**変更内容**: import文を修正

**ファイルパス**: `src/libs/microcms/config.ts`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `category.ts` - 2025-12-18 14:59:45

**変更内容**: import文を修正

**ファイルパス**: `src/libs/microcms/category.ts`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `blog.ts` - 2025-12-18 15:00:00

**変更内容**: import文を修正

**ファイルパス**: `src/libs/microcms/blog.ts`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `blog.ts` - 2025-12-18 15:00:06

**変更内容**: コードを修正

**ファイルパス**: `src/libs/microcms/blog.ts`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
export const getArticles = async (
  queries: MicroCMSQueries = { limit: FETCH_POSTS_MAX_LIMIT }
) => {
  return await client.get<ArticlesResponse>({ endpoint: "blogs", queries });
};
```

**変更後**:
```
export const getArticles = async (
  queries: MicroCMSQueries = { limit: FETCH_POSTS_MAX_LIMIT }
) => {
  // 開発環境ではモックデータを返す
  if (IS_DEV_MODE) {
    return mockArticlesResponse;
  }
  return await client.get<ArticlesResponse>({ endpoint: "blogs", queries });
};
```
</details>

---

### ✏️ Edited `blog.ts` - 2025-12-18 15:00:14

**変更内容**: 関数を修正

**ファイルパス**: `src/libs/microcms/blog.ts`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `blog.ts` - 2025-12-18 15:00:23

**変更内容**: 関数を修正

**ファイルパス**: `src/libs/microcms/blog.ts`

_※ 変更内容が大きいため省略_

---

### 📝 Updated `articles.ts` - 2025-12-18 15:08:07

**変更内容**: ファイルを更新

**ファイルパス**: `src/libs/microcms/mock/articles.ts`

---

### ✏️ Edited `BaseHead.astro` - 2025-12-18 16:47:55

**変更内容**: コードを修正

**ファイルパス**: `src/components/BaseHead.astro`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
  <!-- <script
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9818131389918786"
    crossorigin="anonymous"></script> -->
  <script
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
  ></script>
```

**変更後**:
```
  <script
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9818131389918786"
    crossorigin="anonymous"></script>
```
</details>

---

### ✏️ Edited `BaseLayout.astro` - 2025-12-18 16:48:10

**変更内容**: コードを削除

**ファイルパス**: `src/layouts/BaseLayout.astro`

---


## 2025年12月19日

### ✏️ Edited `BaseHead.astro` - 2025-12-19 21:15:40

**変更内容**: 関数を修正

**ファイルパス**: `src/components/BaseHead.astro`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `BaseHead.astro` - 2025-12-19 21:15:48

**変更内容**: 関数を修正

**ファイルパス**: `src/components/BaseHead.astro`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
  <!-- Microsoft Clarity -->
  <script type="text/javascript">
    (function(c,l,a,r,i,t,y){
```

**変更後**:
```
  <!-- Microsoft Clarity -->
  <script is:inline>
    (function(c,l,a,r,i,t,y){
```
</details>

---

### 📝 Updated `meta.ts` - 2025-12-19 21:24:57

**変更内容**: ファイルを更新

**ファイルパス**: `src/features/Privacy/constants/meta.ts`

---

### 📝 Updated `privacy.astro` - 2025-12-19 21:25:43

**変更内容**: ファイルを更新

**ファイルパス**: `src/pages/privacy.astro`

---

### ✏️ Edited `Footer.astro` - 2025-12-19 21:26:16

**変更内容**: コードを修正

**ファイルパス**: `src/features/Footer/Footer.astro`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `headerLinkMapper.ts` - 2025-12-19 21:36:37

**変更内容**: コードを修正

**ファイルパス**: `src/features/Header/headerLinkMapper.ts`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `blog.ts` - 2025-12-19 22:02:42

**変更内容**: コードを修正

**ファイルパス**: `src/libs/microcms/blog.ts`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `BlogCard.astro` - 2025-12-19 22:02:52

**変更内容**: コードを修正

**ファイルパス**: `src/features/Blog/List/BlogCard.astro`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `BlogDetailLayout.astro` - 2025-12-19 22:03:00

**変更内容**: コードを修正

**ファイルパス**: `src/layouts/BlogDetailLayout.astro`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
const { title, description, publishedAt, revisedAt, category, youtube_link } = Astro.props;
```

**変更後**:
```
const { title, description, publishedAt, revisedAt, category, youtube_link, eyecatch } = Astro.props;
```
</details>

---

### ✏️ Edited `BlogDetailLayout.astro` - 2025-12-19 22:03:08

**変更内容**: コードを修正

**ファイルパス**: `src/layouts/BlogDetailLayout.astro`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `BlogDetailLayout.astro` - 2025-12-19 22:03:16

**変更内容**: コードを修正

**ファイルパス**: `src/layouts/BlogDetailLayout.astro`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `articles.ts` - 2025-12-19 22:04:09

**変更内容**: コードを修正

**ファイルパス**: `src/libs/microcms/mock/articles.ts`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `articles.ts` - 2025-12-19 22:04:18

**変更内容**: コードを修正

**ファイルパス**: `src/libs/microcms/mock/articles.ts`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `articles.ts` - 2025-12-19 22:04:27

**変更内容**: コードを修正

**ファイルパス**: `src/libs/microcms/mock/articles.ts`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `articles.ts` - 2025-12-19 22:04:35

**変更内容**: コードを修正

**ファイルパス**: `src/libs/microcms/mock/articles.ts`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `articles.ts` - 2025-12-19 22:04:43

**変更内容**: コードを修正

**ファイルパス**: `src/libs/microcms/mock/articles.ts`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `articles.ts` - 2025-12-19 22:04:50

**変更内容**: コードを修正

**ファイルパス**: `src/libs/microcms/mock/articles.ts`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `articles.ts` - 2025-12-19 22:05:00

**変更内容**: コードを修正

**ファイルパス**: `src/libs/microcms/mock/articles.ts`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
    eyecatch: {
      url: "https://images.microcms-assets.io/assets/placeholder/claude-code-advanced.png",
      width: 1200,
      height: 630,
    },
```

**変更後**:
```
    eyecatch: {
      url: "https://picsum.photos/seed/claude-code-advanced/1200/630",
      width: 1200,
      height: 630,
    },
```
</details>

---

### ✏️ Edited `articles.ts` - 2025-12-19 22:05:06

**変更内容**: コードを修正

**ファイルパス**: `src/libs/microcms/mock/articles.ts`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
    eyecatch: {
      url: "https://images.microcms-assets.io/assets/placeholder/claude-code-intro.png",
      width: 1200,
      height: 630,
    },
```

**変更後**:
```
    eyecatch: {
      url: "https://picsum.photos/seed/claude-code-intro/1200/630",
      width: 1200,
      height: 630,
    },
```
</details>

---

### ✏️ Edited `articles.ts` - 2025-12-19 22:05:14

**変更内容**: コードを修正

**ファイルパス**: `src/libs/microcms/mock/articles.ts`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
    eyecatch: {
      url: "https://images.microcms-assets.io/assets/placeholder/mcp-server-tutorial.png",
      width: 1200,
      height: 630,
    },
```

**変更後**:
```
    eyecatch: {
      url: "https://picsum.photos/seed/mcp-server-tutorial/1200/630",
      width: 1200,
      height: 630,
    },
```
</details>

---

### ✏️ Edited `articles.ts` - 2025-12-19 22:05:20

**変更内容**: コードを修正

**ファイルパス**: `src/libs/microcms/mock/articles.ts`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
    eyecatch: {
      url: "https://images.microcms-assets.io/assets/placeholder/ai-coding-comparison.png",
      width: 1200,
      height: 630,
    },
```

**変更後**:
```
    eyecatch: {
      url: "https://picsum.photos/seed/ai-coding-comparison/1200/630",
      width: 1200,
      height: 630,
    },
```
</details>

---

### ✏️ Edited `articles.ts` - 2025-12-19 22:05:26

**変更内容**: コードを修正

**ファイルパス**: `src/libs/microcms/mock/articles.ts`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
    eyecatch: {
      url: "https://images.microcms-assets.io/assets/placeholder/claude-api-guide.png",
      width: 1200,
      height: 630,
    },
```

**変更後**:
```
    eyecatch: {
      url: "https://picsum.photos/seed/claude-api-guide/1200/630",
      width: 1200,
      height: 630,
    },
```
</details>

---

### ✏️ Edited `articles.ts` - 2025-12-19 22:05:32

**変更内容**: コードを修正

**ファイルパス**: `src/libs/microcms/mock/articles.ts`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
    eyecatch: {
      url: "https://images.microcms-assets.io/assets/placeholder/python-ai-app.png",
      width: 1200,
      height: 630,
    },
```

**変更後**:
```
    eyecatch: {
      url: "https://picsum.photos/seed/python-ai-app/1200/630",
      width: 1200,
      height: 630,
    },
```
</details>

---

### ✏️ Edited `BlogCardSide.astro` - 2025-12-19 22:06:32

**変更内容**: コードを修正

**ファイルパス**: `src/features/Blog/List/BlogCardSide.astro`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `BlogCardSide.astro` - 2025-12-19 22:06:42

**変更内容**: コードを修正

**ファイルパス**: `src/features/Blog/List/BlogCardSide.astro`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `BlogCardSide.tsx` - 2025-12-19 22:08:02

**変更内容**: コードを修正

**ファイルパス**: `src/features/Blog/List/BlogCardSide.tsx`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `BlogCardSide.tsx` - 2025-12-19 22:11:55

**変更内容**: コードを修正

**ファイルパス**: `src/features/Blog/List/BlogCardSide.tsx`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `articles.ts` - 2025-12-19 22:12:28

**変更内容**: コードを修正

**ファイルパス**: `src/libs/microcms/mock/articles.ts`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
    eyecatch: {
      url: "https://picsum.photos/seed/claude-code-advanced/1200/630",
      width: 1200,
      height: 630,
    },
```

**変更後**:
```
    eyecatch: {
      url: "https://images.microcms-assets.io/assets/c8f47cd9ef654a2d9ca6b6e579be433f/55fd9175bec04a8d97934f7f9bc099bb/ChatGPT%20Image%202025%E5%B9%B412%E6%9C%8819%E6%97%A5%2021_58_32.png",
      width: 1536,
      height: 1024,
    },
```
</details>

---

### ✏️ Edited `BlogCardSide.astro` - 2025-12-19 22:13:31

**変更内容**: コードを修正

**ファイルパス**: `src/features/Blog/List/BlogCardSide.astro`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
```

**変更後**:
```
  .card-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
  }
```
</details>

---

### ✏️ Edited `BlogCardSide.tsx` - 2025-12-19 22:13:32

**変更内容**: コードを修正

**ファイルパス**: `src/features/Blog/List/BlogCardSide.tsx`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };
```

**変更後**:
```
  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  };
```
</details>

---

### ✏️ Edited `BlogCardSide.astro` - 2025-12-19 22:14:19

**変更内容**: コードを修正

**ファイルパス**: `src/features/Blog/List/BlogCardSide.astro`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `BlogCardSide.astro` - 2025-12-19 22:15:36

**変更内容**: コードを修正

**ファイルパス**: `src/features/Blog/List/BlogCardSide.astro`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `BlogCardSide.astro` - 2025-12-19 22:15:46

**変更内容**: コードを修正

**ファイルパス**: `src/features/Blog/List/BlogCardSide.astro`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `BlogCardSide.tsx` - 2025-12-19 22:15:55

**変更内容**: コードを修正

**ファイルパス**: `src/features/Blog/List/BlogCardSide.tsx`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `BlogCardSide.tsx` - 2025-12-19 22:16:08

**変更内容**: コードを修正

**ファイルパス**: `src/features/Blog/List/BlogCardSide.tsx`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `BlogCard.astro` - 2025-12-19 22:18:18

**変更内容**: コードを修正

**ファイルパス**: `src/features/Blog/List/BlogCard.astro`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
  .card-image-container {
    position: relative;
    overflow: hidden;
  }
  
  .card-image {
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    width: 100%;
    height: auto;
  }
```

**変更後**:
```
  .card-image-container {
    position: relative;
    overflow: hidden;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
  }

  .card-image {
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
```
</details>

---

### ✏️ Edited `BlogCard.astro` - 2025-12-19 22:19:26

**変更内容**: コードを修正

**ファイルパス**: `src/features/Blog/List/BlogCard.astro`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
  .card-image-container {
    position: relative;
    overflow: hidden;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
  }

  .card-image {
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
```

**変更後**:
```
  .card-image-container {
    position: relative;
    overflow: hidden;
  }

  .card-image {
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    width: 100%;
    height: auto;
    display: block;
  }
```
</details>

---

### ✏️ Edited `BlogCardSide.astro` - 2025-12-19 22:19:40

**変更内容**: コードを修正

**ファイルパス**: `src/features/Blog/List/BlogCardSide.astro`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
  .card-image-container {
    width: 100%;
    height: 180px;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.2);
  }

  .card-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
  }
```

**変更後**:
```
  .card-image-container {
    width: 100%;
    overflow: hidden;
  }

  .card-image {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.3s ease;
  }
```
</details>

---

### ✏️ Edited `BlogCardSide.astro` - 2025-12-19 22:19:45

**変更内容**: コードを削除

**ファイルパス**: `src/features/Blog/List/BlogCardSide.astro`

---

### ✏️ Edited `BlogCardSide.tsx` - 2025-12-19 22:19:52

**変更内容**: コードを修正

**ファイルパス**: `src/features/Blog/List/BlogCardSide.tsx`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
  const imageContainerStyle: React.CSSProperties = {
    width: '100%',
    height: '180px',
    overflow: 'hidden',
    background: 'rgba(0, 0, 0, 0.2)',
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  };
```

**変更後**:
```
  const imageContainerStyle: React.CSSProperties = {
    width: '100%',
    overflow: 'hidden',
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: 'auto',
    display: 'block',
  };
```
</details>

---

### ✏️ Edited `articles.ts` - 2025-12-19 22:29:45

**変更内容**: コードを修正

**ファイルパス**: `src/libs/microcms/mock/articles.ts`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
    eyecatch: {
      url: "https://picsum.photos/seed/ai-coding-comparison/1200/630",
      width: 1200,
```

**変更後**:
```
    eyecatch: {
      url: "https://images.microcms-assets.io/assets/c8f47cd9ef654a2d9ca6b6e579be433f/1c1d87d26bbb4605a331e6fd91792a9f/ChatGPT%20Image%202025%E5%B9%B412%E6%9C%8819%E6%97%A5%2022_25_01.png",
      width: 1536,
```
</details>

---

### ✏️ Edited `articles.ts` - 2025-12-19 22:29:52

**変更内容**: コードを修正

**ファイルパス**: `src/libs/microcms/mock/articles.ts`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
      url: "https://images.microcms-assets.io/assets/c8f47cd9ef654a2d9ca6b6e579be433f/1c1d87d26bbb4605a331e6fd91792a9f/ChatGPT%20Image%202025%E5%B9%B412%E6%9C%8819%E6%97%A5%2022_25_01.png",
      width: 1536,
      height: 630,
```

**変更後**:
```
      url: "https://images.microcms-assets.io/assets/c8f47cd9ef654a2d9ca6b6e579be433f/1c1d87d26bbb4605a331e6fd91792a9f/ChatGPT%20Image%202025%E5%B9%B412%E6%9C%8819%E6%97%A5%2022_25_01.png",
      width: 1536,
      height: 1024,
```
</details>

---


## 2025年12月20日

### 📝 Updated `imageOptimizer.ts` - 2025-12-20 09:38:32

**変更内容**: ファイルを更新

**ファイルパス**: `src/utils/imageOptimizer.ts`

---

### ✏️ Edited `BlogCardSide.astro` - 2025-12-20 09:38:51

**変更内容**: import文を修正

**ファイルパス**: `src/features/Blog/List/BlogCardSide.astro`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
---
import type { Article } from "@/libs/microcms/blog";
import FormattedDate from "@/components/FormattedDate.astro";
import { Icon } from "astro-icon";
```

**変更後**:
```
---
import type { Article } from "@/libs/microcms/blog";
import FormattedDate from "@/components/FormattedDate.astro";
import { Icon } from "astro-icon";
import { optimizeImageUrl } from "@/utils/imageOptimizer";
```
</details>

---

### ✏️ Edited `BlogCardSide.astro` - 2025-12-20 09:39:01

**変更内容**: コードを修正

**ファイルパス**: `src/features/Blog/List/BlogCardSide.astro`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `BlogDetailLayout.astro` - 2025-12-20 09:39:31

**変更内容**: import文を修正

**ファイルパス**: `src/layouts/BlogDetailLayout.astro`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `BlogDetailLayout.astro` - 2025-12-20 09:39:43

**変更内容**: コードを修正

**ファイルパス**: `src/layouts/BlogDetailLayout.astro`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `BlogCardSide.tsx` - 2025-12-20 09:45:29

**変更内容**: import文を修正

**ファイルパス**: `src/features/Blog/List/BlogCardSide.tsx`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
import type { Article } from '@/libs/microcms/blog';
import { Icon } from '@iconify/react';
import { PRIMARY_COLOR } from '@/constants/colors';
```

**変更後**:
```
import type { Article } from '@/libs/microcms/blog';
import { Icon } from '@iconify/react';
import { PRIMARY_COLOR } from '@/constants/colors';
import { optimizeImageUrl } from '@/utils/imageOptimizer';
```
</details>

---

### ✏️ Edited `BlogCardSide.tsx` - 2025-12-20 09:45:39

**変更内容**: コードを修正

**ファイルパス**: `src/features/Blog/List/BlogCardSide.tsx`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `BlogDetailProfileCard.astro` - 2025-12-20 10:59:30

**変更内容**: import文を修正

**ファイルパス**: `src/features/Blog/Detail/BlogDetailProfileCard.astro`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
---
import { Image } from "astro:assets";
import { Icon } from "astro-icon";
---
```

**変更後**:
```
---
import { Image } from "astro:assets";
import { Icon } from "astro-icon";
import profileImage from "@/assets/images/miyabiya.webp";
---
```
</details>

---

### ✏️ Edited `BlogDetailProfileCard.astro` - 2025-12-20 10:59:38

**変更内容**: コードを修正

**ファイルパス**: `src/features/Blog/Detail/BlogDetailProfileCard.astro`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
      <Image
        src={"/miyabiya.webp"}
        width={80}
        height={80}
        alt={"西垣雅矢のプロフィール画像"}
        format="avif"
        class="profile-avatar"
      />
```

**変更後**:
```
      <Image
        src={profileImage}
        width={80}
        height={80}
        alt={"西垣雅矢のプロフィール画像"}
        format="avif"
        class="profile-avatar"
      />
```
</details>

---

### ✏️ Edited `Header.astro` - 2025-12-20 10:59:47

**変更内容**: import文を修正

**ファイルパス**: `src/features/Header/Header.astro`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `Header.astro` - 2025-12-20 10:59:54

**変更内容**: コードを修正

**ファイルパス**: `src/features/Header/Header.astro`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
        <Image
          src={"/miyabiya.webp"}
          width={32}
          height={32}
          alt={"西垣雅矢のプロフィール画像"}
          format="avif"
          class="mr-3 hidden md:block rounded-full border border-white/20"
        />
```

**変更後**:
```
        <Image
          src={profileImage}
          width={32}
          height={32}
          alt={"西垣雅矢のプロフィール画像"}
          format="avif"
          class="mr-3 hidden md:block rounded-full border border-white/20"
        />
```
</details>

---

### ✏️ Edited `About.astro` - 2025-12-20 11:00:06

**変更内容**: import文を修正

**ファイルパス**: `src/features/About/About.astro`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
---
import BlogContents from "./BlogContents.astro";
import SnsAndMedia from "./SnsAndMedia.astro";
import JobRequest from "./JobRequest.astro";
import { SITE_TITLE } from "@/constants/meta";
import { Image } from "astro:assets";
---
```

**変更後**:
```
---
import BlogContents from "./BlogContents.astro";
import SnsAndMedia from "./SnsAndMedia.astro";
import JobRequest from "./JobRequest.astro";
import { SITE_TITLE } from "@/constants/meta";
import { Image } from "astro:assets";
import profileImage from "@/assets/images/miyabiya.webp";
---
```
</details>

---

### ✏️ Edited `About.astro` - 2025-12-20 11:00:13

**変更内容**: コードを修正

**ファイルパス**: `src/features/About/About.astro`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
        <Image
          src={"/miyabiya.webp"}
          width={256}
          height={256}
          alt={"西垣雅矢のプロフィール画像"}
          format="avif"
          class="profile-image"
        />
```

**変更後**:
```
        <Image
          src={profileImage}
          width={256}
          height={256}
          alt={"西垣雅矢のプロフィール画像"}
          format="avif"
          class="profile-image"
        />
```
</details>

---

### ✏️ Edited `404.astro` - 2025-12-20 11:00:30

**変更内容**: import文を修正

**ファイルパス**: `src/pages/404.astro`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `404.astro` - 2025-12-20 11:00:37

**変更内容**: コードを修正

**ファイルパス**: `src/pages/404.astro`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
        <img 
          src="/miyabiya.webp" 
          alt="迷子のインコ" 
          class="w-32 h-32 md:w-48 md:h-48 mx-auto rounded-full"
        />
```

**変更後**:
```
        <Image
          src={profileImage}
          width={192}
          height={192}
          alt="迷子のインコ"
          format="avif"
          class="w-32 h-32 md:w-48 md:h-48 mx-auto rounded-full"
        />
```
</details>

---

### ✏️ Edited `[page].astro` - 2025-12-20 11:00:48

**変更内容**: import文を修正

**ファイルパス**: `src/pages/page/[page].astro`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `[page].astro` - 2025-12-20 11:00:55

**変更内容**: コードを修正

**ファイルパス**: `src/pages/page/[page].astro`

<details>
<summary>変更の詳細を表示</summary>

**変更前**:
```
<img src="/miyabiya.webp" alt="西垣雅矢" class="author-image" width="64" height="64" />
```

**変更後**:
```
<Image src={profileImage} width={64} height={64} alt="西垣雅矢" format="avif" class="author-image" />
```
</details>

---

### ✏️ Edited `BlogCardSide.astro` - 2025-12-20 11:01:17

**変更内容**: コードを修正

**ファイルパス**: `src/features/Blog/List/BlogCardSide.astro`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `BlogCardSide.tsx` - 2025-12-20 11:01:26

**変更内容**: コードを修正

**ファイルパス**: `src/features/Blog/List/BlogCardSide.tsx`

_※ 変更内容が大きいため省略_

---

### ✏️ Edited `BlogDetailLayout.astro` - 2025-12-20 11:01:47

**変更内容**: コードを修正

**ファイルパス**: `src/layouts/BlogDetailLayout.astro`

_※ 変更内容が大きいため省略_

---

