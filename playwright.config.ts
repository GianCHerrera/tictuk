import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: false, 
    viewport: { width: 1280, height: 720 },
    video: 'retain-on-failure',
    trace: 'on',
    navigationTimeout: 30000,
    actionTimeout: 15000,
  },
  reporter: [['html'], ['list']],
  timeout: 60000,
});
