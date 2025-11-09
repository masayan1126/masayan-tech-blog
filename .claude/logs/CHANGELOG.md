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

