import type { PlaywrightTestConfig } from "@playwright/test";
const config: PlaywrightTestConfig = {
  updateSnapshots: "missing",
  timeout: 20000,
  webServer: {
    command: "pnpm build && pnpm serve",
    port: 3008,
    reuseExistingServer: true,
    timeout: 20000,
  },
  workers: 8,
  retries: process.env.CI ? 2 : 0,
  projects: [
    {
      name: "test",
      use: {
        javaScriptEnabled: true,
      },
    },
  ],
  use: {
    baseURL: "http://localhost:3008",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    launchOptions: {
      ignoreDefaultArgs: ["--hide-scrollbars"],
    },
  },
};
export default config;
