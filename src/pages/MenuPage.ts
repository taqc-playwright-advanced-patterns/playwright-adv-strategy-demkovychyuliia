import type { Locator, Page } from '@playwright/test';

export class MenuPage {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly totalButton: Locator;
  readonly promoBanner: Locator;
  readonly acceptPromoButton: Locator;
  readonly declinePromoButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartLink = page.getByRole('link', { name: 'Cart page' });

    this.totalButton = page.getByRole('button', {
      name: 'Proceed to checkout',
    });

    this.promoBanner = page.locator('.promo');

    this.acceptPromoButton = page.getByRole('button', {
      name: 'Yes, of course!',
    });

    this.declinePromoButton = page.getByRole('button', {
      name: "Nah, I'll skip.",
    });
  }

  async goto(): Promise<void> {
    await this.page.goto('https://seleniumbase.io/coffee/');
  }

  productByName(name: string): Locator {
    return this.page.getByTestId(name);
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
