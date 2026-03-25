import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername () {
        return $('#user-name');
    }

    get inputPassword () {
        return $('#password');
    }

    get btnSubmit () {
        return $('#login-button');
    }

    get errorMessage () {
        return $('button.error-button')
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

    get allItems () {
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

    get shoppingCart () {
        return $('.shopping_cart_link')
    }

    get removeItem () {
        return $('.btn.btn_secondary.btn_small.cart_button')
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
    allUsernames = ['standard_user', 'problem_user', 'performance_glitch_user', 'error_user', 'visual_user', 'locked_out_user'];

    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    async logout () {
        await this.hamburgerMenu.click();
        await this.logoutButton.click();
    }

    async hamburger () {
        await this.hamburgerMenu.click();
    }

    open () {
        return super.open('login');
    }
}

export default new LoginPage();
