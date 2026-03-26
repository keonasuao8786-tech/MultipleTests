import { browser, expect, $ } from '@wdio/globals'
import LoginPage from '../pageobjects/login.js'
import SecurePage from '../pageobjects/secure.page.js'
import login from '../pageobjects/login.js'

describe('Hamburger Menu Testing -', () => {
    it('should use the All Items button correctly', async () => {
        await LoginPage.open()

         for (let i = 0; i < SecurePage.allUsernames.length; i++) {
            await LoginPage.login(SecurePage.allUsernames[i], 'secret_sauce')
            

            if (SecurePage.allUsernames[i] === 'locked_out_user') {
                await expect(LoginPage.errorMessage).toExist()
            }
            else {
                for (let item = 0; item < LoginPage.items.length; item++) {
                    await expect(SecurePage.hamburgerMenu).toBeDisplayed()
                    //await browser.pause(200)
                    await SecurePage.items[item].click()
                    await expect($('#back-to-products')).toExist()
                    //await browser.pause(200)
                    await SecurePage.hamburgerMenu.click()
                    await SecurePage.allItemsButton.click()
                    await expect($('.app_logo')).toBeDisplayed()
                    //await browser.pause(200)

                }
                await SecurePage.logout()
                // await SecurePage.itemZero.click()
                // await browser.pause(1000)
                // await expect($('#back-to-products')).toExist()
                // await SecurePage.hamburgerMenu.click()
                // await browser.pause(200)
                // await expect(SecurePage.allItemsButton).toExist()
                // await SecurePage.allItemsButton.click()
                // await browser.pause(1000)
                // await expect($('.app_logo')).toBeDisplayed()
                // await SecurePage.itemOne.click()
                // await browser.pause(500)
                // await SecurePage.logout()
                // await expect(LoginPage.inputUsername).toExist()
            }
        }
    })
})


        // for (let i = 0; i < LoginPage.allUsernames.length; i++) {
        //     await LoginPage.login(LoginPage.allUsernames[i], 'secret_sauce')

        //     if (LoginPage.allUsernames[i] === 'locked_out_user') {
        //         await expect(LoginPage.errorMessage).toExist()
        //     }
        //     else {
        //         await expect(LoginPage.hamburgerMenu).toBeDisplayed()
        //          for (let x = 0; x < 6; x++) {
        //             await LoginPage.addItem.click()
        //             await expect(LoginPage.cartQuantity).toBeDisplayed()
        //             await browser.pause(500)
        //         }
        //         await LoginPage.hamburgerMenu.click()
        //         await expect(LoginPage.aboutButton).toExist()
        //         await expect(LoginPage.allItemsButton).toExist()
        //         await expect(LoginPage.logoutButton).toExist()
        //         await expect(LoginPage.resetAppState).toExist()
        //         await LoginPage.allItemsButton.click()
        //         await LoginPage.resetAppStateCheck()
        //         await browser.pause(1000)
        //         await LoginPage.logoutConditional()
        //         await expect(LoginPage.inputUsername).toExist()
        //         // await LoginPage.login(LoginPage.allUsernames[i], 'secret_sauce')
        //         // await LoginPage.hamburgerMenu.click()
        //         // await LoginPage.aboutButton.click()
        //     }
        // }