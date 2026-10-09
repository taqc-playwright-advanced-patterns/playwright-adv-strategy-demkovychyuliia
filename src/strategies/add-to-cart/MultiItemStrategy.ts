import type { Page } from '@playwright/test';
import { MenuPage } from '../../pages/MenuPage';
import type { AddToCartStrategy } from './AddToCartStrategy';

export class MultiItemStrategy implements AddToCartStrategy {
  constructor(private readonly drinks: string[]) {}

  async add(page: Page, _productName?: string): Promise<void> {
    const menuPage = new MenuPage(page);

    for (const drink of this.drinks) {
      await menuPage.productByName(drink).click();
    }
  }
}
