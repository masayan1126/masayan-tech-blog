/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly MICRO_CMS_SERVICE_DOMAIN: string;
  readonly MICRO_CMS_API_KEY: string;
  /**
   * コンテンツ更新ビルドかどうか
   * - "true": microCMS webhookからのトリガー（APIから最新データ取得）
   * - 未設定: GitHub pushからのトリガー（キャッシュ使用）
   */
  readonly CONTENT_UPDATE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
