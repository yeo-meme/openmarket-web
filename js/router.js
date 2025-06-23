
class Router {
    constructor() {
      this.routes = {};
      this.currentRoute = '';
      this.pageChangeCallback = null;
      this.isNavigating = false; // ⭐ 네비게이션 상태 추가

      this.currentStateData = {}; 
    }
  
    // 라우트 등록
    addRoute(path, pageImportFunction) {
      this.routes[path] = pageImportFunction;
    }
  
    // 페이지 변경 콜백 등록
    onPageChange(callback) {
      this.pageChangeCallback = callback;
    }
  

    init() {
      console.log('🔧 Router 초기화 시작...');
      
      //뒤로가기/앞으로가기 처리
      window.addEventListener('popstate', (e) => {
        console.log('🔙 Popstate 이벤트 발생 - 실제 브라우저 네비게이션');
        if (!this.isNavigating) { // ⭐ 프로그래밍 방식이 아닐 때만
            this.handleRoute();
        }
    });
  
      // 링크 클릭 이벤트 처리
      document.addEventListener('click', (e) => {
        if (e.target.matches('[data-link]')) {
          e.preventDefault();
          const href = e.target.getAttribute('href');
          console.log('🔗 링크 클릭:', href);
          this.navigateTo(href);
        }
      });
  
      console.log('✅ Router 초기화 완료');
      
      // 초기 라우트 처리 (약간의 지연을 두고 실행)
      setTimeout(() => {
        console.log('🚀 초기 라우트 처리 시작...');
        this.handleRoute();
      }, 100);
    }
  
    // 페이지 이동
    navigateTo(url,data={}) {
      console.log(`🚀 navigateTo 호출: ${window.location.pathname} → ${url}`);
      console.log('🚀 받은 데이터:', data);

      if (url !== window.location.pathname) {
          this.isNavigating = true; // ⭐ 네비게이션 시작
          
          history.pushState(data, null, url);
          this.handleRoute();
      } else {
          console.log('⚠️ 같은 경로이거나 이미 네비게이션 중:', url);
      }
    }
  
    // 현재 경로에 따른 페이지 로드
    async handleRoute() {
      const path = window.location.pathname;
      const stateData = window.history.state || {};
      console.log(`🔄 라우트 처리: ${path}`);
      console.log('📋 등록된 라우트들:', Object.keys(this.routes));
      console.log('🎯 페이지 변경 콜백 등록됨:', !!this.pageChangeCallback);
      
      const route = this.routes[path] || this.routes['/'];
      console.log('🎯 선택된 라우트:', route ? '찾음' : '없음');
      
      this.currentStateData = stateData;


      if (route && this.pageChangeCallback) {
        try {
          // 동적으로 페이지 모듈 로드
          console.log('📦 페이지 모듈 로딩 중...');
          const PageClass = await route(); //return 받는곳
          console.log('✅ 페이지 모듈 로드 완료:', PageClass.name);
          
            this.pageChangeCallback(PageClass); //main.js로 전달
            this.currentRoute = path;
         
        
       
          
        } catch (error) {
          console.error('❌ 라우트 처리 오류:', error);
          // 에러 페이지로 리다이렉트하거나 기본 페이지 로드
          if (path !== '/') {
            this.navigateTo('/');
          }
        }
      } else {
           if (!route) {
        console.warn('⚠️ 해당 라우트를 찾을 수 없음:', path);
      }
      if (!this.pageChangeCallback) {
        console.warn('⚠️ 페이지 변경 콜백이 등록되지 않음');
      }
      }
    }

     // 디버깅을 위한 메서드들
  debug() {
    console.log('🐛 Router 디버그 정보:');
    console.log('- 현재 경로:', window.location.pathname);
    console.log('- 등록된 라우트:', Object.keys(this.routes));
    console.log('- 페이지 변경 콜백 등록됨:', !!this.pageChangeCallback);
    console.log('- 현재 라우트:', this.currentRoute);
  }
  }
  

  const router = new Router();
  
  // 라우트 설정
  router.addRoute('/', async () => {
    console.log('🔄 HomePage 로딩 시작...');
    try {
      const { default: HomePage } = await import('./pages/HomePage.js');
      console.log('✅ HomePage 모듈 로드 완료');
      return HomePage;
    } catch (error) {
      console.error('❌ HomePage 로드 실패:', error);
      throw error;
    }
  });

   // 로그인
router.addRoute('/login', async () => {
  console.log('🔄 LoginPage 로딩 시작...');
  try {

    
    const { default: LoginPage } = await import('./pages/LoginPage.js');
    console.log('✅ LoginPage 모듈 로드 완료');
    return LoginPage;
  } catch (error) {
    console.error('❌ LoginPage 로드 실패:', error);
    throw error;
  }
});

router.addRoute('/myPage', async () => {
  console.log('🔄 myPage 로딩 시작...');
  try {
    const { default: MyPage } = await import('./pages/myPage.js');
    console.log('✅ myPage 모듈 로드 완료');
    return MyPage;
  } catch (error) {
    console.error('❌ LomyPageginPage 로드 실패:', error);
    throw error;
  }
});

// ⭐ 회원가입 - 하나만 등록
router.addRoute('/register', async () => {
  console.log('🔄 RegisterPage 로딩 시작...');
  try {
      const moduleUrl = './pages/RegisterPage.js';
      console.log('📁 모듈 경로:', moduleUrl);
      
      const { default: RegisterPage } = await import(moduleUrl);
      console.log('✅ RegisterPage 모듈 로드 완료');
      
      // 클래스 유효성 검사
      if (typeof RegisterPage === 'function') {
          return RegisterPage;
      } else {
          throw new Error('RegisterPage가 유효한 클래스가 아닙니다');
      }
      
  } catch (error) {
      console.error('❌ RegisterPage 로드 실패:', error);
      console.error('❌ 에러 상세:', error.message);
      
      // ⭐ 임시 대체 페이지 반환 (에러 시에도 동작하도록)
      return class ErrorRegisterPage {
          constructor() {
              this.pageTitle = "회원가입 페이지 - 오류";
          }
          
          getLayoutType() {
              return 'full-page';
          }
          
          render() {
              const page = document.createElement('main');
              page.className = 'error-page';
              page.innerHTML = `
                  <div class="error-container">
                      <h1>회원가입 페이지 로드 오류</h1>
                      <p>파일을 찾을 수 없습니다: RegisterPage.js</p>
                      <button onclick="window.router.navigateTo('/login')">로그인</button>
                      <button onclick="window.router.navigateTo('/')">홈으로</button>
                  </div>
              `;
              return page;
          }
          
          destroy() {}
      };
  }
});


router.addRoute('/detailProduct', async () => {
 const stateData = router.currentStateData;
  console.log('📦 받은 stateData:', stateData);
  try {
    const { default: DetailPage } = await import('./pages/DetailPage.js');
    console.log('✅ detailPage 모듈 로드 완료');
   return DetailPage;
  } catch (error) {
    console.error('❌ detailPage 로드 실패:', error);
    throw error;
  }
});

  
  // 추가 라우트 예시
  // router.addRoute('/about', async () => {
  //   const { default: AboutPage } = await import('./pages/aboutpage.js');
  //   return AboutPage;
  // });


  
  
  // router.addRoute('/contact', async () => {
  //   const { default: ContactPage } = await import('./pages/contactpage.js');
  //   return ContactPage;
  // });
  
  export default router;

  // 🌐 전역 변수로 등록 (이 줄이 누락되었습니다!)
window.router = router;
console.log('🌐 라우터가 전역에 등록되었습니다:', window.router);