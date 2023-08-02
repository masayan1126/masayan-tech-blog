import { createClient } from "microcms-js-sdk";
export const client = createClient({
  serviceDomain: import.meta.env.VITE_MICRO_CMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.VITE_MICRO_CMS_API_KEY,
});
