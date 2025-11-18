/**
 * カラー定数の使用例
 * 
 * このファイルは実際のコンポーネントではなく、
 * colors.ts の使用方法を示すサンプルコードです。
 */

import { PRIMARY_COLOR, SECONDARY_COLOR, THEME_COLORS, GRADIENTS } from './colors';

// ============================================
// Example 1: React コンポーネントでの使用
// ============================================

export const ButtonExample: React.FC = () => {
  return (
    <button
      style={{
        backgroundColor: PRIMARY_COLOR.hex,
        color: 'white',
        border: `2px solid ${PRIMARY_COLOR.rgba(0.5)}`,
        padding: '12px 24px',
        borderRadius: '8px',
      }}
    >
      プライマリボタン
    </button>
  );
};

// ============================================
// Example 2: グラデーション背景の使用
// ============================================

export const GradientCardExample: React.FC = () => {
  return (
    <div
      style={{
        background: GRADIENTS.primaryToSecondary.css,
        padding: '24px',
        borderRadius: '16px',
        color: 'white',
      }}
    >
      <h3>グラデーションカード</h3>
      <p>黄色から緑へのグラデーション</p>
    </div>
  );
};

// ============================================
// Example 3: ホバー効果の実装
// ============================================

export const HoverCardExample: React.FC = () => {
  return (
    <div
      className="hover-card"
      style={{
        padding: '20px',
        border: `1px solid ${THEME_COLORS.ui.hover.border}`,
        borderRadius: '12px',
        transition: 'all 0.3s ease',
      }}
    >
      <p>ホバーしてみてください</p>
      <style>{`
        .hover-card:hover {
          box-shadow: 0 10px 30px ${THEME_COLORS.ui.hover.shadow};
          background: ${THEME_COLORS.ui.hover.background};
          border-color: ${THEME_COLORS.ui.active.border};
        }
      `}</style>
    </div>
  );
};

// ============================================
// Example 4: リンクカラーの使用
// ============================================

export const LinkExample: React.FC = () => {
  return (
    <a
      href="#"
      style={{
        color: THEME_COLORS.ui.link.text,
        textDecoration: 'none',
        transition: 'color 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = THEME_COLORS.ui.link.hover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = THEME_COLORS.ui.link.text;
      }}
    >
      テーマカラーのリンク
    </a>
  );
};

// ============================================
// Example 5: コードブロックスタイル
// ============================================

export const CodeBlockExample: React.FC = () => {
  return (
    <pre
      style={{
        background: THEME_COLORS.ui.code.background,
        border: `1px solid ${THEME_COLORS.ui.code.border}`,
        padding: '16px',
        borderRadius: '8px',
        color: 'white',
      }}
    >
      <code>const example = "テーマカラーのコードブロック";</code>
    </pre>
  );
};

// ============================================
// Example 6: Astro コンポーネントでの使用例（コメント）
// ============================================

/*
Astroコンポーネントでの使用例:

---
import { PRIMARY_COLOR, SECONDARY_COLOR } from '@/constants/colors';
---

<div
  style={{
    backgroundColor: PRIMARY_COLOR.rgba(0.1),
    border: `2px solid ${PRIMARY_COLOR.hex}`,
    padding: '20px',
  }}
>
  <h2 style={{ color: PRIMARY_COLOR.hex }}>テーマカラーの見出し</h2>
  <p style={{ color: SECONDARY_COLOR.hex }}>サブテーマカラーのテキスト</p>
</div>

<style define:vars={{ 
  primaryColor: PRIMARY_COLOR.hex,
  secondaryColor: SECONDARY_COLOR.hex 
}}>
  .custom-element {
    color: var(--primaryColor);
    background: var(--secondaryColor);
  }
</style>
*/

// ============================================
// Example 7: Tailwind CSS クラスとの併用
// ============================================

export const TailwindExample: React.FC = () => {
  return (
    <div className="bg-theme-primary text-white p-6 rounded-lg">
      <h3 className="text-theme-secondary">Tailwindテーマカラー</h3>
      <p className="text-theme-primary-light">明るいプライマリカラー</p>
      <p className="text-theme-primary-dark">暗いプライマリカラー</p>
    </div>
  );
};

// ============================================
// Example 8: RGB値を直接使用
// ============================================

export const RGBExample: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: `rgba(${PRIMARY_COLOR.r}, ${PRIMARY_COLOR.g}, ${PRIMARY_COLOR.b}, 0.2)`,
        border: `1px solid rgb(${PRIMARY_COLOR.r}, ${PRIMARY_COLOR.g}, ${PRIMARY_COLOR.b})`,
        padding: '16px',
      }}
    >
      RGB値を直接使用した要素
    </div>
  );
};

