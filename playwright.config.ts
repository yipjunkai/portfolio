import { defineConfig } from "@playwright/test";

const baseURL = "http://127.0.0.1:4173";

export default defineConfig({
  testDir: "./tests",
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL,
    browserName: "chromium",
    viewport: { width: 1280, height: 720 },
    trace: "retain-on-failure"
  },
  webServer: {
    command: "pnpm start --port 4173",
    url: baseURL,
    reuseExistingServer: false,
    timeout: 120_000
  }
});
