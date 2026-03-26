import { $ } from '@wdio/globals'
import Page from './page.js';

class LoginPage extends Page {
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

    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    open () {
        return super.open('login');
    }
}

export default new LoginPage();
