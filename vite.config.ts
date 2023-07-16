/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    reporters: ["default", "html"],
    coverage: {
      provider: "c8", // カバレッジ
    },
    alias: {
      "@": path.join(__dirname, "/src"),
    },
  },
});