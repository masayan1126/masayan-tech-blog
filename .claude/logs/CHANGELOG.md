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

