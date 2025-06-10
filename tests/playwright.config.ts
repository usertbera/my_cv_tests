import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e_tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    extraHTTPHeaders: {
      'x-vercel-protection-bypass': process.env.VERCEL_BYPASS_SECRET || '',
    },
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
  },
});
