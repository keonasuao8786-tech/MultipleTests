import { browser, expect, $ } from '@wdio/globals'
import LoginPage from '../pageobjects/login.js'
import SecurePage from '../pageobjects/secure.page.js'

describe('Hamburger Menu Testing', () => {
    beforeEach(async () => {
        await LoginPage.open();
    })
    afterEach(async () => {
    await browser.reloadSession();
    });
    it('should open and close the Hamburger menu', async () => {

        await LoginPage.login(SecurePage.allUsernames[0], 'secret_sauce');
        await expect(SecurePage.hamburgerMenu).toBeDisplayed();

        await SecurePage.hamburgerMenu.click()
        await expect(SecurePage.allItemsButton).toBeDisplayed();
        await SecurePage.closeHamburgerMenu.waitForClickable();
        await SecurePage.closeHamburgerMenu.click();
        await expect(SecurePage.allItemsButton).not.toBeDisplayed();
        await SecurePage.title.waitForDisplayed();
    })
    it('should use the All Items button correctly', async () => {
        await expect(LoginPage.inputUsername).toExist();

            await LoginPage.login(SecurePage.allUsernames[0], 'secret_sauce');
                for (let item = 0; item < SecurePage.items.length; item++) {
                    await expect(SecurePage.hamburgerMenu).toBeDisplayed();
                    await SecurePage.items[item].click();
                    await expect(SecurePage.backToProducts).toExist();
                    await SecurePage.hamburgerMenu.waitForClickable();
                    await SecurePage.hamburgerMenu.click();
                    await SecurePage.allItemsButton.click();
                    await expect(SecurePage.appLogo).toBeDisplayed();

                }
                await SecurePage.logout();
    })
    it('should logout of the site properly', async () => {
        await expect(LoginPage.inputUsername).toExist();

        await LoginPage.login(SecurePage.allUsernames[0], 'secret_sauce');
        await expect(SecurePage.hamburgerMenu).toExist();
        await SecurePage.hamburgerMenu.waitForDisplayed();
        await SecurePage.logout();
        await expect(LoginPage.inputUsername).toExist();
    })
    it('should use the Reset App State button properly', async () => {
        await expect(LoginPage.inputUsername).toExist();

        await LoginPage.login(SecurePage.allUsernames[0], 'secret_sauce');
        await expect(SecurePage.hamburgerMenu).toExist();
        for (let x = 0; x < SecurePage.items.length; x++) {
            await expect(SecurePage.hamburgerMenu).toBeDisplayed();
            await SecurePage.addItem.waitForClickable();
            await SecurePage.addItem.click();
            await expect(SecurePage.removeItem).toBeDisplayed();
        }

        await SecurePage.hamburgerMenu.click();
        await expect(SecurePage.resetAppState).toBeDisplayed();
        await SecurePage.resetAppState.waitForClickable();
        await SecurePage.resetAppState.click();

        await expect(SecurePage.cartIndicator).not.toBeDisplayed()
        await browser.refresh();
        await expect(SecurePage.removeItem).not.toBeDisplayed();
    })
    it('should use the About button properly', async () => {
    await LoginPage.login(SecurePage.allUsernames[0], 'secret_sauce');
    await expect(SecurePage.title).toHaveText('Products');

    await SecurePage.hamburgerMenu.click();
    await SecurePage.aboutButton.waitForDisplayed();
    await SecurePage.aboutButton.click();

    await browser.waitUntil(
        async () => {
            const url = await browser.getUrl();
            return url.includes('saucelabs.com');
        },
        { timeout: 10000}
    );

    await expect(browser).toHaveUrl(expect.stringContaining('saucelabs.com'));
    });
});

describe('Your Cart Testing', () =>{
    beforeEach(async () => {
        await LoginPage.open();
    })
    afterEach(async () => {
    await browser.url('https://www.saucedemo.com/');
    await browser.reloadSession();
    });
    it('should open the Your Cart page successfully', async () => {

        await LoginPage.login(SecurePage.allUsernames[0], 'secret_sauce');
        await expect(SecurePage.shoppingCart).toBeDisplayed();
        await SecurePage.shoppingCart.click();

        await expect($('.title')).toHaveText('Your Cart');
    })
    it('should use the Remove button in the Your Cart page properly', async () => {

        await LoginPage.login(SecurePage.allUsernames[0], 'secret_sauce');
        await expect(SecurePage.inventory).toBeDisplayed();
        await SecurePage.addItem.click();
        await expect(SecurePage.removeItem).toBeDisplayed();

        await expect(SecurePage.cartIndicator).toBeDisplayed();
        await SecurePage.shoppingCart.click();

        await expect(SecurePage.removeCart).toExist();
        await SecurePage.removeCart.click();
        await expect(SecurePage.cartIndicator).not.toBeDisplayed();

    })
    it('should confirm the Continue Shopping button takes you to the Products page from Your Cart', async () => {

        await LoginPage.login(SecurePage.allUsernames[0], 'secret_sauce');
        await expect(SecurePage.title).toHaveText('Products');

        await SecurePage.shoppingCart.waitForClickable();
        await SecurePage.shoppingCart.click();
        await expect(SecurePage.continueShopping).toExist();

        await SecurePage.continueShopping.click()
        await expect(SecurePage.inventory).toBeDisplayed();

    })
    it('should take you to the Checkout page', async () => {

        await LoginPage.login(SecurePage.allUsernames[0], 'secret_sauce');
        await expect(SecurePage.inventory).toBeDisplayed();

        await SecurePage.shoppingCart.click()
        await expect(SecurePage.checkoutButton).toBeDisplayed();

        await SecurePage.checkoutButton.click();
        await expect(SecurePage.title).toHaveText('Checkout: Your Information');
    })
})