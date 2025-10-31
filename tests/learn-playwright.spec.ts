import { test, expect } from '@playwright/test';

test('my first test', async ({ page }) => {
  await page.goto('https://google.com');
  await expect(page).toHaveTitle(/Google/);
});

test('locators and actions', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Use getByRole to find the "Get started" link and click it.
  // This is the recommended way to locate elements.
  await page.getByRole('link', { name: 'Get started' }).click();

  // After clicking, the URL should change.
  await expect(page).toHaveURL(/docs\/intro/);

  // Use getByText to find an element by its visible text.
  // We'll find the "Writing tests" link in the sidebar.
  const writingTestsLink = page.getByText('Writing tests');
  await expect(writingTestsLink).toBeVisible();

  // Now, let's try filling an input. We'll use the search bar.
  // We can locate it by its placeholder text.
  const searchInput = page.getByPlaceholder('Search docs');

  // Fill the input with some text.
  await searchInput.fill('locators');

  // Press the "Enter" key to initiate the search.
  await searchInput.press('Enter');

  // Wait for the search results to appear and verify them.
  // We expect to see a result with the text "Locators".
  const searchResult = page.getByText('Locators');
  await expect(searchResult).toBeVisible();
});
