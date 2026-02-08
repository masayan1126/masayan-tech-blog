import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    reporters: ["default", "html"],
    coverage: {
      provider: "v8",
    },
    alias: {
      "@": path.join(__dirname, "/src"),
    },
    include: ["tests/**/*.test.{ts,tsx}"],
  },
});
