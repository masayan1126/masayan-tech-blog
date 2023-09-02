/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    reporters: ["default", "html"],
    coverage: {
      provider: "c8",
    },
    alias: {
      "@": path.join(__dirname, "/src"),
    },
    include: ["tests/**/*.test.ts"],
  },
});
