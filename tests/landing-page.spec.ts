import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('should load the home page successfully', async ({ page }) => {
    // Navigate to the root URL (base URL is configured as http://localhost:3000)
    await page.goto('/');

    // Check that the page contains standard text from the Next.js starter template
    const mainHeader = page.locator('ol');
    await expect(mainHeader).toBeVisible();
    await expect(mainHeader).toContainText('Get started by editing');

    // Verify the links on the page are correct
    const docsLink = page.locator('a:has-text("Read our docs")');
    await expect(docsLink).toBeVisible();
    await expect(docsLink).toHaveAttribute('href', /nextjs.org\/docs/);
  });

  test('should have footer links', async ({ page }) => {
    await page.goto('/');

    const learnLink = page.locator('a:has-text("Learn")');
    await expect(learnLink).toBeVisible();
    await expect(learnLink).toHaveAttribute('href', /nextjs.org\/learn/);

    const examplesLink = page.locator('a:has-text("Examples")');
    await expect(examplesLink).toBeVisible();
    await expect(examplesLink).toHaveAttribute('href', /vercel.com\/templates/);
  });
});
