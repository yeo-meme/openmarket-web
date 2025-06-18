import { registerPageTemplate } from '../../templates/register.html.js'
import { registerPageStyles } from '../../styles/register.css.js';
import { styleManager } from '../utils/CSSManager.js';


class RegisterPage {

    constructor() {
        this.pageTitle = "HODU - 로그인";
        this.currentTab = 'buyer'; // 'buyer' 또는 'seller'
        this.styleId = 'register-page-styles';
    }
    render() {
        const page = document.createElement('main');
            page.className = 'register-page';
            page.innerHTML = registerPageTemplate();
            this.loadStyles();
            // this.bindEvents();
            // this.addPageAnimation(page);

        // this.attachEvents();
        return page;
    }

        loadStyles() {
            styleManager.loadStyle(this.styleId, registerPageStyles);
        }
    
        unloadStyles() {
            styleManager.unloadStyle(this.styleId);
        }
    attachEvents() {
        // 로그인 폼 제출 이벤트
        const form = document.querySelector('.login-form form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // ... 로그인 로직 처리 ...
        });
    }
}

export default RegisterPage; 