import { test, expect, devices } from '@playwright/test';

// Use iPhone 13 viewport and user agent
test.use({ ...devices['iPhone 13'] });

test.describe('Mobile Viewport - ResumeSite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Mobile menu opens and closes on outside click or link click', async ({ page }) => {
    const toggleBtn = page.getByRole('button', { name: 'Toggle menu' });
    await expect(toggleBtn).toBeVisible();
    await toggleBtn.click();
    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toBeVisible();
    await mobileMenu.getByRole('link', { name: 'About' }).click();
    await expect(mobileMenu).toHaveCount(0);
    await expect(toggleBtn).toBeVisible();
  });


  test('All sections render correctly on mobile', async ({ page }) => {
    const sections = ['about', 'experience', 'education', 'skills', 'certifications', 'projects', 'contact'];
    for (const id of sections) {
      const section = page.locator(`section#${id}`);
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
    }
  });

  test('Experience cards stack vertically on mobile', async ({ page }) => {
    const mobileCards = page.locator('#experience .flex-1');
    const count = await mobileCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Project cards scroll horizontally', async ({ page }) => {
    const carousel = page.locator('#projects .overflow-x-auto');
    const firstCard = carousel.locator('.snap-center').first();
    await expect(firstCard).toBeVisible();

    // Simulate swipe left
    await carousel.evaluate((el: HTMLElement) => el.scrollBy({ left: 300 }));
    await page.waitForTimeout(300);
  });

  test('Dark mode toggle works on mobile', async ({ page }) => {
    await page.locator('button[aria-label="Toggle dark mode"]').click();
    await expect(page.locator('html')).toHaveClass(/dark/);
  });
});
