import { Page } from '@playwright/test';
import { GLOBAL } from '../../config/global.config';

export class BasePage{
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async navigate(): Promise<this>{
        await this.page.goto(GLOBAL.BASE_URL);
        await this.waitForPageLoad();
        return this;
    }

    async waitForPageLoad(): Promise<void>{
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle');
    }

    
}

export interface PageBuilder<T>{
    build(): Promise<T>;
}
