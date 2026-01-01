/**
 * ビルド時キャッシュユーティリティ
 *
 * 【用途】コードpush時のmicroCMS APIリクエスト削減
 *
 * ビルドトリガーによって動作が変わる：
 * - microCMS webhook経由 (CONTENT_UPDATE=true): APIから最新データを取得しキャッシュ更新
 * - GitHub push経由 (CONTENT_UPDATE未設定): キャッシュがあれば使用、なければAPI取得
 *
 * キャッシュ場所:
 * - Vercelビルド時: node_modules/.cache/microcms/ (ビルド間で保持)
 * - ローカル: .cache/microcms/
 *
 * 設定方法:
 * microCMSのWebhook URLを以下のように変更:
 * https://api.vercel.com/v1/integrations/deploy/prj_xxx/xxx?buildEnv[CONTENT_UPDATE]=true
 */
import * as fs from 'node:fs';
import * as path from 'node:path';

// コンテンツ更新ビルドかどうか（microCMS webhookからのトリガー）
export const IS_CONTENT_UPDATE = import.meta.env.CONTENT_UPDATE === 'true';

// キャッシュディレクトリ（Vercelビルドで保持される場所）
const CACHE_DIR = process.env.VERCEL
  ? path.join(process.cwd(), 'node_modules', '.cache', 'microcms')
  : path.join(process.cwd(), '.cache', 'microcms');

/**
 * キャッシュディレクトリを作成
 */
function ensureCacheDir(): void {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
}

/**
 * キャッシュファイルのパスを取得
 */
function getCachePath(key: string): string {
  return path.join(CACHE_DIR, `${key}.json`);
}

/**
 * キャッシュからデータを読み込む
 */
export function readCache<T>(key: string): T | null {
  const cachePath = getCachePath(key);

  if (!fs.existsSync(cachePath)) {
    return null;
  }

  try {
    const data = fs.readFileSync(cachePath, 'utf-8');
    const parsed = JSON.parse(data);
    console.log(`[BuildCache] Cache hit: ${key}`);
    return parsed as T;
  } catch (error) {
    console.warn(`[BuildCache] Failed to read cache: ${key}`, error);
    return null;
  }
}

/**
 * キャッシュにデータを書き込む
 */
export function writeCache<T>(key: string, data: T): void {
  ensureCacheDir();
  const cachePath = getCachePath(key);

  try {
    fs.writeFileSync(cachePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`[BuildCache] Cache written: ${key}`);
  } catch (error) {
    console.warn(`[BuildCache] Failed to write cache: ${key}`, error);
  }
}

/**
 * キャッシュ付きでデータを取得
 *
 * - CONTENT_UPDATE=true: 常にfetcherを実行しキャッシュ更新
 * - CONTENT_UPDATE未設定: キャッシュがあれば使用、なければfetcher実行
 */
export async function withCache<T>(
  key: string,
  fetcher: () => Promise<T>
): Promise<T> {
  // コンテンツ更新の場合は常に最新を取得
  if (IS_CONTENT_UPDATE) {
    console.log(`[BuildCache] Content update build - fetching fresh: ${key}`);
    const data = await fetcher();
    writeCache(key, data);
    return data;
  }

  // キャッシュがあれば使用
  const cached = readCache<T>(key);
  if (cached !== null) {
    return cached;
  }

  // キャッシュがなければ取得して保存
  console.log(`[BuildCache] No cache found - fetching: ${key}`);
  const data = await fetcher();
  writeCache(key, data);
  return data;
}
