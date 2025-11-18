# Constants ディレクトリ

このディレクトリには、プロジェクト全体で使用する定数を定義しています。

## 📁 ファイル一覧

### colors.ts
サイト全体のカラーテーマを定義しています。

#### テーマカラー
- **プライマリカラー（メインテーマカラー）**: `#F3BC45` （黄色）
- **セカンダリカラー（サブテーマカラー）**: `#60823E` （緑）

#### 使用方法

##### TypeScript/JavaScript での使用

```typescript
import { PRIMARY_COLOR, SECONDARY_COLOR, THEME_COLORS } from '@/constants/colors';

// HEX形式で使用
const color = PRIMARY_COLOR.hex; // '#F3BC45'

// RGBA形式で使用（透明度を指定）
const overlayColor = PRIMARY_COLOR.rgba(0.5); // 'rgba(243, 188, 69, 0.5)'

// UIコンポーネントのカラー設定
const hoverShadow = THEME_COLORS.ui.hover.shadow;
```

##### CSS/Styleタグでの使用

```css
/* CSSカスタムプロパティとして定義 */
:root {
  --color-primary: #F3BC45;
  --color-secondary: #60823E;
}

/* 直接使用 */
.element {
  color: #F3BC45;
  background: rgba(243, 188, 69, 0.1);
}
```

##### Tailwind CSS での使用

```html
<!-- カスタムテーマカラーを使用 -->
<div class="text-theme-primary bg-theme-secondary">
  テーマカラー適用
</div>

<!-- 透明度付き -->
<div class="bg-theme-primary/50">
  50%透明度
</div>
```

#### カラー定数の構造

```typescript
PRIMARY_COLOR = {
  hex: string;           // HEX形式
  rgb: string;           // RGB形式
  r: number;             // R値
  g: number;             // G値
  b: number;             // B値
  rgba: (alpha) => string; // RGBA生成関数
  tailwind: {            // Tailwindクラス名
    text: string;
    bg: string;
    border: string;
    hover: string;
  }
}
```

### meta.ts
サイトのメタ情報を定義しています。

```typescript
import { SITE_TITLE, SITE_DESCRIPTION } from '@/constants/meta';
```

### article.ts
記事関連の定数を定義しています。

### url.ts
URLパス関連の定数を定義しています。

## 🎨 デザインガイドライン

### カラーの使い分け

#### プライマリカラー（黄色 #F3BC45）
以下の要素に使用：
- リンクカードのタイトル
- ホバー時の強調表示
- カードのボーダー
- ボタンのアクセントカラー
- グラデーションのメインカラー

#### セカンダリカラー（緑 #60823E）
以下の要素に使用：
- コードブロックの背景
- 引用（blockquote）のボーダー・背景
- テキストの補助的な強調
- グラデーションのサブカラー

### グラデーション

黄色から緑へのグラデーションを活用：
```typescript
import { GRADIENTS } from '@/constants/colors';

// CSS
const gradient = GRADIENTS.primaryToSecondary.css;

// Tailwind
<div class="bg-gradient-to-r from-yellow-400 via-green-400 to-emerald-500">
```

## 📝 新しい定数を追加する場合

1. 適切なファイルに定数を追加
2. TypeScriptの型を明確に定義
3. 必要に応じてJSDocコメントを追加
4. このREADMEに使用例を記載

## 🔒 注意事項

- 定数ファイルは `as const` で定義し、イミュータブルにする
- カラーコードを直接ハードコードせず、必ずこの定数ファイルから参照する
- 新しいカラーを追加する場合は、デザインチームと相談の上、統一性を保つ

