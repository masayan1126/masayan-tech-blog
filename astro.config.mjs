import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import { SITE_DOMAIN } from "./src/consts"; //FIXME: mjs alias(参考：https://stackoverflow.com/questions/70158055/how-to-have-aliases-with-nodejs-import)

// https://astro.build/config
export default defineConfig({
  site: SITE_DOMAIN,
  integrations: [
    mdx(),
    sitemap(),
    react(),
    tailwind(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  server: {
    port: 53000,
  },
});
