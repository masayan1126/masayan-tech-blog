import { createClient, MicroCMSQueries } from "microcms-js-sdk";
const client = createClient({
  serviceDomain: import.meta.env.MICRO_CMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICRO_CMS_API_KEY,
});
