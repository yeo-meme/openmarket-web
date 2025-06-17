
class Router {
    constructor() {
      this.routes = {};
      this.currentRoute = '';
      this.pageChangeCallback = null;
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
      window.addEventListener('popstate', () => {
        console.log('🔙 Popstate 이벤트 발생');
        this.handleRoute();
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
    navigateTo(url) {
      if (url !== window.location.pathname) {
        history.pushState(null, null, url);
        this.handleRoute();
      }
    }
  
    // 현재 경로에 따른 페이지 로드
    async handleRoute() {
      const path = window.location.pathname;
      console.log(`🔄 라우트 처리: ${path}`);
      
      const route = this.routes[path] || this.routes['/'];
      
      if (route && this.pageChangeCallback) {
        try {
          // 동적으로 페이지 모듈 로드
          console.log('📦 페이지 모듈 로딩 중...');
          const PageClass = await route();
          console.log('✅ 페이지 모듈 로드 완료:', PageClass.name);
          
          this.pageChangeCallback(PageClass);
          this.currentRoute = path;
          
        } catch (error) {
          console.error('❌ 라우트 처리 오류:', error);
          // 에러 페이지로 리다이렉트하거나 기본 페이지 로드
          if (path !== '/') {
            this.navigateTo('/');
          }
        }
      } else {
        console.warn('⚠️ 해당 라우트를 찾을 수 없음:', path);
      }
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
  
  // 추가 라우트 예시
  router.addRoute('/about', async () => {
    const { default: AboutPage } = await import('./pages/aboutpage.js');
    return AboutPage;
  });
  
  router.addRoute('/contact', async () => {
    const { default: ContactPage } = await import('./pages/contactpage.js');
    return ContactPage;
  });
  
  export default router;