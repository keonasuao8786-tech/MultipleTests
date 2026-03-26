import { browser, expect, $ } from '@wdio/globals'
import LoginPage from '../pageobjects/login.js'
import SecurePage from '../pageobjects/secure.page.js'
import securePage from '../pageobjects/secure.page.js'

describe('Hamburger Menu Testing -', () => {
    it('should use the All Items button correctly', async () => {
        await LoginPage.open()

            await LoginPage.login(SecurePage.allUsernames[0], 'secret_sauce')
                for (let item = 0; item < SecurePage.items.length; item++) {
                    await expect(SecurePage.hamburgerMenu).toBeDisplayed()
                    await SecurePage.items[item].click()
                    await expect($('#back-to-products')).toExist()
                    await SecurePage.hamburgerMenu.click()
                    await SecurePage.allItemsButton.click()
                    await expect($('.app_logo')).toBeDisplayed()

                }
                await SecurePage.logout()
    })
})