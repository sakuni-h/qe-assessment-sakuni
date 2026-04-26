import { expect } from '@playwright/test';
import { test } from '../fixtures/basePage'; 
import products from '../../../testData/UI/products.json';

const url = process.env.WEB_URL!;
const username = process.env.WEB_USERNAME!;
const password = process.env.WEB_PASSWORD!;

test.describe('QE Assessment - SauceDemo', () => {
test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToPage(url);
    await loginPage.userLogin(username, password);
    });

// Login and Logout
    test('Login and Logout @assessment', async ({ loginPage, productsPage }) => {
    await expect(productsPage.lblProducts()).toBeVisible();
    await loginPage.logout();
    await expect(loginPage.btnSignIn()).toBeVisible();
    });

// View Product
    test('View Product @assessment', async ({ productsPage }) => {
    await productsPage.openProduct(products.backpack);
    await expect(productsPage.productTitle()).toHaveText(products.backpack);
    });

// Add multiple products, view cart, remove one, and checkout
    test('Cart flow @assessment', async ({ productsPage }) => {
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
    });

});
