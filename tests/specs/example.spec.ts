import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home-page';

test('has title', async ({ page }) => {
  const homePage = new HomePage(page);

  homePage.navigate();
});

