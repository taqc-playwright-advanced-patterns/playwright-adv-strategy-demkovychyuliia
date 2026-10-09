import type { Page } from '@playwright/test';
import { MenuPage } from '../../pages/MenuPage';
import type { AddToCartStrategy } from './AddToCartStrategy';

export class PromoMochaStrategy implements AddToCartStrategy {
  async add(page: Page, _productName?: string): Promise<void> {
    const menuPage = new MenuPage(page);

    for (let i = 0; i < 3; i++) {
      if (await menuPage.promoBanner.isVisible()) {
        await menuPage.acceptPromoButton.click();
        return;
      }

      await menuPage.productByName('Espresso').click();
    }

    if (await menuPage.promoBanner.isVisible()) {
      await menuPage.acceptPromoButton.click();
      return;
    }

    throw new Error('Mocha promo did not appear after adding drinks');
  }
}
