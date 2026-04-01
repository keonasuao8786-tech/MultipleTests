import { browser, expect, $ } from '@wdio/globals'
import LoginPage from '../pageobjects/login.js'
import SecurePage from '../pageobjects/secure.page.js'

describe('Hamburger Menu Testing', () => {
    it('should open and close the Hamburger menu', async () => {
        await LoginPage.open();

        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(SecurePage.hamburgerMenu).toBeDisplayed();

        await browser.pause(100);
        await SecurePage.hamburgerMenu.click()
        await expect(SecurePage.allItemsButton).toBeDisplayed();
        await browser.pause(500);
        await SecurePage.closeHamburgerMenu.click();
        await expect(SecurePage.allItemsButton).not.toBeDisplayed();
        await browser.pause(500);
    })
    it('should use the All Items button correctly', async () => {
        await LoginPage.open();
        await expect(LoginPage.inputUsername).toExist();

            await LoginPage.login('standard_user', 'secret_sauce');
                for (let item = 0; item < SecurePage.items.length; item++) {
                    await expect(SecurePage.hamburgerMenu).toBeDisplayed();
                    await SecurePage.items[item].click();
                    await expect($('#back-to-products')).toExist();
                    await browser.pause(100);
                    await SecurePage.hamburgerMenu.click();
                    await SecurePage.allItemsButton.click();
                    await expect($('.app_logo')).toBeDisplayed();

                }
                await SecurePage.logout();
    })
    it('should logout of the site properly', async () => {
        await LoginPage.open();
        await expect(LoginPage.inputUsername).toExist();

        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(SecurePage.hamburgerMenu).toExist();
        await browser.pause(100);
        await SecurePage.logout();
        await expect(LoginPage.inputUsername).toExist();
    })
    it('should use the Reset App State button properly', async () => {
        await LoginPage.open();
        await expect(LoginPage.inputUsername).toExist();

        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(SecurePage.hamburgerMenu).toExist();
        for (let x = 0; x < SecurePage.items.length; x++) {
            await expect(SecurePage.hamburgerMenu).toBeDisplayed();
            await SecurePage.addItem.click();
            await expect(SecurePage.removeItem).toBeDisplayed();
            await browser.pause(500);
        }

        await SecurePage.hamburgerMenu.click();
        await expect(SecurePage.resetAppState).toBeDisplayed();
        await browser.pause(1000);
        await SecurePage.resetAppState.click();

        await expect(SecurePage.cartIndicator).not.toBeDisplayed()
        await browser.pause(500);
        await browser.refresh();
        await expect(SecurePage.removeItem).not.toBeDisplayed();
        await browser.pause(500);
    })
    it('should use the About button properly', async () => {
    await LoginPage.open();

    await LoginPage.login('standard_user', 'secret_sauce');
    await expect(SecurePage.title).toHaveText('Products');

    await SecurePage.hamburgerMenu.click();
    await browser.pause(1000);

    await SecurePage.aboutButton.waitForClickable({timeout: 3000});
    console.log('Handles before click:', await browser.getWindowHandles());
    await browser.pause(1000);
    await SecurePage.aboutButton.click();
    console.log('Handles after click:', await browser.getWindowHandles());

    // Wait a bit for the new window
    await browser.pause(2000);
    const handles = await browser.getWindowHandles();
    if (handles.length > 1) {
        await browser.switchToWindow(handles[1]);
    } else {
        // If no new window, perhaps it opened in same window
        console.log('No new window, checking current URL');
    }

    // await browser.pause(3000)
    // await expect(browser).toHaveUrl(expect.stringContaining('saucelabs.com'));

    // await browser.closeWindow();
    // await browser.switchToWindow(handles[0]);
    });
});

describe('Your Cart Testing', () =>{
    it('should open the Your Cart page successfully', async () => {
        await LoginPage.open();

        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(SecurePage.shoppingCart).toBeDisplayed();
        await SecurePage.shoppingCart.click();

        await expect($('.title')).toHaveText('Your Cart');
    })
    it('should use the Remove button in the Your Cart page properly', async () => {
        await LoginPage.open();

        await LoginPage.login('standard_user', 'secret_sauce');
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
        await LoginPage.open();

        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(SecurePage.title).toHaveText('Products');

        await browser.pause(1000)
        await SecurePage.shoppingCart.click();
        await expect(SecurePage.continueShopping).toExist();

        await SecurePage.continueShopping.click()
        await expect(SecurePage.inventory).toBeDisplayed();

    })
    it('should take you to the Checkout page', async () => {
        await LoginPage.open();

        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(SecurePage.inventory).toBeDisplayed();

        await SecurePage.shoppingCart.click()
        await expect(SecurePage.checkoutButton).toBeDisplayed();

        await SecurePage.checkoutButton.click();
        await expect(SecurePage.title).toHaveText('Checkout: Your Information');
    })
})