import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.js'
import SecurePage from '../pageobjects/secure.page.js'
import login from '../pageobjects/login.js'

describe('Hamburger Menu Testing', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open()

        for (let i=0; i < LoginPage.allUsernames.length; i++) {
            await LoginPage.login(LoginPage.allUsernames[i], 'secret_sauce')

            if (LoginPage.allUsernames[i] === 'locked_out_user') {
                await expect(LoginPage.errorMessage).toExist()
            }
            else {
                await expect(LoginPage.hamburgerMenu).toBeDisplayed()
                await LoginPage.addItem.click()
                await LoginPage.hamburgerMenu.click()
                await LoginPage.allItems.click()
                await LoginPage.resetAppState.click()
                await LoginPage.logoutConditional()
                await expect(LoginPage.inputUsername).toExist()
                await LoginPage.login(LoginPage.allUsernames[i], 'secret_sauce')
                await LoginPage.hamburgerMenu.click()
                await LoginPage.aboutButton.click()
            }
        }
    })
})