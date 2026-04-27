import { test as base } from '@playwright/test';
import LoginPage from '../../../pageObjects/pages/login.page';
import ProductsPage from '../../../pageObjects/pages/products.page';
import CheckoutPage from '../../../pageObjects/pages/checkout.page';

export const test = base.extend<{ loginPage: LoginPage; productsPage: ProductsPage; checkoutPage: CheckoutPage; }>(
    {
        //Define fixture
        loginPage: async ({ page }, use) => {
            await use(new LoginPage(page))
        },
        productsPage: async ({ page }, use) => {
            await use(new ProductsPage(page))
        },
        checkoutPage: async({ page}, user) =>{
            await user(new CheckoutPage(page))
        },
    }
)