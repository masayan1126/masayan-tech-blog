import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";

import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  site: "https://thriving-marzipan-3293ea.netlify.app",
  integrations: [mdx(), sitemap(), react(), tailwind(), partytown(), image()],
  server: {
    port: 53000
  }
});