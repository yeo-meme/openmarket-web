import { templates } from './templates.js';

export const router = {
    init() {
        this.renderPage('home');
    },
    
    navigateTo(page) {
        this.renderPage(page);
        // URL 업데이트 (선택사항)
        history.pushState({}, '', `/${page}`);
    },
    
    async renderPage(page) {
        const app = document.getElementById('app');
        
        switch(page) {
            case 'login':
                // HTML 파일에서 템플릿 로드
                app.innerHTML = await templates.loadTemplate('login');
                break;
            case 'product':
                app.innerHTML = await templates.loadTemplate('product');
                break;
        }
        // switch(page) {
        //     case 'login':
        //         app.innerHTML = this.getLoginPage();
        //         break;
        //     case 'home':
        //         app.innerHTML = this.getHomePage();
        //         break;
        //     case 'product':
        //         app.innerHTML = this.getProductPage();
        //         break;
        // }
    },
    
    getLoginPage() {
        return `
            <header class="simple-header">
                <div class="logo">MODU</div>
            </header>
            <div class="login-container">
                <h1>로그인</h1>
                <form>...</form>
            </div>
        `;
    },
    
    getHomePage() {
        return `
            <header class="gnb-header">
                <div class="top-bar">
                    <div class="logo">MODU</div>
                    <div class="search">검색바</div>
                    <div class="icons">🛒👤</div>
                </div>
                <nav class="gnb">
                    <a onclick="router.navigateTo('home')">홈</a>
                    <a onclick="router.navigateTo('products')">상품</a>
                    <a onclick="router.navigateTo('about')">소개</a>
                </nav>
            </header>
            <div class="home-content">
                <h1>홈페이지</h1>
                <div class="products">...</div>
            </div>
        `;
    }
   
};

// 전역에서 접근 가능하도록
window.router = router;