import { $ } from '@wdio/globals'
import Page from './page.js';

class SecurePage extends Page {
    get flashAlert () {
        return $('#root');
    }
}

export default new SecurePage();
