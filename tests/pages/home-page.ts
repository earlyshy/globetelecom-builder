import { Page,  Locator, expect } from '@playwright/test';
import { BasePage } from '../pages/base-page';


export class HomePage extends BasePage {
    userIcon: Locator;

    constructor(page: Page){
        super(page);
        this.userIcon = this.page.getByRole('button').nth(2);
    }
    async clickUserIcon(): Promise<void>{
        await this.userIcon.click();
    }
}