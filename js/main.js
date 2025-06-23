import router from './router.js';
import Header from './components/Header.js';
import HeroSlider from './components/HeroSlider.js';
import HomePage from './pages/HomePage.js';

class App {
    constructor() {
        // this.header = null;
        // this.currentPage = null;
        // this.state = {
        //     user: null,
        //     cart: [],
        //     isLoggedIn: false
        // };

        // 전역에서 접근 가능하도록
        //  window.router = this.router;
        //  window.appState = this.state;
        this.currentPage = null;
        this.hasGlobalHeader = false;
        this.init();
    }


    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupRouter();
            this.setupApp();
        });

        // // ✅ 기존 내용 초기화
        // app.innerHTML = '';

        // // ⭐ Header 렌더링
        // const header = new Header(this.router);
        // app.appendChild(header.render());

        // // 메인 컨텐츠 영역 생성
        // const main = document.createElement('main');
        // main.id = 'main-content';
        // main.className = 'main-content';
        // app.appendChild(main);

        // this.setupRoutes();
        // this.router.init();
        console.log('✅  초기화 완료');
    }

    setupApp() {
        // 앱 컨테이너 확인
        const app = document.getElementById('app');
        if (!app) {
            console.error('App container not found');
            return;
        }

        // 로딩 메시지 제거
        const loading = app.querySelector('.loading');
        if (loading) {
            loading.remove();
        }

        console.log('✅ App 초기화 완료');
    }
    
    setupRouter() {
        router.init();
        // 홈 페이지
        //  this.router.addRoute('/', () => {
        //     const mainContent = document.getElementById('main-content');
        //     mainContent.innerHTML = `
        //         <div class="container">
        //             <h1>KODU 홈페이지</h1>
        //             <p>환영합니다!</p>
        //         </div>
        //     `;
        // });

        // this.router.addRoute('/', () => {
        //     console.log('🏠 홈페이지 로드 중...');
        //     this.loadPage(HomePage);
        // });


        // 홈 페이지
        // this.router.addRoute('/', () => {
        //     const homePage = new HomePage(this.state);
        //     homePage.render();
        // });

        // ⭐ 로그인 페이지 라우트 추가
        // this.router.addRoute('/login', () => {
        //     const loginPage = new LoginPage();
        //     loginPage.render();
        // });
        // 페이지 변경 이벤트 리스너
        router.onPageChange((page) => {
            this.renderPage(page);
        });
    }

    async renderPage(PageClass) {
        console.log('🎨 페이지 렌더링 시작:', PageClass.name);
        const app = document.getElementById('app');
        await this.cleanupCurrentPage();
        
        try {
            // ✅ 페이지별로 다른 생성자 인수 처리
            if (window.location.pathname === '/detailProduct') {
                // 🎯 상세페이지는 상품 데이터 필요
                const stateData = router.currentStateData || {};
                this.currentPage = new PageClass(stateData.productId, stateData.product);
            } else {
                // 🏠 다른 페이지들은 기본 생성
                this.currentPage = new PageClass(router);
            }
            
            const layoutType = this.currentPage.getLayoutType ? 
                              this.currentPage.getLayoutType() : 'full-page';
            
            await this.renderByLayoutType(app, layoutType);
            
            console.log('✅ 페이지 렌더링 완료:', PageClass.name);
            
        } catch (error) {
            console.error('페이지 렌더링 오류:', error);
            this.showError('페이지를 불러오는 중 오류가 발생했습니다.');
        }
    }

    async cleanupCurrentPage() {
        if (this.currentPage && this.currentPage.destroy) {
            console.log('🧹 이전 페이지 정리 중...');
            await this.currentPage.destroy();
        }
    }

    async renderByLayoutType(app, layoutType) {
        switch (layoutType) {
            case 'with-gnb':
                await this.renderWithGNB(app);
                break;
                
            case 'full-page':
            default:
                await this.renderFullPage(app);
                break;
        }
    }

    async renderFullPage(app) {
        app.innerHTML = '';
        
        // 페이지가 전체 구조를 담당
        const pageElement = await this.currentPage.render();
        app.appendChild(pageElement);
        
        this.hasGlobalHeader = false;
        console.log('✅ 전체 페이지 교체 완료');
    }

    showError(message) {
        const app = document.getElementById('app');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
          <h2>오류</h2>
          <p>${message}</p>
          <button onclick="location.reload()">새로고침</button>
        `;
        app.appendChild(errorDiv);
    }
}

// 애플리케이션 시작
new App();