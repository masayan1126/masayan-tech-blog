# UX改善ガイド

ユーザーエンゲージメントと満足度を向上させるUX改善の詳細ガイド。

## 読みやすさの向上

### タイポグラフィの最適化

```css
/* 記事本文の読みやすさ */
article {
  /* 行の長さ: 45-75文字（日本語は30-50文字）が理想 */
  max-width: 70ch;
  margin: 0 auto;

  /* 行間: 1.5-1.8が読みやすい */
  line-height: 1.7;

  /* 段落間: 行間の1.5倍程度 */
  & p + p {
    margin-top: 1.5em;
  }

  /* フォントサイズ: 最低16px */
  font-size: clamp(16px, 1.125rem, 18px);

  /* 文字間隔: 日本語は少し広めに */
  letter-spacing: 0.05em;

  /* 単語間隔 */
  word-spacing: 0.1em;

  /* テキストの揃え: 左揃えが読みやすい */
  text-align: left;

  /* ハイフネーション */
  hyphens: auto;
  -webkit-hyphens: auto;
}

/* 見出しの階層を視覚的に明確に */
h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
  margin-top: 0;
  margin-bottom: 1rem;
  letter-spacing: -0.02em; /* 大きな文字は詰める */
}

h2 {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 600;
  line-height: 1.3;
  margin-top: 2em;
  margin-bottom: 0.75em;
}

h3 {
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  font-weight: 600;
  line-height: 1.4;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

/* リード文（導入部）を目立たせる */
.lead {
  font-size: 1.25em;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 2em;
}

/* 引用の視覚的強調 */
blockquote {
  margin: 2em 0;
  padding: 1em 1.5em;
  border-left: 4px solid var(--accent-color);
  background: var(--bg-subtle);
  font-style: italic;
  color: var(--text-secondary);
}

/* コードブロックの可読性 */
pre {
  padding: 1.5em;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 0.9em;
  line-height: 1.5;
  background: #1e1e1e;
}

code {
  font-family: 'Fira Code', 'Consolas', monospace;
  font-variant-ligatures: common-ligatures; /* リガチャ有効化 */
}

/* インラインコード */
:not(pre) > code {
  padding: 0.2em 0.4em;
  background: var(--code-bg);
  border-radius: 3px;
  font-size: 0.9em;
}
```

### レスポンシブタイポグラフィ

```css
/* Fluid Typography（流動的なタイポグラフィ） */
:root {
  /* ベースフォントサイズ: 画面幅に応じて変化 */
  font-size: clamp(14px, 0.875rem + 0.5vw, 18px);
}

/* モバイル最適化 */
@media (max-width: 768px) {
  article {
    /* モバイルでは行長を短く */
    max-width: 100%;
    padding: 0 1rem;

    /* 行間をやや広めに */
    line-height: 1.8;
  }

  h1 {
    /* 見出しをコンパクトに */
    font-size: 1.75rem;
  }
}
```

## ユーザーエンゲージメント強化

### 1. 読書進捗バー

```astro
---
// components/ReadingProgress.astro
---
<div
  id="reading-progress"
  class="progress-bar"
  role="progressbar"
  aria-label="記事の読書進捗"
  aria-valuenow="0"
  aria-valuemin="0"
  aria-valuemax="100"
></div>

<script>
  const progressBar = document.getElementById('reading-progress');
  let ticking = false;

  function updateProgress() {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    if (progressBar) {
      progressBar.style.width = `${scrolled}%`;
      progressBar.setAttribute('aria-valuenow', Math.round(scrolled).toString());
    }

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true });
</script>

<style>
  .progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(to right, #0066cc, #00ccff);
    z-index: 1000;
    transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: width;
  }
</style>
```

### 2. 目次の自動生成とスクロール連動

```astro
---
// components/TableOfContents.astro
---
<nav class="toc" aria-label="目次">
  <h2 class="toc-title">目次</h2>
  <ul id="toc-list" class="toc-list"></ul>
</nav>

<script>
  // H2見出しから目次を生成
  function generateTOC() {
    const headings = document.querySelectorAll('article h2[id]');
    const tocList = document.getElementById('toc-list');

    if (!tocList || headings.length === 0) return;

    headings.forEach((heading, index) => {
      const li = document.createElement('li');
      const a = document.createElement('a');

      a.href = `#${heading.id}`;
      a.textContent = heading.textContent;
      a.className = 'toc-link';

      li.appendChild(a);
      tocList.appendChild(li);
    });
  }

  // 現在表示中の見出しをハイライト
  function highlightCurrentSection() {
    const headings = document.querySelectorAll('article h2[id]');
    const tocLinks = document.querySelectorAll('.toc-link');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id');
          const tocLink = document.querySelector(`.toc-link[href="#${id}"]`);

          if (entry.isIntersecting) {
            // 全てのアクティブ状態をリセット
            tocLinks.forEach(link => link.classList.remove('active'));
            // 現在の見出しをアクティブに
            tocLink?.classList.add('active');
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px', // 上部80pxを除外、下部80%を除外
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      observer.observe(heading);
    });
  }

  // スムーススクロール
  function smoothScroll() {
    document.querySelectorAll('.toc-link').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });

          // フォーカスを移動（アクセシビリティ）
          targetElement.focus({ preventScroll: true });
        }
      });
    });
  }

  // 初期化
  document.addEventListener('DOMContentLoaded', () => {
    generateTOC();
    highlightCurrentSection();
    smoothScroll();
  });
</script>

<style>
  .toc {
    position: sticky;
    top: 100px;
    max-height: calc(100vh - 120px);
    overflow-y: auto;
    padding: 1.5rem;
    background: var(--bg-subtle);
    border-radius: 8px;
  }

  .toc-title {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .toc-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .toc-link {
    display: block;
    padding: 0.5rem 0;
    color: var(--text-secondary);
    text-decoration: none;
    border-left: 2px solid transparent;
    padding-left: 1rem;
    transition: all 0.2s ease;
  }

  .toc-link:hover {
    color: var(--text-primary);
    border-left-color: var(--accent-color);
  }

  .toc-link.active {
    color: var(--accent-color);
    border-left-color: var(--accent-color);
    font-weight: 600;
  }
</style>
```

### 3. 推定読了時間

```astro
---
// components/ReadingTime.astro
interface Props {
  content: string;
}

const { content } = Astro.props;

// 日本語の平均読書速度: 400-600文字/分
// 英語の平均読書速度: 200-250単語/分
function calculateReadingTime(text: string): number {
  const japaneseChars = (text.match(/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/g) || []).length;
  const englishWords = text.split(/\s+/).length;

  const japaneseTime = japaneseChars / 500; // 500文字/分
  const englishTime = englishWords / 225;   // 225単語/分

  const totalMinutes = Math.ceil(japaneseTime + englishTime);
  return Math.max(1, totalMinutes); // 最低1分
}

const readingTime = calculateReadingTime(content);
---

<div class="reading-time" aria-label={`推定読了時間: ${readingTime}分`}>
  <svg
    class="icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
  <span>{readingTime}分で読めます</span>
</div>

<style>
  .reading-time {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-secondary);
  }

  .icon {
    width: 1em;
    height: 1em;
  }
</style>
```

### 4. 関連記事レコメンデーション

```astro
---
// components/RelatedArticles.astro
interface Props {
  currentSlug: string;
  currentCategory: string;
  currentTags: string[];
  limit?: number;
}

const { currentSlug, currentCategory, currentTags, limit = 3 } = Astro.props;

// 関連記事取得ロジック
async function getRelatedPosts() {
  const allPosts = await Astro.glob('../pages/blog/*.mdx');

  // 現在の記事を除外
  const otherPosts = allPosts.filter(post => post.frontmatter.slug !== currentSlug);

  // スコアリング（カテゴリ一致: 3点、タグ一致: 1点/タグ）
  const scoredPosts = otherPosts.map(post => {
    let score = 0;

    // カテゴリが一致
    if (post.frontmatter.category === currentCategory) {
      score += 3;
    }

    // タグが一致
    const matchingTags = post.frontmatter.tags?.filter(tag =>
      currentTags.includes(tag)
    ) || [];
    score += matchingTags.length;

    return { post, score };
  });

  // スコアが高い順にソート
  return scoredPosts
    .filter(item => item.score > 0) // スコア0は除外
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}

const relatedPosts = await getRelatedPosts();
---

{relatedPosts.length > 0 && (
  <section class="related-articles" aria-label="関連記事">
    <h2 class="section-title">こちらの記事もおすすめ</h2>
    <ul class="article-list">
      {relatedPosts.map((post) => (
        <li class="article-item">
          <a href={`/blog/${post.frontmatter.slug}`} class="article-link">
            <img
              src={post.frontmatter.image}
              alt=""
              width="300"
              height="200"
              loading="lazy"
              class="article-image"
            />
            <div class="article-content">
              <h3 class="article-title">{post.frontmatter.title}</h3>
              <p class="article-excerpt">{post.frontmatter.excerpt}</p>
              <time datetime={post.frontmatter.pubDate} class="article-date">
                {new Date(post.frontmatter.pubDate).toLocaleDateString('ja-JP')}
              </time>
            </div>
          </a>
        </li>
      ))}
    </ul>
  </section>
)}

<style>
  .related-articles {
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 2px solid var(--border-color);
  }

  .section-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }

  .article-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    list-style: none;
    padding: 0;
  }

  .article-link {
    display: flex;
    flex-direction: column;
    height: 100%;
    text-decoration: none;
    color: inherit;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .article-link:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  .article-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .article-content {
    padding: 1.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .article-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }

  .article-excerpt {
    flex: 1;
    font-size: 0.875rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .article-date {
    font-size: 0.75rem;
    color: var(--text-tertiary);
  }
</style>
```

### 5. ダークモード

```astro
---
// components/ThemeToggle.astro
---
<button
  id="theme-toggle"
  class="theme-toggle"
  aria-label="ダークモード切替"
  aria-pressed="false"
  title="ダークモード切替"
>
  <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
  <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
</button>

<script is:inline>
  // ブロッキングスクリプト: フラッシュ防止
  const getThemePreference = () => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const isDark = getThemePreference() === 'dark';
  document.documentElement.classList[isDark ? 'add' : 'remove']('dark');

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
</script>

<script>
  const button = document.getElementById('theme-toggle');

  function updateButton(isDark: boolean) {
    button?.setAttribute('aria-pressed', isDark.toString());
    button?.setAttribute('aria-label', isDark ? 'ライトモードに切替' : 'ダークモードに切替');
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateButton(isDark);
  }

  button?.addEventListener('click', toggleTheme);

  // 初期状態を反映
  updateButton(document.documentElement.classList.contains('dark'));

  // システム設定の変更を監視
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      const isDark = e.matches;
      document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
      updateButton(isDark);
    }
  });
</script>

<style>
  .theme-toggle {
    position: relative;
    width: 44px;
    height: 44px;
    border: none;
    background: transparent;
    cursor: pointer;
    color: var(--text-primary);
    transition: transform 0.2s ease;
  }

  .theme-toggle:hover {
    transform: scale(1.1);
  }

  .theme-toggle:active {
    transform: scale(0.95);
  }

  .sun-icon,
  .moon-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 24px;
    height: 24px;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .sun-icon {
    opacity: 1;
  }

  .moon-icon {
    opacity: 0;
  }

  :global(.dark) .sun-icon {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(90deg);
  }

  :global(.dark) .moon-icon {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(0deg);
  }
</style>
```

**CSSカスタムプロパティでテーマ管理:**
```css
:root {
  /* ライトモード */
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --bg-subtle: #fafafa;
  --text-primary: #212121;
  --text-secondary: #5f6368;
  --text-tertiary: #9aa0a6;
  --border-color: #e0e0e0;
  --accent-color: #0066cc;
  --code-bg: #f5f5f5;

  color-scheme: light;
}

:root.dark {
  /* ダークモード */
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --bg-subtle: #242424;
  --text-primary: #e8eaed;
  --text-secondary: #9aa0a6;
  --text-tertiary: #5f6368;
  --border-color: #3c4043;
  --accent-color: #8ab4f8;
  --code-bg: #2d2d2d;

  color-scheme: dark;
}

/* トランジション */
body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

## マイクロインタラクション

### ボタンのフィードバック

```css
.button {
  position: relative;
  overflow: hidden;
  transition: transform 0.1s ease, box-shadow 0.2s ease;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* リップルエフェクト */
.button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.button:active::after {
  width: 300px;
  height: 300px;
}
```

### ローディングアニメーション

```css
/* スケルトンスクリーン */
.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s ease-in-out infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* スピナー */
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: var(--accent-color);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

## まとめ

UX改善の優先順位:

1. **読みやすさ**: タイポグラフィ、行長、行間の最適化
2. **エンゲージメント**: 読書進捗バー、目次、関連記事
3. **テーマ対応**: ダークモード実装
4. **インタラクション**: マイクロアニメーション、フィードバック
5. **パーソナライゼーション**: レコメンデーション、検索

これらの施策により、滞在時間とPV数の向上を実現する。
