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

