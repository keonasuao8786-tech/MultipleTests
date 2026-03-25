import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.js'
import SecurePage from '../pageobjects/secure.page.js'

describe('Hamburger Menu Testing', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open()

        for (let i = 0; i < LoginPage.allUsernames.length; i++) {
            await LoginPage.login(LoginPage.allUsernames[i], 'secret_sauce')

            if (LoginPage.allUsernames[i] === 'locked_out_user') {
                await expect(LoginPage.errorMessage).toExist()
            }
            else {
                await expect(LoginPage.hamburgerMenu).toBeDisplayed()
                 for (let x = 0; x < 6; x++) {
                    await LoginPage.addItem.click()
                    await expect(LoginPage.cartQuantity).toBeDisplayed()
                    await browser.pause(500)
                }
                await LoginPage.hamburgerMenu.click()
                await LoginPage.allItemsButton.click()
                await LoginPage.resetAppStateCheck()
                await browser.pause(1000)
                await LoginPage.logoutConditional()
                await expect(LoginPage.inputUsername).toExist()
                // await LoginPage.login(LoginPage.allUsernames[i], 'secret_sauce')
                // await LoginPage.hamburgerMenu.click()
                // await LoginPage.aboutButton.click()
            }
        }
    })
})