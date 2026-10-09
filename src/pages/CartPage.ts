import type { Locator, Page } from '@playwright/test';
export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.checkoutButton = page.getByRole('button', {
      name: 'Proceed to checkout',
    });
  }

  itemByName(name: string): Locator {
    const mainCartList = this.page.locator('.list-header').locator('..');

    return mainCartList.locator('li.list-item').filter({
      hasText: name,
    });
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
