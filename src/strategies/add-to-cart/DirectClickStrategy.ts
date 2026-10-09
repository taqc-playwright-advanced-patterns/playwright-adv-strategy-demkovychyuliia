import type { Page } from '@playwright/test';
import { MenuPage } from '../../pages/MenuPage';
import type { AddToCartStrategy } from './AddToCartStrategy';

export class DirectClickStrategy implements AddToCartStrategy {
  async add(page: Page, productName?: string): Promise<void> {
    if (!productName) {
      throw new Error('Product name must be provided');
    }

    const menuPage = new MenuPage(page);
    await menuPage.productByName(productName).click();
  }
}
