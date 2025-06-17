import {router} from './router.js';
import Header from './componenets/Header.js';

class App {
    constructor() {
        this.router = router;

        // this.state = {
        //     user: null,
        //     cart: [],
        //     isLoggedIn: false
        // };

         // 전역에서 접근 가능하도록
        //  window.router = this.router;
        //  window.appState = this.state;

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
        const app = document.getElementById('app');
        
       // ✅ 기존 내용 초기화
       app.innerHTML = '';
        
       // ⭐ Header 렌더링
       const header = new Header();
       app.appendChild(header.render());
       
       // 메인 컨텐츠 영역 생성
       const main = document.createElement('main');
       main.id = 'main-content';
       main.className = 'main-content';
       app.appendChild(main);
       
       this.setupRoutes();
       this.router.init();
    } 

    setupRoutes() {

             // 홈 페이지
             this.router.addRoute('/', () => {
                const mainContent = document.getElementById('main-content');
                mainContent.innerHTML = `
                    <div class="container">
                        <h1>KODU 홈페이지</h1>
                        <p>환영합니다!</p>
                    </div>
                `;
            });


        // 홈 페이지
        // this.router.addRoute('/', () => {
        //     const homePage = new HomePage(this.state);
        //     homePage.render();
        // });
        
        // ⭐ 로그인 페이지 라우트 추가
        this.router.addRoute('/login', () => {
            const loginPage = new LoginPage();
            loginPage.render();
        });

        // ... 다른 라우트들 생략 ...
    }
}
// ✅ 앱 시작
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM 로드 완료!'); // 디버깅용
    const app = new App();
});