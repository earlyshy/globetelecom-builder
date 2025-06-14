import { test, Page,  Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';
import { FileManager } from '../utils/file-manager';

export class AccountPane extends BasePage {
    turboFrame: Locator;
    userForm: Locator;
    userEmail: Locator;
    userPassword: Locator;
    loginButton: Locator;
    signUpLink: Locator;
    signUpTurboFrame: Locator;
    userPasswordConfirmation: Locator;
    signUpButton: Locator;
    constructor(page: Page){
        super(page);
        this.turboFrame = this.page.locator('turbo-frame[id="login"]');
        this.userForm = this.turboFrame.locator('Form#new_user');
        this.userEmail = this.userForm.locator('input[id="user_email"]');
        this.userPassword = this.userForm.locator('input[id="user_password"]')
        this.signUpLink = this.page.locator('a[href="/user/sign_up"]');

        this.signUpTurboFrame = this.turboFrame.locator('form[data-turbo-frame="_top"]');
        this.userPasswordConfirmation = this.signUpTurboFrame.locator('input[id="user_password_confirmation"]');
        this.signUpButton = this.signUpTurboFrame.locator('input[type="submit"]');
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

    async enterFieldValue(locator: Locator, value: string): Promise<void>{
        try{
            const stringValue = this.toFormValue(value);
            await locator.fill(stringValue);
            await expect(locator).toHaveValue(stringValue);

        }catch(error) {
            console.error(`Error entering value in field: ${error}`);
            throw error;
        }
    }

    async clickSignUpButton(){
        await this.signUpButton.click();
    }

    async fillSignUpForm(userData: any): Promise<void>{
        if(!userData){
            throw new Error('User data is required to fill the sign-up form');
        }

        await this.enterFieldValue(this.userEmail, userData.email);
        await this.enterFieldValue(this.userPassword, userData.password);
        await this.enterFieldValue(this.userPasswordConfirmation, userData.password);
        FileManager.saveUserData(userData);
        
    }

    async fillAndSubmitSignUpForm(userData: any): Promise<void>{
        await this.fillSignUpForm(userData);
        await this.clickSignUpButton();
        await this.page.waitForTimeout(20000);
    }
    private toFormValue(value: string): string {
        if (value === null || value === undefined){
            return '';
        }
        return String(value)
    
    }

}