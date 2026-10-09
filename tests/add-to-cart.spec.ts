import { expect, test } from '@playwright/test';
import { CartPage } from '../src/pages/CartPage';
import { MenuPage } from '../src/pages/MenuPage';
import { CartContext } from '../src/strategies/add-to-cart/CartContext';
import { DirectClickStrategy } from '../src/strategies/add-to-cart/DirectClickStrategy';
import { MultiItemStrategy } from '../src/strategies/add-to-cart/MultiItemStrategy';
import { PromoMochaStrategy } from '../src/strategies/add-to-cart/PromoMochaStrategy';

test.describe('Add to cart — Strategy', () => {
  let menuPage: MenuPage;

  test.beforeEach(async ({ page }) => {
    menuPage = new MenuPage(page);
    await menuPage.goto();
  });

  test('adds Espresso via DirectClickStrategy', async ({ page }) => {
    const context = new CartContext(new DirectClickStrategy());

    await context.addToCart(page, 'Espresso');

    await expect(menuPage.cartLink).toContainText('1');

    await menuPage.openCart();

    const cartPage = new CartPage(page);
    await expect(cartPage.itemByName('Espresso')).toBeVisible();
  });

  test('adds Mocha via PromoMochaStrategy', async ({ page }) => {
    const context = new CartContext(new PromoMochaStrategy());

    await context.addToCart(page);

    await expect(menuPage.cartLink).toContainText('4');

    await menuPage.openCart();

    const cartPage = new CartPage(page);
    await expect(cartPage.itemByName('Mocha')).toBeVisible();
  });

  test('adds several drinks via MultiItemStrategy', async ({ page }) => {
    const context = new CartContext(new MultiItemStrategy(['Espresso', 'Cappuccino']));

    await context.addToCart(page);

    await expect(menuPage.cartLink).toContainText('2');

    await menuPage.openCart();

    const cartPage = new CartPage(page);
    await expect(cartPage.itemByName('Espresso')).toBeVisible();
    await expect(cartPage.itemByName('Cappuccino')).toBeVisible();
  });

  test('can switch strategy mid-scenario (setStrategy)', async ({ page }) => {
    const context = new CartContext(new DirectClickStrategy());

    await context.addToCart(page, 'Espresso');

    context.setStrategy(new PromoMochaStrategy());
    await context.addToCart(page);

    await menuPage.openCart();

    const cartPage = new CartPage(page);
    await expect(cartPage.itemByName('Espresso')).toBeVisible();
    await expect(cartPage.itemByName('Mocha')).toBeVisible();
  });
});
