import { browser, expect, $ } from '@wdio/globals'
import LoginPage from '../pageobjects/login.js'
import SecurePage from '../pageobjects/secure.page.js'

describe('Hamburger Menu Testing', () => {
    // it('should use the All Items button correctly', async () => {
    //     await LoginPage.open();
    //     await expect(LoginPage.inputUsername).toExist();

    //         await LoginPage.login('standard_user', 'secret_sauce');
    //             for (let item = 0; item < SecurePage.items.length; item++) {
    //                 await expect(SecurePage.hamburgerMenu).toBeDisplayed();
    //                 await SecurePage.items[item].click();
    //                 await expect($('#back-to-products')).toExist();
    //                 await SecurePage.hamburgerMenu.click();
    //                 await SecurePage.allItemsButton.click();
    //                 await expect($('.app_logo')).toBeDisplayed();

    //             }
    //             await SecurePage.logout();
    // })
    // it('should logout of the site properly', async () => {
    //     await LoginPage.open();
    //     await expect(LoginPage.inputUsername).toExist();

    //     await LoginPage.login('standard_user', 'secret_sauce');
    //     await expect(SecurePage.hamburgerMenu).toExist();
    //     await SecurePage.logout();
    //     await expect(LoginPage.inputUsername).toExist();
    // })
    // it('should use the Reset App State button properly', async () => {
    //     await LoginPage.open();
    //     await expect(LoginPage.inputUsername).toExist();

    //     await LoginPage.login('standard_user', 'secret_sauce');
    //     await expect(SecurePage.hamburgerMenu).toExist();
    //     for (let x = 0; x < SecurePage.items.length; x++) {
    //         await expect(SecurePage.hamburgerMenu).toBeDisplayed();
    //         await SecurePage.addItem.click();
    //         await expect(SecurePage.removeItem).toBeDisplayed();
    //     }

    //     await SecurePage.hamburgerMenu.click();
    //     await expect(SecurePage.resetAppState).toBeDisplayed();
    //     await SecurePage.resetAppState.click();

    //     await expect(SecurePage.cartIndicator).not.toBeDisplayed()
    //     await browser.refresh();
    //     await expect(SecurePage.removeItem).not.toBeDisplayed();
    // })
    it('should use the About button properly', async () => {
        await browser.deleteAllCookies();
        await browser.url('https://www.saucedemo.com/');

        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();

        const menuButton = await $('#react-burger-menu-btn');
        await menuButton.click();

        const aboutLink = await $('#about_sidebar_link');
        
        await aboutLink.waitForDisplayed({ timeout: 3000 });
        await aboutLink.click();

        await expect(browser).toHaveUrl(expect.stringContaining('saucelabs.com'));

        await browser.back();

        const inventoryTitle = await $('.title');
        await expect(inventoryTitle).toHaveText('Products');

        const firstItemAddButton = await $('.inventory_item button');
        await firstItemAddButton.click();
        
        const badge = await $('.shopping_cart_badge');
        await badge.waitForDisplayed();
        await expect(badge).toHaveText('1');

        await menuButton.waitForClickable();
        await menuButton.click();
        await aboutLink.waitForDisplayed({ timeout: 3000 });

        const signOut = await $('#logout_sidebar_link');
        await signOut.click();

        await expect($('#user-name')).toBeDisplayed();
    });
});

describe('Your Cart Testing', () =>{
    it('should open the Your Cart page successfully', async () => {
        await LoginPage.open();

        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(SecurePage.shoppingCart).toBeDisplayed();
        await SecurePage.shoppingCart.click();

        await browser.pause(1000);
        await expect(SecurePage.continueShopping).toBeDisplayed();
        await SecurePage.continueShopping.click();
    })
    it('should use the Remove button in the Your Cart page properly', async () => {
        await LoginPage.open();
    })
})