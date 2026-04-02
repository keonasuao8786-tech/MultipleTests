import { $ } from '@wdio/globals'
import Page from './page.js';

class SecurePage extends Page {
    get flashAlert () {
        return $('#root');
    }

    get title () {
        return $('.title');
    }

    get appLogo () {
        return $('.app_logo');
    }
    
    get hamburgerMenu () {
        return $('#react-burger-menu-btn');
    }

    get closeHamburgerMenu () {
        return $('#react-burger-cross-btn')
    }

    get aboutButton () {
        return $('#about_sidebar_link');
    }

    get allItemsButton () {
        return $('#inventory_sidebar_link');
    }

    get logoutButton () {
        return $('#logout_sidebar_link');
    }

    get resetAppState () {
        return $('#reset_sidebar_link');
    }

    get addItem () {
        return $('.btn.btn_primary.btn_small.btn_inventory');
    }

    get itemZero () {
        return $('#item_0_img_link');
    }

    get itemOne () {
        return $('#item_1_img_link');
    }

    get itemTwo () {
        return $('#item_2_img_link');
    }
    
    get itemThree () {
        return $('#item_3_img_link');
    }

    get itemFour () {
        return $('#item_4_img_link');
    }

    get itemFive () {
        return $('#item_5_img_link');
    }

    get backToProducts () {
        return $('#back-to-products');
    }

    get shoppingCart () {
        return $('.shopping_cart_link');
    }

    get removeItem () {
        return $('.btn.btn_secondary.btn_small.btn_inventory');
    }

    get removeCart () {
        return $('.btn.btn_secondary.btn_small.cart_button');
    }

    get cartIndicator () {
        return $('.shopping_cart_badge');
    }

    get checkoutButton () {
        return $('.btn.btn_action.btn_medium.checkout_button');
    }

    get returnButton () {
        return $('.btn.btn_secondary.back.btn_medium.cart_cancel_link');
    }

    get continueShopping () {
        return $('.btn.btn_secondary.back.btn_medium');
    }

    get items() {
        return [this.itemZero, this.itemOne, this.itemTwo, this.itemThree, this.itemFour, this.itemFive];
    }

    get inventory() {
        return $('.inventory_list');
    }

    allUsernames = ['standard_user', 'visual_user', 'problem_user', 'error_user', 'performance_glitch_user', 'locked_out_user'];

    async logout () {
        await this.hamburgerMenu.click();
        await this.logoutButton.click();
    }

    async logoutConditional () {
        await this.logoutButton.click();
    }

    async resetAppStateCheck () {
        await this.resetAppState.click()
        await expect(this.cartQuantity).not.toBeDisplayed()
    }

    async hamburgerClick () {
        const hamburger = await $('#react-burger-menu-btn');
        await hamburger.click();
    }

    async hamburgerClose () {
        const closeHamburger = await $('#react-burger-cross-btn');
        await closeHamburger.click();
    }

    async resetApp () {
        const resetAppStateB = await $('#reset_sidebar_link');
        await resetAppStateB.click();
    }

    async clickCart () {
        const selectCart = await $('.shopping_cart_link');
        await selectCart.click();
    }

    async addingItem () {
        const addNewItem = await $('.btn.btn_primary.btn_small.btn_inventory');
        await addNewItem.click();
    }

    async aboutClick () {
        const clickAbout = await $('#about_sidebar_link');
        await clickAbout.click();
    }

    async allItemsClick () {
        const allItems = await $('#inventory_sidebar_link');
        await allItems.click();
    }

    async shopping () {
        const continueShopping = await $('.btn.btn_secondary.back.btn_medium');
        await continueShopping.click();
    }

    async checkout () {
        const checkout = await $('.btn.btn_action.btn_medium.checkout_button');
        await checkout.click();
    }

    async removeFromCart () {
        const removeFromCart = await $('.btn.btn_secondary.btn_small.cart_button');
        await removeFromCart.click();
    }
    
    async itemLoop () {
        const item = [$('#item_0_img_link'), $('#item_1_img_link'), $('#item_2_img_link'), $('#item_3_img_link'), $('#item_4_img_link'), $('#item_5_img_link')]
        for (let y = 0; y < item.length; y++) {
            await expect($('#react-burger-menu-btn')).toBeDisplayed();
            await item[y].click();
            await expect($('#back-to-products')).toExist();
            await $('#react-burger-menu-btn').waitForClickable();
            await $('#react-burger-menu-btn').click();
            await $('#inventory_sidebar_link').click();
            await expect($('.app_logo')).toBeDisplayed();
        }
    }

    async titleCheck () {
        await expect($('.title')).toHaveText('Products');
    }

    async titleCheckCart () {
        await expect($('.title')).toHaveText('Your Cart');
    }

    async titleCheckOut () {
        await expect($('.title')).toHaveText('Checkout: Your Information');
    }

    async urlCheck () {
        await expect(browser).toHaveUrl(expect.stringContaining('saucelabs.com'));
    }
    
}

export default new SecurePage();
