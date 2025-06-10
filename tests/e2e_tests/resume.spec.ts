import { test, expect } from '@playwright/test';

test.describe('Resume Page - Full Coverage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // Navigation
  test('Navigation links scroll to correct sections', async ({ page }) => {
    const navSections = ['About', 'Experience', 'Education', 'Skills', 'Certifications', 'Projects', 'Contact'];

    for (const section of navSections) {
      await page.click(`nav >> text=${section}`);
      await page.waitForTimeout(300); // small wait for scroll
      const id = section.toLowerCase();
      await expect(page.locator(`section#${id}`)).toBeVisible();
    }
  });

  // Dark Mode
  test('Toggle dark mode updates the document', async ({ page }) => {
    await page.locator('button[aria-label="Toggle dark mode"]').click();
    const htmlClass = await page.locator('html').getAttribute('class');
    expect(htmlClass).toContain('dark');
  });

  // About Section
  test('About section shows name, title, summary, and avatar', async ({ page }) => {
    await page.locator('nav >> text=About').click();
    await expect(page.locator('section#about')).toBeVisible();
    await expect(page.locator('img[alt="Profile"]')).toBeVisible();
    await expect(page.locator('h2:has-text("Tapabrata Bera")')).toBeVisible();
  });

  // Experience
  test('Experience section renders experience cards with company, role, and description', async ({ page }) => {
    await page.locator('nav >> text=Experience').click();
    const cards = page.locator('#experience .text-xl');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0); 
    await expect(cards.nth(0)).toContainText(/.+/); // Some role
  });

  // Education
  test('Education section renders milestones', async ({ page }) => {
    await page.locator('nav >> text=Education').click();
    const items = page.locator('#education .font-medium');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
  });

  // Skills
  test('Skills section shows strengths list with icons and descriptions', async ({ page }) => {
    await page.locator('nav >> text=Skills').click();
    const skills = page.locator('#skills li');
    const count = await skills.count();
    expect(count).toBeGreaterThan(5); 
  });

  // Certifications
  test('Certifications section loads cert tiles with links', async ({ page }) => {
    await page.locator('nav >> text=Certifications').click();
    const certs = page.locator('#certifications a');
    const count = await certs.count();
    expect(count).toBeGreaterThan(0);
    await expect(certs.nth(0)).toHaveAttribute('href', /http/);
  });

  test('Projects section has carousel of project cards with previews', async ({ page }) => {
    await page.locator('nav >> text=Projects').click();
    const cards = page.locator('#projects .rounded-xl');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    await expect(cards.nth(0).locator('a')).toHaveText(/.+/);
    await expect(cards.nth(0).locator('img, span')).toBeVisible();
   });

  //Reviews
  test('each review card should have name, review, LinkedIn link, and star ratings', async ({ page }) => {
    const cards = page.locator('section#reviews div.rounded-xl.shadow-lg');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    const firstCard = page.locator('section#reviews div.rounded-xl.shadow-lg').first();
    await expect(firstCard.locator('a.font-semibold')).toBeVisible();
    await expect(firstCard.locator('a[href*="linkedin.com"]')).toBeVisible();
    await expect(firstCard.locator('svg.text-yellow-400')).toHaveCount(5);
    await expect(firstCard.locator('p.text-sm')).not.toHaveText('');
  });


  // Contact
  test('Contact section displays email, LinkedIn and GitHub links', async ({ page }) => {
    await page.locator('nav >> text=Contact').click();
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();

    await expect(contactSection.locator('a[href^="mailto:"]')).toBeVisible();
    const count = await contactSection.locator('a').count();
    expect(count).toBeGreaterThan(1);
  });

  // Download Resume
  test('Download resume button triggers file download', async ({ page, context }) => {
    const [ download ] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('text=Resume').click()
    ]);
    const suggestedFilename = download.suggestedFilename();
    expect(suggestedFilename).toMatch(/\.pdf$/);
  });
});
