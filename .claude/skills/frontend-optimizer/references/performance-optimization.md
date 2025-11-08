# パフォーマンス最適化ガイド

テックブログのパフォーマンス最適化のための詳細ガイド。

## Core Web Vitals 最適化

### LCP（Largest Contentful Paint）改善

LCPはページの主要コンテンツが読み込まれるまでの時間を測定する。

**目標値:** 2.5秒以内

#### 改善戦略

**1. 画像の最適化**

```astro
---
// components/OptimizedImage.astro
import { Image } from 'astro:assets';

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

const { src, alt, width, height, priority = false } = Astro.props;
---

<Image
  src={src}
  alt={alt}
  width={width}
  height={height}
  format="webp"
  quality={80}
  loading={priority ? "eager" : "lazy"}
  decoding={priority ? "sync" : "async"}
  fetchpriority={priority ? "high" : "auto"}
/>
```

**使用例:**
```astro
<!-- ファーストビューの画像: 優先読み込み -->
<OptimizedImage
  src="/hero-image.jpg"
  alt="メイン画像"
  width={1200}
  height={630}
  priority={true}
/>

<!-- スクロール後の画像: 遅延読み込み -->
<OptimizedImage
  src="/content-image.jpg"
  alt="コンテンツ画像"
  width={800}
  height={450}
/>
```

**2. フォントの最適化**

```html
<!-- layouts/BaseLayout.astro -->
<head>
  <!-- 重要フォントの事前読み込み -->
  <link
    rel="preload"
    href="/fonts/NotoSansJP-Regular.woff2"
    as="font"
    type="font/woff2"
    crossorigin
  />

  <!-- フォント表示戦略 -->
  <style>
    @font-face {
      font-family: 'Noto Sans JP';
      src: url('/fonts/NotoSansJP-Regular.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
      font-display: swap; /* FOIT（見えない文字）回避 */
    }

    /* フォールバックフォントでレイアウトシフト防止 */
    body {
      font-family: 'Noto Sans JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
  </style>
</head>
```

**3. 重要リソースの事前読み込み**

```astro
---
// layouts/BaseLayout.astro
---
<head>
  <!-- DNS事前解決（サードパーティドメイン） -->
  <link rel="dns-prefetch" href="https://www.google-analytics.com">

  <!-- 重要なCSSの事前読み込み -->
  <link rel="preload" href="/styles/critical.css" as="style">

  <!-- 重要な画像の事前読み込み -->
  <link rel="preload" href="/hero-image.webp" as="image" type="image/webp">
</head>
```

**4. サーバーレスポンスの高速化**

```javascript
// astro.config.mjs
export default defineConfig({
  output: 'static', // 静的生成
  build: {
    inlineStylesheets: 'auto', // 小さなCSSはインライン化
  },
  // CDN設定
  site: 'https://maasaablog.com',
});
```

### FID（First Input Delay）改善

FIDは最初のユーザー操作への応答性を測定する。

**目標値:** 100ms以内

#### 改善戦略

**1. JavaScriptの最適化**

```astro
---
// ページごとに必要なJavaScriptのみ読み込み
---

<!-- 静的コンテンツ: JavaScriptなし -->
<article class="blog-post">
  <h1>{title}</h1>
  <div>{content}</div>
</article>

<!-- インタラクティブ要素: 部分ハイドレーション -->
<ThemeToggle client:load />          <!-- 即座に必要 -->
<CommentSection client:visible />    <!-- 画面に表示されたら -->
<RelatedArticles client:idle />      <!-- アイドル時 -->
```

**2. コード分割**

```javascript
// components/SearchModal.astro
<script>
  // 検索モーダルは開かれるまで遅延読み込み
  const searchButton = document.getElementById('search-button');

  searchButton.addEventListener('click', async () => {
    const { SearchModal } = await import('./SearchModal.js');
    const modal = new SearchModal();
    modal.open();
  });
</script>
```

**3. サードパーティスクリプトの最適化**

```astro
---
// Partytownを使用してWeb Workerで実行
---
<script type="text/partytown">
  // Google Analytics
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-V5DNQ95RRH');
</script>

<!-- Partytownの設定 -->
<script>
  partytown = {
    forward: ['dataLayer.push', 'gtag'],
  };
</script>
```

**4. 長いタスクの分割**

```javascript
// 重い処理を分割
async function processLargeDataset(data) {
  const chunkSize = 100;

  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);

    // チャンクを処理
    await processChunk(chunk);

    // メインスレッドに制御を戻す
    await new Promise(resolve => setTimeout(resolve, 0));
  }
}
```

### CLS（Cumulative Layout Shift）改善

CLSは視覚的安定性を測定する。

**目標値:** 0.1以下

#### 改善戦略

**1. 画像・動画のサイズ指定**

```html
<!-- 悪い例: サイズ未指定でレイアウトシフト発生 -->
<img src="image.jpg" alt="画像">

<!-- 良い例: width/height指定でスペース確保 -->
<img
  src="image.jpg"
  alt="画像"
  width="800"
  height="600"
  loading="lazy"
/>

<!-- さらに良い例: aspect-ratioで柔軟に -->
<img
  src="image.jpg"
  alt="画像"
  style="aspect-ratio: 16/9; width: 100%; height: auto;"
  loading="lazy"
/>
```

**2. 動的コンテンツのスペース確保**

```css
/* 広告・埋め込みコンテンツ用のプレースホルダー */
.ad-container {
  min-height: 250px; /* 広告の最小高さを確保 */
  background: #f0f0f0;
}

.embed-container {
  aspect-ratio: 16/9; /* 動画埋め込みのアスペクト比 */
  position: relative;
}
```

**3. フォントの最適化**

```css
/* font-display: swapでレイアウトシフト軽減 */
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom.woff2') format('woff2');
  font-display: swap;
  /* オプション: フォールバックとのサイズ調整 */
  size-adjust: 100%;
  ascent-override: 90%;
  descent-override: 20%;
}
```

**4. スケルトンスクリーンの実装**

```astro
---
// components/ArticleSkeleton.astro
// ローディング中にレイアウトを保持
---
<div class="article-skeleton" aria-busy="true" aria-live="polite">
  <div class="skeleton-image"></div>
  <div class="skeleton-title"></div>
  <div class="skeleton-excerpt"></div>
</div>

<style>
  .skeleton-image {
    width: 100%;
    aspect-ratio: 16/9;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }

  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
</style>
```

## リソース最適化

### 画像最適化の実践

**1. Astro Image コンポーネントの活用**

```astro
---
// 自動的に最適化された画像を生成
import { Image, Picture } from 'astro:assets';
import heroImage from '../assets/hero.jpg';
---

<!-- 単一フォーマット（WebP） -->
<Image
  src={heroImage}
  alt="ヒーロー画像"
  format="webp"
  quality={80}
  width={1200}
/>

<!-- レスポンシブ画像（複数サイズ生成） -->
<Picture
  src={heroImage}
  alt="ヒーロー画像"
  widths={[400, 800, 1200]}
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
  formats={['avif', 'webp', 'jpg']}
/>
```

**2. 画像CDNの活用**

```javascript
// astro.config.mjs
export default defineConfig({
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp', // ローカル最適化
      // または外部サービス
      // entrypoint: 'astro/assets/services/cloudinary',
      // config: { cloudName: 'your-cloud-name' }
    },
  },
});
```

### CSS最適化

**1. クリティカルCSSの抽出**

```astro
---
// layouts/BaseLayout.astro
// ファーストビューに必要な最小限のCSSをインライン化
---
<head>
  <style>
    /* クリティカルCSS: ファーストビューのスタイル */
    body { margin: 0; font-family: system-ui; }
    header { height: 60px; background: #fff; }
    .hero { min-height: 400px; }
  </style>

  <!-- 残りのCSSは非同期読み込み -->
  <link rel="preload" href="/styles/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="/styles/main.css"></noscript>
</head>
```

**2. 未使用CSSの削除**

```javascript
// astro.config.mjs
import purgecss from '@fullhuman/postcss-purgecss';

export default defineConfig({
  vite: {
    css: {
      postcss: {
        plugins: [
          purgecss({
            content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
            safelist: {
              standard: [/^swiper/, /^dark/], // 動的クラスは保護
            },
          }),
        ],
      },
    },
  },
});
```

### JavaScript最適化

**1. Tree Shaking（不要コードの削除）**

```javascript
// 悪い例: ライブラリ全体をインポート
import _ from 'lodash';
const result = _.debounce(fn, 300);

// 良い例: 必要な関数のみインポート
import debounce from 'lodash/debounce';
const result = debounce(fn, 300);
```

**2. バンドルサイズの監視**

```json
// package.json
{
  "scripts": {
    "build": "astro build",
    "analyze": "astro build && npx vite-bundle-visualizer"
  }
}
```

## キャッシュ戦略

### ブラウザキャッシュの設定

```nginx
# nginx.conf（例: Netlify/Vercelは自動設定）
location ~* \.(jpg|jpeg|png|gif|webp|avif|svg)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}

location ~* \.(css|js)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}

location ~* \.(html)$ {
  expires 1h;
  add_header Cache-Control "public, must-revalidate";
}
```

### サービスワーカーによるキャッシュ

```javascript
// public/sw.js
const CACHE_VERSION = 'v1';
const CACHE_NAME = `maasaablog-${CACHE_VERSION}`;

const STATIC_ASSETS = [
  '/',
  '/styles/main.css',
  '/scripts/main.js',
  '/fonts/NotoSansJP-Regular.woff2',
];

// インストール時: 静的アセットをキャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// フェッチ時: キャッシュファースト戦略
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

## パフォーマンス測定

### Lighthouse の活用

```bash
# コマンドラインでLighthouse実行
npx lighthouse https://maasaablog.com \
  --output html \
  --output-path ./lighthouse-report.html \
  --chrome-flags="--headless"

# CI/CDで自動測定
npx lighthouse https://maasaablog.com \
  --output json \
  --output-path ./lighthouse.json \
  --preset=desktop \
  --only-categories=performance,accessibility,best-practices,seo
```

### PageSpeed Insights API

```javascript
// scripts/check-performance.js
async function checkPageSpeed(url) {
  const apiKey = process.env.PAGESPEED_API_KEY;
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}&strategy=mobile`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  const { lighthouseResult } = data;
  const metrics = lighthouseResult.audits['metrics'].details.items[0];

  console.log('Performance Metrics:');
  console.log(`LCP: ${metrics.largestContentfulPaint}ms`);
  console.log(`FID: ${metrics.maxPotentialFID}ms`);
  console.log(`CLS: ${metrics.cumulativeLayoutShift}`);

  return metrics;
}

checkPageSpeed('https://maasaablog.com');
```

### Real User Monitoring（RUM）

```html
<!-- Google Analytics でCore Web Vitals測定 -->
<script type="text/partytown">
  // web-vitals ライブラリ
  import {getCLS, getFID, getLCP} from 'web-vitals';

  function sendToAnalytics({name, delta, id}) {
    gtag('event', name, {
      event_category: 'Web Vitals',
      value: Math.round(name === 'CLS' ? delta * 1000 : delta),
      event_label: id,
      non_interaction: true,
    });
  }

  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getLCP(sendToAnalytics);
</script>
```

## パフォーマンス予算

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['https://maasaablog.com/'],
      numberOfRuns: 3,
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', {minScore: 0.9}],
        'categories:accessibility': ['error', {minScore: 0.9}],
        'first-contentful-paint': ['error', {maxNumericValue: 2000}],
        'largest-contentful-paint': ['error', {maxNumericValue: 2500}],
        'cumulative-layout-shift': ['error', {maxNumericValue: 0.1}],
        'total-blocking-time': ['error', {maxNumericValue: 300}],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

## まとめ

パフォーマンス最適化の優先順位:

1. **画像最適化**: WebP/AVIF、遅延読み込み、サイズ最適化
2. **JavaScript削減**: 部分ハイドレーション、コード分割、Tree Shaking
3. **CSSの最適化**: クリティカルCSS、未使用CSS削除
4. **キャッシュ戦略**: ブラウザキャッシュ、CDN活用
5. **継続的測定**: Lighthouse、RUM、パフォーマンス予算

これらの施策により、Lighthouseスコア90以上、Core Web Vitals全指標クリアを目指す。
