import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { BasePage } from '../pages/base-page';
import { AccountPane } from '../pages/account-pane';
import { generateUserData } from '../utils/user-data-generator';

test.describe('Home Page Tests', () => {
  test('has title', async ({ page }) => {
    const basePage = new BasePage(page);
    const homePage = new HomePage(page);
    const accountPane = new AccountPane(page);
    const userData = generateUserData();

    await basePage.navigate();
    await homePage.clickUserIcon();
    await accountPane.assertTurboFrameIsLoaded();
    await accountPane.assertTurboFrameContentIsLoaded();
    await accountPane.clickSignUpLink();
    await accountPane.assertSignUpTurboFrameIsLoaded();
    await accountPane.fillAndSubmitSignUpForm(userData);

  });

});