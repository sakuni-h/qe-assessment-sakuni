import { Page } from "@playwright/test";

export default class LoginPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async navigateToPage(url: string) {
        await this.page.goto(url, { waitUntil: "domcontentloaded" });
        console.log(`Navigate to: `);
    }

    // LOCATORS
    // Login Page
    txtUsername = () => this.page.locator('[data-test="username"]'); 
    pwdPassword = () => this.page.locator('[data-test="password"]'); 
    btnSignIn = () => this.page.getByRole('button', { name: 'LOGIN' }); 
    lblError = () => this.page.locator('[data-test="error"]'); 

    // Logout
    menuButton = () => this.page.locator('#react-burger-menu-btn');
    logoutLink = () => this.page.locator('#logout_sidebar_link');

    // ACTIONS
    // user login 
    public async userLogin(username: string, password: string) {
        await this.txtUsername().fill(username);
        await this.pwdPassword().fill(password);
        await this.btnSignIn().click();
        console.log("Login using: " + username + " username");
    }

    // Logout
    public async logout() {
        await this.menuButton().click();
        await this.logoutLink().click();
    }

    // invalid login
    public loginError() {
        return this.lblError();
    }
}
