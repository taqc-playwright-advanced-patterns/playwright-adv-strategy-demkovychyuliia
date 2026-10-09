import type { Page } from '@playwright/test';

export interface AddToCartStrategy {
  add(page: Page, productName?: string): Promise<void>;
}
