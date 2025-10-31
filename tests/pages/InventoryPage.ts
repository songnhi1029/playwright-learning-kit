import { type Page, type Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;
  readonly sidebarMenuButton: Locator;
  readonly logoutLink: Locator;
  readonly cartLink: Locator;
  readonly removeSauceLabsBackpackButton: Locator;
  readonly inventoryItemNames: Locator;
  readonly inventoryItemPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.sortDropdown = page.locator('[data-test="product_sort_container"]');
    this.sidebarMenuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
    this.cartLink = page.locator('a.shopping_cart_link');
    this.removeSauceLabsBackpackButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.inventoryItemNames = page.locator('.inventory_item_name');
    this.inventoryItemPrices = page.locator('.inventory_item_price');
  }

  async addItemToCart(itemName: string) {
    const addButton = this.page.locator(`[data-test="add-to-cart-${itemName.toLowerCase().replace(/ /g, '-')}"]`);
    await addButton.click();
  }

  async removeItemFromCart(itemName: string) {
    const removeButton = this.page.locator(`[data-test="remove-${itemName.toLowerCase().replace(/ /g, '-')}"]`);
    await removeButton.click();
  }

  async logout() {
    await this.sidebarMenuButton.click();
    await this.logoutLink.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async sortItems(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async getAllItemPrices(): Promise<number[]> {
    const pricesText = await this.inventoryItemPrices.allTextContents();
    return pricesText.map(price => parseFloat(price.replace('$', '')));
  }
}
