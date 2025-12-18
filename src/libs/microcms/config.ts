import { createClient } from "microcms-js-sdk";

// 開発環境かどうかを判定（npm run dev時はtrue）
export const IS_DEV_MODE = import.meta.env.DEV;

// 開発環境でも環境変数未設定時のエラー防止
export const client = createClient({
  serviceDomain: import.meta.env.MICRO_CMS_SERVICE_DOMAIN || "dummy",
  apiKey: import.meta.env.MICRO_CMS_API_KEY || "dummy",
});
