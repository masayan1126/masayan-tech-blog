/**
 * microCMS Image API を使った画像最適化ユーティリティ
 * @see https://document.microcms.io/image-api/introduction
 */

type ImageFormat = "webp" | "avif" | "jpg" | "png";

interface ImageOptimizeOptions {
  /** 出力幅（ピクセル） */
  width?: number;
  /** 出力高さ（ピクセル） */
  height?: number;
  /** 出力フォーマット */
  format?: ImageFormat;
  /** 品質（1-100） */
  quality?: number;
}

/**
 * microCMS画像URLに最適化パラメータを付与
 * @param url - microCMS画像のURL
 * @param options - 最適化オプション
 * @returns 最適化パラメータ付きのURL
 */
export function optimizeImageUrl(
  url: string,
  options: ImageOptimizeOptions
): string {
  // ローカル画像（相対パス）の場合はそのまま返す
  if (url.startsWith("/")) {
    return url;
  }

  const urlObj = new URL(url);

  if (options.width) {
    urlObj.searchParams.set("w", String(options.width));
  }
  if (options.height) {
    urlObj.searchParams.set("h", String(options.height));
  }
  if (options.format) {
    urlObj.searchParams.set("fm", options.format);
  }
  if (options.quality) {
    urlObj.searchParams.set("q", String(options.quality));
  }

  return urlObj.toString();
}
