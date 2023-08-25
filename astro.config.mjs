import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";

import image from "@astrojs/image";
import { SITE_DOMAIN } from "@/consts";

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
    image(),
  ],
  server: {
    port: 53000,
  },
});
