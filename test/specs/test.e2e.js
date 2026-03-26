import { browser, expect, $ } from '@wdio/globals'
import LoginPage from '../pageobjects/login.js'
import SecurePage from '../pageobjects/secure.page.js'

describe('Hamburger Menu Testing -', () => {
    it('should use the All Items button correctly', async () => {
        await LoginPage.open();

            await LoginPage.login('standard_user', 'secret_sauce');
                for (let item = 0; item < SecurePage.items.length; item++) {
                    await expect(SecurePage.hamburgerMenu).toBeDisplayed();
                    await SecurePage.items[item].click();
                    await expect($('#back-to-products')).toExist();
                    await SecurePage.hamburgerMenu.click();
                    await SecurePage.allItemsButton.click();
                    await expect($('.app_logo')).toBeDisplayed();

                }
                await SecurePage.logout();
    })
    it('should use the About button properly', async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await SecurePage.hamburgerMenu.click();
        await expect(SecurePage.aboutButton).toBeDisplayed();
        await SecurePage.aboutButton.click();
        await browser.pause(500);
       // await expect($('.MuiStack-root.nav-left.css-122ck6t')).toBeDisplayed()
        await browser.back();
        await expect($('.app_logo')).toBeDisplayed();
        await browser.pause(1000);
        await SecurePage.logout();      
    });
});