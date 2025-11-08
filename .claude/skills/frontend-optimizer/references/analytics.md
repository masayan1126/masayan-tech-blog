# 分析・測定ガイド

フロントエンド改善の効果を測定し、データドリブンな意思決定を行うための分析・測定ガイド。

## KPI設定

### パフォーマンス指標

```markdown
## Core Web Vitals

| 指標 | 現状 | 目標（3ヶ月） | 目標（6ヶ月） | 測定方法 |
|------|------|--------------|--------------|---------|
| LCP（Largest Contentful Paint） | TBD | 2.0s以下 | 1.5s以下 | PageSpeed Insights |
| FID（First Input Delay） | TBD | 50ms以下 | 30ms以下 | Chrome UX Report |
| CLS（Cumulative Layout Shift） | TBD | 0.05以下 | 0.02以下 | PageSpeed Insights |
| Lighthouse Performance | TBD | 90+ | 95+ | Lighthouse CI |
| Time to Interactive (TTI) | TBD | 3.0s以下 | 2.0s以下 | WebPageTest |
| Total Blocking Time (TBT) | TBD | 200ms以下 | 150ms以下 | Lighthouse |

## ページ速度

| 指標 | 現状 | 目標 | 測定方法 |
|------|------|------|---------|
| ページ読み込み時間（平均） | TBD | 3秒以下 | Google Analytics |
| TTFB（Time To First Byte） | TBD | 600ms以下 | Chrome DevTools |
| ページサイズ | TBD | 1MB以下 | Chrome DevTools |
| リクエスト数 | TBD | 50以下 | Chrome DevTools |
```

### ユーザーエンゲージメント指標

```markdown
## エンゲージメント

| 指標 | 現状 | 目標（3ヶ月） | 目標（6ヶ月） | 測定方法 |
|------|------|--------------|--------------|---------|
| 平均セッション時間 | TBD | +20% | +40% | Google Analytics |
| 直帰率 | TBD | -15% | -25% | Google Analytics |
| ページ/セッション | TBD | 2.5以上 | 3.0以上 | Google Analytics |
| 平均スクロール深度 | TBD | 70%以上 | 80%以上 | Google Analytics（イベント） |
| リピート率 | TBD | 30%以上 | 40%以上 | Google Analytics |

## コンバージョン

| 指標 | 現状 | 目標 | 測定方法 |
|------|------|------|---------|
| ニュースレター登録率 | TBD | 3%以上 | Google Analytics（Goal） |
| SNSシェア数 | TBD | +50% | SNS API |
| 外部リンククリック率 | TBD | 5%以上 | Google Analytics（イベント） |
| 検索利用率 | TBD | 10%以上 | Google Analytics（イベント） |
```

### SEO指標

```markdown
## 検索パフォーマンス

| 指標 | 現状 | 目標（3ヶ月） | 目標（6ヶ月） | 測定方法 |
|------|------|--------------|--------------|---------|
| オーガニック流入数 | TBD | +30% | +60% | Google Search Console |
| 平均掲載順位 | TBD | Top 10 | Top 5 | Google Search Console |
| クリック率（CTR） | TBD | 5%以上 | 8%以上 | Google Search Console |
| インデックス数 | 400記事 | 400記事 | 450記事 | Google Search Console |
| 被リンク数 | TBD | +20% | +40% | Google Search Console |
```

## Google Analytics 設定

### GA4 イベント設定

```html
<!-- layouts/BaseLayout.astro -->
<script type="text/partytown">
  // Google Analytics 4
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-V5DNQ95RRH', {
    'send_page_view': true,
    'custom_map': {
      'dimension1': 'article_category',
      'dimension2': 'article_tags',
      'dimension3': 'reading_time',
    }
  });
</script>
```

### カスタムイベント

```javascript
// components/AnalyticsEvents.astro
<script>
  // スクロール深度トラッキング
  let scrollDepths = {25: false, 50: false, 75: false, 90: false};

  window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

    Object.keys(scrollDepths).forEach(depth => {
      if (scrollPercent >= depth && !scrollDepths[depth]) {
        gtag('event', 'scroll_depth', {
          'event_category': 'engagement',
          'event_label': `${depth}%`,
          'value': parseInt(depth)
        });
        scrollDepths[depth] = true;
      }
    });
  }, { passive: true });

  // 読了時間トラッキング
  const startTime = Date.now();

  window.addEventListener('beforeunload', () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);

    // ビーコンAPIで確実に送信
    if (navigator.sendBeacon) {
      const data = new FormData();
      data.append('event', 'time_on_page');
      data.append('value', timeSpent);
      navigator.sendBeacon('/api/analytics', data);
    } else {
      gtag('event', 'time_on_page', {
        'event_category': 'engagement',
        'value': timeSpent,
        'non_interaction': true
      });
    }
  });

  // 外部リンククリック
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="http"]');
    if (link && !link.href.includes(window.location.hostname)) {
      gtag('event', 'click', {
        'event_category': 'outbound_link',
        'event_label': link.href,
        'transport_type': 'beacon'
      });
    }
  });

  // SNSシェアボタンクリック
  document.querySelectorAll('[data-share]').forEach(button => {
    button.addEventListener('click', () => {
      const platform = button.dataset.share;
      gtag('event', 'share', {
        'event_category': 'social',
        'event_label': platform,
        'method': platform
      });
    });
  });

  // 検索利用
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('search', (e) => {
      gtag('event', 'search', {
        'event_category': 'engagement',
        'search_term': e.target.value
      });
    });
  }

  // ダークモード切替
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      gtag('event', 'theme_toggle', {
        'event_category': 'engagement',
        'event_label': isDark ? 'light' : 'dark'
      });
    });
  }

  // 目次リンククリック
  document.querySelectorAll('.toc-link').forEach(link => {
    link.addEventListener('click', (e) => {
      gtag('event', 'toc_click', {
        'event_category': 'navigation',
        'event_label': e.target.textContent
      });
    });
  });

  // コード��ロックのコピー
  document.querySelectorAll('.copy-code-button').forEach(button => {
    button.addEventListener('click', () => {
      gtag('event', 'code_copy', {
        'event_category': 'engagement'
      });
    });
  });

  // エラー発生時のトラッキング
  window.addEventListener('error', (e) => {
    gtag('event', 'exception', {
      'description': e.message,
      'fatal': false
    });
  });
</script>
```

### カスタムディメンション

```javascript
// 記事ページでカスタムディメンション送信
<script is:inline define:vars={{ category, tags, readingTime }}>
  gtag('event', 'page_view', {
    'article_category': category,
    'article_tags': tags.join(','),
    'reading_time': readingTime
  });
</script>
```

## Google Search Console 設定

### 重要な指標の監視

```markdown
## Search Console チェックリスト

### 毎週確認
- [ ] クリック数・表示回数の推移
- [ ] 平均掲載順位の変動
- [ ] CTRの変化
- [ ] カバレッジエラーの有無

### 毎月確認
- [ ] 新規インデックス数
- [ ] トップクエリの分析
- [ ] トップページの分析
- [ ] モバイルユーザビリティのエラー
- [ ] Core Web Vitals のスコア

### 改善アクション
- 掲載順位が低下している記事のリライト
- CTRが低い記事のタイトル・ディスクリプション最適化
- インデックスエラーの修正
```

### Search Console API 活用

```javascript
// scripts/fetch-search-console-data.js
import { google } from 'googleapis';

async function getSearchConsoleData() {
  const auth = new google.auth.GoogleAuth({
    keyFile: './service-account-key.json',
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  const searchconsole = google.searchconsole({ version: 'v1', auth });

  const response = await searchconsole.searchanalytics.query({
    siteUrl: 'https://maasaablog.com',
    requestBody: {
      startDate: '2025-09-01',
      endDate: '2025-10-01',
      dimensions: ['page', 'query'],
      rowLimit: 1000,
    },
  });

  // データ分析
  const data = response.data.rows || [];

  // トップパフォーマンスページ
  const topPages = data
    .reduce((acc, row) => {
      const page = row.keys[0];
      if (!acc[page]) {
        acc[page] = { clicks: 0, impressions: 0, ctr: 0, position: 0 };
      }
      acc[page].clicks += row.clicks;
      acc[page].impressions += row.impressions;
      acc[page].ctr = acc[page].clicks / acc[page].impressions;
      acc[page].position = row.position;
      return acc;
    }, {});

  // 改善が必要なページ（表示数は多いがCTRが低い）
  const lowCTRPages = Object.entries(topPages)
    .filter(([_, metrics]) => metrics.impressions > 100 && metrics.ctr < 0.03)
    .sort((a, b) => b[1].impressions - a[1].impressions);

  console.log('改善が必要なページ（CTR < 3%）:');
  lowCTRPages.slice(0, 10).forEach(([page, metrics]) => {
    console.log(`${page}: CTR ${(metrics.ctr * 100).toFixed(2)}%, 表示回数 ${metrics.impressions}`);
  });

  return data;
}

getSearchConsoleData();
```

## パフォーマンス測定の自動化

### Lighthouse CI

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI

on:
  pull_request:
  push:
    branches:
      - main

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://maasaablog.com
            https://maasaablog.com/blog
          uploadArtifacts: true
          temporaryPublicStorage: true
```

**Lighthouse CI 設定ファイル:**
```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
      },
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],

        // Core Web Vitals
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],

        // その他重要指標
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'speed-index': ['warn', { maxNumericValue: 3000 }],
        'interactive': ['warn', { maxNumericValue: 3500 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

### WebPageTest 自動化

```javascript
// scripts/webpagetest.js
import WebPageTest from 'webpagetest';

const wpt = new WebPageTest('www.webpagetest.org', process.env.WPT_API_KEY);

async function runTest() {
  const options = {
    location: 'Tokyo:Chrome',
    connectivity: '4G',
    runs: 3,
    video: true,
    lighthouse: true,
  };

  wpt.runTest('https://maasaablog.com', options, (err, result) => {
    if (err) return console.error(err);

    console.log(`Test ID: ${result.data.testId}`);
    console.log(`Summary: ${result.data.summary}`);

    // 結果取得
    wpt.getTestResults(result.data.testId, (err, data) => {
      if (err) return console.error(err);

      const median = data.data.median.firstView;
      console.log('Performance Metrics:');
      console.log(`TTFB: ${median.TTFB}ms`);
      console.log(`First Paint: ${median.firstPaint}ms`);
      console.log(`LCP: ${median.chromeUserTiming.LargestContentfulPaint}ms`);
      console.log(`CLS: ${median.chromeUserTiming.CumulativeLayoutShift}`);
      console.log(`Speed Index: ${median.SpeedIndex}`);
    });
  });
}

runTest();
```

## A/Bテストの実施

### Googleオプティマイズの設定

```html
<!-- Google Optimize -->
<script src="https://www.googleoptimize.com/optimize.js?id=OPT-XXXXXX"></script>

<script>
  // フリッカー防止
  (function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
  h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
  (a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
  })(window,document.documentElement,'async-hide','dataLayer',4000,
  {'OPT-XXXXXX':true});
</script>
```

### A/Bテストのアイデア

```markdown
## テスト候補

### 見出し（H1）のテスト
- **A**: 現在のタイトル
- **B**: 数字を含むタイトル（「5つの方法」など）
- **測定指標**: クリック率、滞在時間

### CTAボタンの色
- **A**: 青色（#0066cc）
- **B**: 緑色（#00cc66）
- **測定指標**: クリック率

### 記事レイアウト
- **A**: 1カラム（現在）
- **B**: 2カラム（サイドバー付き）
- **測定指標**: 直帰率、ページ/セッション

### 目次の表示位置
- **A**: 記事上部（現在）
- **B**: サイドバーでスティッキー
- **測定指標**: 目次クリック率、滞在時間

### 関連記事の表示数
- **A**: 3記事
- **B**: 6記事
- **測定指標**: 関連記事クリック率、ページ/セッション
```

## レポート作成

### 週次レポートテンプレート

```markdown
# フロントエンド改善 週次レポート

**期間**: 2025-10-18 〜 2025-10-25

## サマリー

- **総合評価**: 🟢 順調 / 🟡 注意 / 🔴 要対応
- **ハイライト**: [今週の主な成果]
- **課題**: [発生した問題]

## パフォーマンス

| 指標 | 前週 | 今週 | 変化 | 目標達成度 |
|------|------|------|------|----------|
| Lighthouse Performance | 85 | 88 | +3 | 88% |
| LCP | 2.8s | 2.5s | -0.3s | 100% ✅ |
| FID | 120ms | 90ms | -30ms | 90% |
| CLS | 0.15 | 0.08 | -0.07 | 80% |

## エンゲージメント

| 指標 | 前週 | 今週 | 変化 | 目標達成度 |
|------|------|------|------|----------|
| 平均セッション時間 | 2:15 | 2:30 | +6.7% | 50% |
| 直帰率 | 68% | 65% | -3pt | 40% |
| ページ/セッション | 2.1 | 2.3 | +9.5% | 46% |

## SEO

| 指標 | 前週 | 今週 | 変化 |
|------|------|------|------|
| オーガニック流入 | 1,200 | 1,350 | +12.5% |
| 平均掲載順位 | 15.2 | 14.8 | +0.4 |
| CTR | 4.2% | 4.5% | +0.3pt |

## 実施した施策

1. **画像最適化**
   - 全画像をWebP形式に変換
   - 遅延読み込み実装
   - 効果: LCP -0.3s

2. **ダークモード実装**
   - テーマ切替機能追加
   - 効果: ユーザーフィードバック好評

## 来週の予定

- [ ] 関連記事レコメンデーション実装
- [ ] 目次のスクロール連動機能追加
- [ ] A/Bテスト開始（見出しのパターン）

## 懸念事項

- 一部のページでCLSが改善していない → 原因調査中
```

### 月次レポートテンプレート

```markdown
# フロントエンド改善 月次レポート

**期間**: 2025年10月

## エグゼクティブサマリー

[今月の主な成果と次月の戦略を2-3段落で]

## KPI達成状況

### パフォーマンス: 🟢 達成

| 指標 | 初期値 | 現在値 | 目標 | 達成率 |
|------|--------|--------|------|--------|
| Lighthouse Performance | 75 | 90 | 90 | 100% ✅ |
| LCP | 3.5s | 2.2s | 2.5s | 100% ✅ |
| CLS | 0.25 | 0.07 | 0.1 | 100% ✅ |

### エンゲージメント: 🟡 改善中

| 指標 | 初期値 | 現在値 | 目標 | 達成率 |
|------|--------|--------|------|--------|
| 平均セッション時間 | 2:00 | 2:30 | 2:40 | 75% |
| 直帰率 | 70% | 65% | 60% | 50% |

### SEO: 🟢 順調

| 指標 | 初期値 | 現在値 | 目標 | 達成率 |
|------|--------|--------|------|--------|
| オーガニック流入 | 1,000 | 1,400 | 1,300 | 100% ✅ |

## ROI分析

| 施策 | 工数 | 効果 | ROI |
|------|------|------|-----|
| 画像最適化 | 8h | LCP -1.0s, 流入+10% | 高 |
| ダークモード | 12h | 滞在時間+8% | 中 |
| 構造化データ | 6h | CTR+0.5pt | 高 |

## 次月の戦略

1. **最優先**: 直帰率の改善（65% → 60%）
2. **実施予定**: 関連記事機能、検索機能強化
3. **A/Bテスト**: レイアウト、CTA最適化
```

## ダッシュボード

### Data Studio / Looker Studio

```markdown
## 推奨ダッシュボード構成

### ページ1: パフォーマンスOverview
- Core Web Vitals スコアカード（LCP, FID, CLS）
- Lighthouse スコア推移（折れ線グラフ）
- ページ速度分布（ヒストグラム）

### ページ2: エンゲージメント
- セッション時間、直帰率、ページ/セッション（スコアカード）
- 時系列推移（折れ線グラフ）
- デバイス別比較（円グラフ）

### ページ3: SEO
- オーガニック流入数（スコアカード）
- 検索クエリランキング（テーブル）
- 掲載順位分布（ヒストグラム）

### ページ4: コンバージョン
- 目標達成数（スコアカード）
- ファネル分析（ファネルチャート）
- イベント発生数（バーチャート）
```

## まとめ

効果測定の優先順位:

1. **Core Web Vitals**: パフォーマンスの基本指標
2. **エンゲージメント**: ユーザー満足度の代理指標
3. **SEO**: オーガニック流入の健全性
4. **A/Bテスト**: 継続的な改善のためのデータ
5. **ROI分析**: 工数対効果の可視化

定期的な測定とレポートにより、データドリブンな意思決定を実現する。
