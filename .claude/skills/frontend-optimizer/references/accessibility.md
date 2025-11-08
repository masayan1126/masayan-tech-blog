# アクセシビリティ対応ガイド

WCAG 2.1レベルAA準拠を目指したアクセシビリティ改善の詳細ガイド。

## WCAG 2.1 チェックリスト

### レベルA（必須）

#### 知覚可能（Perceivable）

**1.1 テキストによる代替**
- [ ] すべての画像に適切なalt属性
- [ ] 装飾的画像はalt=""
- [ ] 複雑な画像には詳細な説明

**1.2 時間依存メディア**
- [ ] 動画に字幕
- [ ] 音声コンテンツに代替テキスト

**1.3 適応可能**
- [ ] セマンティックなHTML使用
- [ ] 見出しレベルの順序が正しい
- [ ] リストは適切なマークアップ

**1.4 判別可能**
- [ ] 色だけで情報を伝えない
- [ ] テキストのコントラスト比4.5:1以上
- [ ] テキストサイズ変更可能（200%まで）

#### 操作可能（Operable）

**2.1 キーボードアクセス可能**
- [ ] すべての機能がキーボード操作可能
- [ ] キーボードトラップなし
- [ ] フォーカス順序が論理的

**2.2 十分な時間**
- [ ] 時間制限の調整可能
- [ ] 自動更新の制御可能

**2.3 発作と身体的反応**
- [ ] 1秒間に3回以上点滅するコンテンツなし

**2.4 ナビゲーション可能**
- [ ] メインコンテンツへスキップリンク
- [ ] ページタイトルが適切
- [ ] フォーカス順序が意味を持つ
- [ ] リンクの目的が明確

#### 理解可能（Understandable）

**3.1 読みやすさ**
- [ ] ページの言語が指定されている
- [ ] 部分的に異なる言語も指定

**3.2 予測可能**
- [ ] フォーカス時に予期しない変更なし
- [ ] 入力時に予期しない変更なし
- [ ] 一貫したナビゲーション

**3.3 入力支援**
- [ ] エラーメッセージが明確
- [ ] ラベルまたは説明がある
- [ ] エラー修正の提案

#### 堅牢（Robust）

**4.1 互換性**
- [ ] HTMLの文法が正しい
- [ ] 適切なARIA属性使用
- [ ] ステータスメッセージの通知

### レベルAA（推奨）

**1.4 判別可能（追加）**
- [ ] テキストのリサイズ（200%）でレイアウト崩れなし
- [ ] 画像化されたテキストを避ける
- [ ] コントラスト比 4.5:1（大きなテキストは3:1）

**2.4 ナビゲーション可能（追加）**
- [ ] 複数のナビゲーション方法
- [ ] 見出しとラベルが説明的
- [ ] フォーカスが視覚的に確認可能

## セマンティックHTML

### 基本構造

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>記事タイトル | Masayan Tech Blog</title>
</head>
<body>
  <!-- スキップリンク -->
  <a href="#main-content" class="skip-link">メインコンテンツへスキップ</a>

  <!-- ヘッダー -->
  <header role="banner">
    <nav aria-label="メインナビゲーション">
      <ul>
        <li><a href="/">ホーム</a></li>
        <li><a href="/blog">ブログ</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  </header>

  <!-- メインコンテンツ -->
  <main id="main-content" tabindex="-1">
    <article>
      <h1>記事タイトル</h1>
      <p>記事本文...</p>
    </article>
  </main>

  <!-- サイドバー -->
  <aside aria-label="サイドバー">
    <section>
      <h2>カテゴリ</h2>
      <ul>
        <li><a href="/category/claude">Claude</a></li>
      </ul>
    </section>
  </aside>

  <!-- フッター -->
  <footer role="contentinfo">
    <p>&copy; 2025 Masayan Tech Blog</p>
  </footer>
</body>
</html>
```

### 記事カードコンポーネント

**改善前（非推奨）:**
```html
<div class="card" onclick="location.href='/blog/post1'">
  <div class="image">
    <img src="thumb.png">
  </div>
  <div class="title">記事タイトル</div>
  <div class="excerpt">記事の抜粋...</div>
  <div class="date">2024-01-01</div>
  <div class="tags">
    <span class="tag">Claude</span>
    <span class="tag">AI</span>
  </div>
</div>
```

**改善後（推奨）:**
```html
<article class="card">
  <a href="/blog/post1" class="card-link" aria-label="記事タイトル - Claude, AI - 2024年1月1日公開">
    <img
      src="thumb.webp"
      alt="記事のサムネイル画像"
      width="400"
      height="300"
      loading="lazy"
    >
    <h2 class="card-title">記事タイトル</h2>
    <p class="card-excerpt">記事の抜粋...</p>
    <time datetime="2024-01-01" class="card-date">2024年1月1日</time>
    <ul class="card-tags" aria-label="タグ">
      <li><span class="tag">Claude</span></li>
      <li><span class="tag">AI</span></li>
    </ul>
  </a>
</article>
```

### 見出しの階層構造

```html
<!-- 正しい見出し階層 -->
<article>
  <h1>メインタイトル（ページに1つのみ）</h1>

  <section>
    <h2>セクション1</h2>
    <p>内容...</p>

    <h3>サブセクション1-1</h3>
    <p>内容...</p>

    <h3>サブセクション1-2</h3>
    <p>内容...</p>
  </section>

  <section>
    <h2>セクション2</h2>
    <p>内容...</p>

    <h3>サブセクション2-1</h3>

    <h4>詳細2-1-1</h4>
    <p>内容...</p>
  </section>
</article>

<!-- 誤った見出し階層（スキップあり） -->
<article>
  <h1>メインタイトル</h1>
  <h3>セクション（H2をスキップ）</h3> <!-- ❌ NG -->
  <h2>セクション</h2>
  <h4>サブセクション（H3をスキップ）</h4> <!-- ❌ NG -->
</article>
```

## ARIA属性の正しい使用

### ランドマークロール

```html
<!-- 明示的なランドマーク -->
<header role="banner">...</header>
<nav role="navigation" aria-label="メインナビゲーション">...</nav>
<main role="main">...</main>
<aside role="complementary">...</aside>
<footer role="contentinfo">...</footer>

<!-- 複数の同じ要素がある場合はaria-labelで区別 -->
<nav aria-label="メインナビゲーション">...</nav>
<nav aria-label="パンくずナビゲーション">...</nav>
<nav aria-label="ページネーション">...</nav>
```

### ライブリージョン

```html
<!-- 検索結果の動的更新 -->
<div
  role="region"
  aria-live="polite"
  aria-atomic="true"
  aria-label="検索結果"
>
  <p>12件の記事が見つかりました</p>
</div>

<!-- エラーメッセージ -->
<div
  role="alert"
  aria-live="assertive"
>
  入力内容にエラーがあります
</div>

<!-- ローディング状態 -->
<div
  role="status"
  aria-live="polite"
  aria-busy="true"
>
  読み込み中...
</div>
```

### ボタンとリンク

```html
<!-- ボタン: ページ内でアクションを実行 -->
<button
  type="button"
  aria-label="ダークモード切替"
  aria-pressed="false"
>
  <span aria-hidden="true">🌙</span>
  <span class="visually-hidden">ダークモード切替</span>
</button>

<!-- リンク: 別のページへ移動 -->
<a href="/blog" aria-label="ブログ一覧へ">
  ブログ
</a>

<!-- 外部リンク -->
<a
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="外部サイト（新しいタブで開く）"
>
  外部リンク
  <span aria-hidden="true">↗</span>
</a>
```

### モーダルダイアログ

```html
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  <h2 id="dialog-title">確認</h2>
  <p id="dialog-description">この操作を実行しますか?</p>

  <button type="button" aria-label="キャンセル">キャンセル</button>
  <button type="button" aria-label="実行">OK</button>
</div>

<script>
  // フォーカストラップの実装
  const dialog = document.querySelector('[role="dialog"]');
  const focusableElements = dialog.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  // モーダル開いた時に最初の要素にフォーカス
  firstElement.focus();

  // Tabキーでフォーカスを循環
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }

    // Escapeキーで閉じる
    if (e.key === 'Escape') {
      closeDialog();
    }
  });
</script>
```

## キーボードナビゲーション

### フォーカス管理

```css
/* フォーカスインジケーターを明確に */
:focus {
  outline: 2px solid transparent; /* デフォルトアウトラインをリセット */
}

:focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
  border-radius: 2px;
}

/* フォーカスリングを削除しない */
button:focus {
  outline: revert; /* ブラウザデフォルトを尊重 */
}

/* カスタムフォーカススタイル */
.card-link:focus-visible {
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.3);
  transform: translateY(-2px);
  transition: all 0.2s ease;
}
```

### スキップリンク

```html
<a href="#main-content" class="skip-link">
  メインコンテンツへスキップ
</a>

<style>
  .skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: #000;
    color: #fff;
    padding: 8px 16px;
    text-decoration: none;
    z-index: 1000;
    border-radius: 0 0 4px 0;
  }

  .skip-link:focus {
    top: 0;
  }
</style>
```

### キーボードショートカット

```javascript
// グローバルキーボードショートカット
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + K: 検索を開く
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    openSearch();
  }

  // /: 検索フィールドにフォーカス（Gmailスタイル）
  if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
    e.preventDefault();
    document.getElementById('search-input')?.focus();
  }

  // Esc: モーダル/サイドバーを閉じる
  if (e.key === 'Escape') {
    closeModal();
    closeSidebar();
  }
});
```

## 色とコントラスト

### コントラスト比の確保

```css
:root {
  /* テキスト: 4.5:1以上（WCAG AA） */
  --text-primary: #212121;    /* コントラスト比: 16.1:1 */
  --text-secondary: #5f6368;  /* コントラスト比: 7.0:1 */
  --bg-primary: #ffffff;

  /* 大きなテキスト（18pt以上）: 3:1以上 */
  --heading-color: #3c4043;   /* コントラスト比: 11.5:1 */

  /* リンク */
  --link-color: #1a73e8;      /* コントラスト比: 4.8:1 */
  --link-hover: #174ea6;      /* コントラスト比: 7.3:1 */

  /* ボタン */
  --button-bg: #0066cc;
  --button-text: #ffffff;     /* コントラスト比: 7.4:1 */
}

/* ダークモード */
:root.dark {
  --text-primary: #e8eaed;    /* コントラスト比: 14.2:1 */
  --text-secondary: #9aa0a6;  /* コントラスト比: 7.5:1 */
  --bg-primary: #202124;

  --link-color: #8ab4f8;      /* コントラスト比: 9.1:1 */
}
```

### 色以外の情報提供

```html
<!-- 悪い例: 色のみで情報を伝える -->
<span style="color: red;">エラー</span>
<span style="color: green;">成功</span>

<!-- 良い例: アイコンやテキストも併用 -->
<span class="error">
  <svg aria-hidden="true">...</svg>
  <span>エラー</span>
</span>
<span class="success">
  <svg aria-hidden="true">...</svg>
  <span>成功</span>
</span>

<!-- さらに良い例: ARIAで状態を明示 -->
<div role="alert" class="error">
  <svg aria-hidden="true">...</svg>
  <span>エラー: 入力内容を確認してください</span>
</div>
```

## フォームのアクセシビリティ

### ラベルと入力フィールド

```html
<!-- 良い例: 明示的なラベル -->
<label for="email">メールアドレス</label>
<input
  type="email"
  id="email"
  name="email"
  required
  aria-required="true"
  aria-describedby="email-hint"
>
<small id="email-hint">example@domain.com の形式で入力してください</small>

<!-- エラー状態 -->
<label for="username">ユーザー名</label>
<input
  type="text"
  id="username"
  name="username"
  aria-invalid="true"
  aria-describedby="username-error"
>
<div id="username-error" role="alert" class="error">
  ユーザー名は3文字以上で入力してください
</div>
```

### フィールドセットとレジェンド

```html
<fieldset>
  <legend>配送方法を選択</legend>

  <label>
    <input type="radio" name="shipping" value="standard" checked>
    通常配送（無料）
  </label>

  <label>
    <input type="radio" name="shipping" value="express">
    速達配送（+500円）
  </label>
</fieldset>
```

### オートコンプリート

```html
<form>
  <label for="name">お名前</label>
  <input
    type="text"
    id="name"
    name="name"
    autocomplete="name"
  >

  <label for="email">メールアドレス</label>
  <input
    type="email"
    id="email"
    name="email"
    autocomplete="email"
  >

  <label for="tel">電話番号</label>
  <input
    type="tel"
    id="tel"
    name="tel"
    autocomplete="tel"
  >
</form>
```

## 画像のアクセシビリティ

### alt属性の書き方

```html
<!-- 情報を伝える画像: 内容を説明 -->
<img
  src="chart.png"
  alt="2024年のPV数推移グラフ。1月10,000PVから12月50,000PVまで右肩上がり"
>

<!-- 装飾的画像: 空のalt -->
<img src="decoration.png" alt="" role="presentation">

<!-- リンク内の画像: リンク先を説明 -->
<a href="/blog">
  <img src="blog-icon.png" alt="ブログ一覧へ">
</a>

<!-- 複雑な画像: 詳細説明へのリンク -->
<figure>
  <img
    src="complex-diagram.png"
    alt="システムアーキテクチャ図"
    aria-describedby="diagram-description"
  >
  <figcaption id="diagram-description">
    <details>
      <summary>詳細説明</summary>
      <p>クライアントからのリクエストは...</p>
    </details>
  </figcaption>
</figure>
```

## スクリーンリーダー対応

### 視覚的に隠すがスクリーンリーダーには読ませる

```css
/* visually-hidden クラス */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* フォーカス時は表示 */
.visually-hidden:focus {
  position: static;
  width: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

```html
<!-- 使用例 -->
<button>
  <svg aria-hidden="true">
    <!-- アイコン -->
  </svg>
  <span class="visually-hidden">検索</span>
</button>
```

### aria-hiddenの適切な使用

```html
<!-- 装飾的な要素はスクリーンリーダーから隠す -->
<button>
  <span aria-hidden="true">→</span>
  次へ
</button>

<!-- アイコンフォント -->
<span aria-hidden="true" class="icon-star"></span>
<span class="visually-hidden">お気に入り</span>
```

## テスト方法

### 自動テストツール

```bash
# axe-core（推奨）
npm install --save-dev @axe-core/cli
npx axe https://maasaablog.com --save results.json

# Lighthouse
npx lighthouse https://maasaablog.com --only-categories=accessibility

# Pa11y
npm install --save-dev pa11y
npx pa11y https://maasaablog.com
```

### 手動テスト

```markdown
## アクセシビリティ手動テストチェックリスト

### キーボードナビゲーション
- [ ] Tabキーですべての要素にアクセス可能
- [ ] フォーカスが視覚的に確認できる
- [ ] フォーカス順序が論理的
- [ ] キーボードトラップがない
- [ ] Enterキーでリンク/ボタンが動作

### スクリーンリーダー
- [ ] NVDA/JAWSで全コンテンツが読み上げられる
- [ ] 見出しナビゲーションが機能する
- [ ] ランドマークロールが認識される
- [ ] 画像のalt属性が適切
- [ ] フォームのラベルが読み上げられる

### 拡大・ズーム
- [ ] 200%拡大でレイアウトが崩れない
- [ ] 横スクロールが不要
- [ ] テキストが読める

### 色とコントラスト
- [ ] テキストのコントラスト比が十分
- [ ] 色覚異常モードでテスト
- [ ] 色以外でも情報が伝わる
```

## まとめ

アクセシビリティ対応の優先順位:

1. **セマンティックHTML**: 正しい要素とランドマーク使用
2. **キーボードナビゲーション**: すべての機能がキーボード操作可能
3. **代替テキスト**: 画像に適切なalt属性
4. **コントラスト比**: WCAG AA準拠（4.5:1以上）
5. **ARIA属性**: 必要な場合のみ適切に使用

これらの施策により、すべてのユーザーが快適にブログを利用できるようになる。
