import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
//FIXME: mjs alias(参考：https://stackoverflow.com/questions/70158055/how-to-have-aliases-with-nodejs-import)
import { SITE_DOMAIN } from "./src/constants/url.ts";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  adapter: vercel({ runtime: 'nodejs20.x' }),
  site: SITE_DOMAIN,
  build: {
    // 全てのCSSをインライン化してレンダリングブロッキングを解消
    inlineStylesheets: 'always',
  },
  integrations: [
    mdx(),
    sitemap(),
    react({
      include: ['**/*.{jsx,tsx}'],
      experimentalReactChildren: true,
    }),
    tailwind(),
    partytown({
      config: {
        forward: ["dataLayer.push", "clarity", "adsbygoogle.push"],
      },
    }),
  ],
  server: {
    port: 53000,
  },
  vite: {
    define: {
      'process.env.NODE_ENV': '"development"',
    },
    ssr: {
      external: ["svgo"],
    },
    optimizeDeps: {
      exclude: ["@astrojs/partytown"],
    },
    server: {
      proxy: {
        '/images.microcms-assets.io': {
          target: 'https://images.microcms-assets.io',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace('/images.microcms-assets.io', ''),
        },
        '/%22https://images.microcms-assets.io': {
          target: 'https://images.microcms-assets.io',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace('/%22https://images.microcms-assets.io', ''),
        },
        '/%22https%3A//images.microcms-assets.io': {
          target: 'https://images.microcms-assets.io',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace('/%22https%3A//images.microcms-assets.io', ''),
        }
      }
    }
  },
  image: {
    domains: ["images.microcms-assets.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
});
