/**
 * サイト全体のカラーテーマ定義
 * 
 * テーマカラーの統一管理を行うための定数ファイル
 */

// ============================================
// プライマリカラー（メインテーマカラー）
// ============================================

/**
 * プライマリカラー - 黄色
 * サイトのメインテーマカラー
 */
export const PRIMARY_COLOR = {
  /** HEX形式: #F3BC45 */
  hex: '#F3BC45',
  
  /** RGB形式: rgb(243, 188, 69) */
  rgb: 'rgb(243, 188, 69)',
  
  /** RGB値 */
  r: 243,
  g: 188,
  b: 69,
  
  /** 透明度付きの値を生成する関数 */
  rgba: (alpha: number): string => `rgba(243, 188, 69, ${alpha})`,
  
  /** Tailwind用のカラー名 */
  tailwind: {
    text: 'text-yellow-400',
    bg: 'bg-yellow-400',
    border: 'border-yellow-400',
    hover: 'hover:text-yellow-400',
  },
} as const;

// ============================================
// セカンダリカラー（サブテーマカラー）
// ============================================

/**
 * セカンダリカラー - 緑
 * サイトのサブテーマカラー
 */
export const SECONDARY_COLOR = {
  /** HEX形式: #60823E */
  hex: '#60823E',
  
  /** RGB形式: rgb(96, 130, 62) */
  rgb: 'rgb(96, 130, 62)',
  
  /** RGB値 */
  r: 96,
  g: 130,
  b: 62,
  
  /** 透明度付きの値を生成する関数 */
  rgba: (alpha: number): string => `rgba(96, 130, 62, ${alpha})`,
  
  /** Tailwind用のカラー名 */
  tailwind: {
    text: 'text-green-600',
    bg: 'bg-green-600',
    border: 'border-green-600',
    hover: 'hover:text-green-600',
  },
} as const;

// ============================================
// カラーグラデーション
// ============================================

/**
 * グラデーションパターン
 */
export const GRADIENTS = {
  /** プライマリ→セカンダリのグラデーション */
  primaryToSecondary: {
    css: `linear-gradient(135deg, ${PRIMARY_COLOR.hex}, ${SECONDARY_COLOR.hex})`,
    tailwind: 'from-yellow-400 via-green-400 to-emerald-500',
  },
  
  /** プライマリカラーのグラデーション（明→暗） */
  primaryShades: {
    css: `linear-gradient(135deg, ${PRIMARY_COLOR.rgba(0.12)}, ${PRIMARY_COLOR.rgba(0.06)})`,
    tailwind: 'from-yellow-400 to-yellow-600',
  },
  
  /** セカンダリカラーのグラデーション（明→暗） */
  secondaryShades: {
    css: `linear-gradient(135deg, ${SECONDARY_COLOR.rgba(0.15)}, ${SECONDARY_COLOR.rgba(0.05)})`,
    tailwind: 'from-green-500 to-emerald-600',
  },
} as const;

// ============================================
// UIコンポーネント用カラーパターン
// ============================================

/**
 * UIコンポーネントで使用するカラーパターン
 */
export const UI_COLORS = {
  /** ホバー効果 */
  hover: {
    shadow: PRIMARY_COLOR.rgba(0.2),
    border: PRIMARY_COLOR.rgba(0.3),
    background: PRIMARY_COLOR.rgba(0.1),
  },
  
  /** フォーカス効果 */
  focus: {
    ring: PRIMARY_COLOR.rgba(0.5),
  },
  
  /** アクティブ状態 */
  active: {
    background: PRIMARY_COLOR.rgba(0.15),
    border: PRIMARY_COLOR.rgba(0.4),
  },
  
  /** カード */
  card: {
    border: PRIMARY_COLOR.rgba(0.3),
    overlay: `linear-gradient(135deg, ${PRIMARY_COLOR.rgba(0.12)}, ${PRIMARY_COLOR.rgba(0.06)})`,
  },
  
  /** バッジ */
  badge: {
    border: PRIMARY_COLOR.rgba(0.4),
    shadow: PRIMARY_COLOR.rgba(0.25),
  },
  
  /** リンク */
  link: {
    text: PRIMARY_COLOR.hex,
    hover: PRIMARY_COLOR.rgba(0.8),
  },
  
  /** コードブロック */
  code: {
    background: SECONDARY_COLOR.rgba(0.2),
    border: SECONDARY_COLOR.rgba(0.3),
  },
  
  /** 引用 */
  blockquote: {
    border: SECONDARY_COLOR.rgba(0.6),
    background: SECONDARY_COLOR.rgba(0.15),
    icon: SECONDARY_COLOR.rgba(0.4),
  },
} as const;

// ============================================
// テーマカラー設定のエクスポート
// ============================================

/**
 * サイト全体のテーマカラー設定
 */
export const THEME_COLORS = {
  primary: PRIMARY_COLOR,
  secondary: SECONDARY_COLOR,
  gradients: GRADIENTS,
  ui: UI_COLORS,
} as const;

/**
 * カラーパレット（簡易アクセス用）
 */
export const COLORS = {
  /** プライマリカラー（黄色） */
  yellow: PRIMARY_COLOR.hex,
  
  /** セカンダリカラー（緑） */
  green: SECONDARY_COLOR.hex,
  
  /** プライマリRGBA */
  yellowRgba: PRIMARY_COLOR.rgba,
  
  /** セカンダリRGBA */
  greenRgba: SECONDARY_COLOR.rgba,
} as const;

