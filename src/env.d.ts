/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly MICRO_CMS_SERVICE_DOMAIN: string;
  readonly MICRO_CMS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
