import { Page } from "@playwright/test";

export default class ProductsPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  lblProducts = () => this.page.getByText('Products');
  productTitle = () => this.page.locator('.inventory_details_name');
  iconCart = () => this.page.locator('.shopping_cart_badge');
  linkCart = () => this.page.locator('.shopping_cart_link');
  btnCheckout = () => this.page.locator('[data-test="checkout"]');

  // Dynamic locators
  btnAddToCart = (productName: string) => {
    const formattedName = productName.toLowerCase().replace(/\s+/g, '-');
    return this.page.locator(`[data-test="add-to-cart-${formattedName}"]`);
  };

  btnRemoveFromCart = (productName: string) => {
    const formattedName = productName.toLowerCase().replace(/\s+/g, '-');
    return this.page.locator(`[data-test="remove-${formattedName}"]`);
  };

  // Actions
  async openProduct(productName: string) {
    await this.page.getByText(productName).click();
  }

  async productsIsVisible() {
    return this.lblProducts().isVisible();
  }

  async addToCart(productName: string) {
    await this.btnAddToCart(productName).click();
  }

  async goToCart() {
    await this.linkCart().click();
  }

  async removeFromCart(productName: string) {
    await this.btnRemoveFromCart(productName).click();
  }

  async checkout() {
    await this.btnCheckout().click();
  }
}
