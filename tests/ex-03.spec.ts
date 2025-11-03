import { test, expect } from '@playwright/test';

test('tìm phần tử `<h2>` có văn bản "Login Page"', async ({ page }) => {
  await page.goto('http://the-internet.herokuapp.com/login');   
  const locatorH2LoginPage = page.locator('h2', { hasText: 'Login' });
  await expect(locatorH2LoginPage).toBeVisible();
}); 