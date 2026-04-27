import { Page } from "@playwright/test";

export default class CheckoutPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  txtFirstName = () => this.page.locator('[data-test="firstName"]');
  txtLastName = () => this.page.locator('[data-test="lastName"]');
  txtPostalCode = () => this.page.locator('[data-test="postalCode"]');
  btnContinue = () => this.page.locator('[data-test="continue"]');
  btnFinish = () => this.page.locator('[data-test="finish"]');
  btnBackHome = () => this.page.locator('[data-test="back-to-products"]');
  lblOverviewTitle = () => this.page.locator('.title');
  lblCompleteHeader = () => this.page.locator('.complete-header');

  // Actions
  async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
    await this.txtFirstName().fill(firstName);
    await this.txtLastName().fill(lastName);
    await this.txtPostalCode().fill(postalCode);
    await this.btnContinue().click();
  }

  async finishOrder() {
    await this.btnFinish().click();
  }

  async backHome() {
    await this.btnBackHome().click();
  }
}
