import router from './router.js';
import Header from './components/Header.js';
import HeroSlider from './components/HeroSlider.js';
import HomePage from './pages/HomePage.js';

class App {
    constructor() {
        // this.router = router;
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
        this.init();
    }

    // init() {
    //     const app = document.getElementById('app');

    //     // 헤더에 라우터 전달
    //     const header = new Header(this.router);
    //     app.appendChild(header.render());


    //     this.setupRoutes();
    //     this.router.init();
    // }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupRouter();
            this.setupApp();
            // this.renderComponents();
        });
        // const app = document.getElementById('app');

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

    // renderComponents() {
    //     // 메인 컨테이너 생성
    //     const app = document.getElementById('app');
    //     if (!app) {
    //         console.error('App container not found');
    //         return;
    //     }

    //     // 각 컴포넌트 렌더링
    //     this.renderHeader();
    //     this.renderHeroSlider();
    //     this.renderProductGrid();
    // }

    // renderHeader() {
    //     const headerContainer = document.createElement('div');
    //     headerContainer.id = 'header-container';
    //     document.getElementById('app').appendChild(headerContainer);

    //     const gnbHeader = Header;
    //     gnbHeader.render(headerContainer);
    // }

    // renderHeroSlider() {
    //     const sliderContainer = document.createElement('div');
    //     sliderContainer.id = 'slider-container';
    //     document.getElementById('app').appendChild(sliderContainer);

    //     const heroSlider = HeroSlider;
    //     heroSlider.render(sliderContainer);
    // }
    async renderPage(PageClass) {
        const app = document.getElementById('app');

        console.log('🎨 페이지 렌더링 시작:', PageClass.name);

        // 이전 페이지 정리
        if (this.currentPage && this.currentPage.destroy) {
            console.log('🧹 이전 페이지 정리 중...');
            this.currentPage.destroy();
        }

        // 기존 페이지 내용 제거
        const existingPage = app.querySelector('main');
        if (existingPage) {
            existingPage.remove();
        }

        try {
            // 새 페이지 생성 및 렌더링
            console.log('🏗️ 새 페이지 인스턴스 생성 중...');
            this.currentPage = new PageClass();
            const pageElement = this.currentPage.render();

            // 페이지 타이틀 설정
            if (this.currentPage.pageTitle) {
                document.title = this.currentPage.pageTitle;
                console.log('📝 페이지 타이틀 설정:', this.currentPage.pageTitle);
            }

            app.appendChild(pageElement);

            console.log(`✅ 페이지 렌더링 완료: ${PageClass.name}`);

        } catch (error) {
            console.error('페이지 렌더링 오류:', error);
            this.showError('페이지를 불러오는 중 오류가 발생했습니다.');
        }
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