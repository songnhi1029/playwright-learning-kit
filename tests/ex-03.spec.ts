import { test, expect } from '@playwright/test';

test('tìm phần tử `<h2>` có văn bản "Login Page"', async ({ page }) => {
  await page.goto('http://the-internet.herokuapp.com/login');   
  const locatorH2LoginPage = page.locator('h2', { hasText: 'Login' });
  await expect(locatorH2LoginPage).toBeVisible();
  await expect(locatorH2LoginPage).toHaveCount(1);
}); 


test('tìm trường nhập liệu có nhãn "Username"', async ({ page }) => {
  await page.goto('http://the-internet.herokuapp.com/login');
  const locatorInputUsername = page.getByLabel('Username');
  await expect(locatorInputUsername).toBeVisible();
  await expect(locatorInputUsername).toBeEnabled();
  await expect(locatorInputUsername).toBeEditable()
  await expect(locatorInputUsername).toHaveAttribute('type', 'text');
  await expect(locatorInputUsername).toHaveAttribute('name', 'username');
  await expect(locatorInputUsername).toHaveAttribute('placeholder', 'Username');
  await expect(locatorInputUsername).toHaveAttribute('value', '');
  await expect(locatorInputUsername).toHaveAttribute('maxlength', '20');
  await expect(locatorInputUsername).toHaveAttribute('minlength', '3');
  await expect(locatorInputUsername).toHaveAttribute('required', 'true');
  await expect(locatorInputUsername).toHaveAttribute('autocomplete', 'username');
  await expect(locatorInputUsername).toHaveAttribute('autofocus', 'true');
});
