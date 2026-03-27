import { $ } from '@wdio/globals'
import Page from './page.js';

class SecurePage extends Page {
    get flashAlert () {
        return $('#root');
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
        return $('.btn.btn_primary.btn_small.btn_inventory')
    }

    get itemZero () {
        return $('#item_0_img_link')
    }

    get itemOne () {
        return $('#item_1_img_link')
    }

    get itemTwo () {
        return $('#item_2_img_link')
    }
    
    get itemThree () {
        return $('#item_3_img_link')
    }

    get itemFour () {
        return $('#item_4_img_link')
    }

    get itemFive () {
        return $('#item_5_img_link')
    }


    get shoppingCart () {
        return $('.shopping_cart_link')
    }

    get cartQuantity () {
        return $('.shopping_cart_badge')
    }

    get removeItem () {
        return $('.btn.btn_secondary.btn_small.btn_inventory')
    }

    get cartIndicator () {
        return $('.shopping_cart_badge')
    }

    get checkoutButton () {
        return $('.btn.btn_action.btn_medium.checkout_button')
    }

    get returnButton () {
        return $('.btn.btn_secondary.back.btn_medium.cart_cancel_link')
    }

    get continueShopping () {
        return $('.btn.btn_secondary.back.btn_medium')
    }

    get items() {
        return [this.itemZero, this.itemOne, this.itemTwo, this.itemThree, this.itemFour, this.itemFive];
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
    
}

export default new SecurePage();
