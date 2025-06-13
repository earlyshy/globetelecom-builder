import { Page,  Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';


export class AccountPane extends BasePage {
    turboFrame: Locator;
    userForm: Locator;
    userEmail: Locator;
    userPassword: Locator;
    loginButton: Locator;
    signUpLink: Locator;
    signUpTurboFrame: Locator;
    userPasswordConfirmation: Locator;

    constructor(page: Page){
        super(page);
        this.turboFrame = this.page.locator('turbo-frame[id="login"]');
        this.userForm = this.turboFrame.locator('Form#new_user');
        this.userEmail = this.userForm.locator('input[id="user_email"]');
        this.userPassword = this.userForm.locator('input[id="user_password"]')
        this.signUpLink = this.page.locator('a[href="/user/sign_up"]');

        this.signUpTurboFrame = this.turboFrame.locator('form[data-turbo-frame="_top"]');
        this.userPasswordConfirmation = this.signUpTurboFrame.locator('input[id="user_password_confirmation"]');
    }

    async assertTurboFrameIsLoaded(): Promise<void>{
        await expect(this.turboFrame).toBeVisible();
        await expect(this.turboFrame).toHaveAttribute('complete', '');
    }

    async assertTurboFrameContentIsLoaded(): Promise<void>{
        await expect(this.userForm).toBeVisible();
        await this.assertInputFields();
    }

    async assertSignUpTurboFrameIsLoaded(): Promise<void>{
        await expect(this.signUpTurboFrame).toBeVisible();
        await this.assertInputFields();
    }
    
    async clickSignUpLink(): Promise<void>{
        await this.signUpLink.click();

    }

    async assertInputFields(): Promise<void>{
        await Promise.all([
            await expect(this.userEmail).toBeVisible(),
            await expect(this.userPassword).toBeVisible()
        ]);
    }
}