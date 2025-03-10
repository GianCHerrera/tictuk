import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: false, // Para ver el navegador en acción (true para pruebas en CI)
    viewport: { width: 1280, height: 720 },
    video: 'retain-on-failure',
    trace: 'on',
  },
  reporter: [['html'], ['list']],
});
