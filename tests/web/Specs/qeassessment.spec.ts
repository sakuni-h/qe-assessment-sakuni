import { expect } from '@playwright/test';
import { test } from '../fixtures/basePage'; 
import products from '../../../testData/UI/products.json';
import checkoutData from '../../../testData/UI/checkout.json';

const url = process.env.WEB_URL!;
const username = process.env.WEB_USERNAME!;
const password = process.env.WEB_PASSWORD!;

test.describe('QE Assessment - SauceDemo', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToPage(url);
  });

  // Login and Logout
  test('Login and Logout @assessment', async ({ loginPage, productsPage }) => {
    await loginPage.userLogin(username, password);
    await expect(productsPage.lblProducts()).toBeVisible();
    await loginPage.logout();
    await expect(loginPage.btnSignIn()).toBeVisible();
  });

  // Invalid Login
  test('Invalid Login @assessment', async ({ loginPage }) => {
    await loginPage.userLogin('wrongUser', 'wrongPass');
    await expect(loginPage.loginError()).toBeVisible();
  });

  // View Product
  test('View Product @assessment', async ({ loginPage, productsPage }) => {
    await loginPage.userLogin(username, password);
    await productsPage.openProduct(products.backpack);
    await expect(productsPage.productTitle()).toHaveText(products.backpack);
  });

  // Cart flow and Checkout
  test('Cart flow and Checkout @assessment', async ({ loginPage, productsPage, checkoutPage }) => {
    await loginPage.userLogin(username, password);

    // Add products
    await productsPage.addToCart(products.backpack);
    await productsPage.addToCart(products.bikeLight);
    await expect(productsPage.iconCart()).toHaveText('2');

    // Go to cart
    await productsPage.goToCart();

    // Remove backpack
    await productsPage.removeFromCart(products.backpack);
    await expect(productsPage.iconCart()).toHaveText('1');

    // Checkout
    await productsPage.checkout();
    await expect(productsPage.page.locator('.title')).toHaveText('Checkout: Your Information');

    // Fill checkout form 
    await checkoutPage.fillCheckoutForm(
      checkoutData.firstName,
      checkoutData.lastName,
      checkoutData.postalCode
    );
    await expect(productsPage.page.locator('.title')).toHaveText('Checkout: Overview');

    // Finish order
    await checkoutPage.finishOrder();
    await expect(productsPage.page.locator('.complete-header')).toHaveText('Thank you for your order!');

    // Back home
    await checkoutPage.backHome();
    await expect(productsPage.lblProducts()).toBeVisible();
  });

});
