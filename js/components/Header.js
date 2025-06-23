import router from '../router.js';
import { tokenManager } from '../utils/TokenManager.js';


export default class Header  {
    constructor(router) {
        this.router = router;  // 라우터 인스턴스 받기
        this.loadCSS();

        if (window.location.hostname === 'localhost') {
            setTimeout(() => {
                this.startTokenMonitoring();
            }, 1000); 
        }
    }
    startTokenMonitoring() {
        console.log('토큰 모니터링 시작');
        
        setInterval(() => {
            // 토큰 유효성 검사 로직
            this.checkTokenValidity();
        }, 1000); 
    }


      
    checkTokenValidity() {
       
        const token = tokenManager.getTokenStatus();
        if (!token) {
            console.log('토큰이 없습니다');
            return;
        }
        
        // 토큰 만료 시간 확인 등
        console.log(`${token.accessTokenExpiresAt} ,,,, 토큰 상태 확인 중...`);
    }
    

    loadCSS() {
        if (!document.querySelector('#header-css')) {
            const link = document.createElement('link');
            link.id = 'header-css';
            link.rel = 'stylesheet';

            const basePath = this.getBasePath();
            link.href = `${basePath}styles/components/header.css`;


            // 로드 완료/에러 처리
            link.onload = () => {
                console.log('✅ Header CSS 로드 완료');
            };

            link.onerror = () => {
                console.error('❌ Header CSS 로드 실패');
                // 백업 CSS 적용
                this.applyFallbackStyles();
            };

            document.head.appendChild(link);
        }
    }

    getBasePath() {
        // 현재 페이지 위치에 따라 기본 경로 반환
        const path = window.location.pathname;
        if (path === '/' || path === '/index.html') {
            return './';
        }
        return '../';
    }

    /**
     * 로그인 정보가 있으면 - 마이페이지 없으면 로그인 처
     * @returns
     */
    render() {
        const accessToken = localStorage.getItem('accessToken');
        const userInfo = localStorage.getItem('userInfo');

        let username = '';

        if (userInfo && accessToken) { 
            try {
                const userData = JSON.parse(userInfo);
                username = userData.username || userData.id || '';
            } catch (e) {
                console.error('사용자 정보 파싱 오류:', e);
            }
        }

        const loginButtonText = accessToken ? `${username} 마이페이지` : '👤';

        const header = document.createElement('header');
        header.innerHTML = `
      <div class="header-content">
          <a href="#" class="logo" data-action="home">KODU</a>
          <div class="search-container">
              <input type="text" class="search-input" placeholder="상품을 검색해보세요">
              <button class="search-btn">🔍</button>
          </div>
          <div class="header-actions">
              <button class="header-btn cart-btn">🛒</button>
              ${accessToken ?
                `<button class="header-btn logout-btn">${loginButtonText}</button>` :
                `<button class="header-btn login-btn">👤</button>`
            }
          </div>
      </div>
  `;

        tokenManager.getValidAccessToken();

        this.attachEvents33(header);
        return header;
    }


    attachEvents33(header) {

        const logo = header.querySelector('.logo');
        if (logo) {
            logo.addEventListener('click', (e) => {
                e.preventDefault(); // 기본 링크 동작 방지
                console.log('🏠 로고 클릭 - 홈으로 이동');
                
                // 라우터 존재 확인
                if (window.router && window.router.navigateTo) {
                    window.router.navigateTo('/');
                } else if (this.router && this.router.navigateTo) {
                    this.router.navigateTo('/');
                } else {
                    console.error('❌ 라우터를 찾을 수 없습니다');
                    // 백업: 브라우저 기본 네비게이션
                    window.location.href = '/';
                }
            });
        }
        
        // 액세스 토큰 확인
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            // 로그인된 상태 - 로그아웃 버튼 이벤트
            const logoutBtn = header.querySelector('.logout-btn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', () => {
                    console.log('🚪 로그아웃 버튼 클릭됨');
                    // this.handleLogout();
                    if (confirm('로그아웃 하시겠습니까?')) {
                        // 토큰매니저의 logout 메서드 사용
                        tokenManager.logout();

                        alert('로그아웃되었습니다.');
                        // 페이지 새로고침으로 헤더 업데이트
                        window.location.reload();
                    }
                });
            }
        } else {
            // 로그인되지 않은 상태 - 로그인 버튼 이벤트
            const loginBtn = header.querySelector('.login-btn');
            if (loginBtn) {
                loginBtn.addEventListener('click', () => {
                    console.log('🔐 로그인 버튼 클릭됨');
                    window.router.navigateTo('/login');
                });
            }
        }
    }

    attachEvents(header) {
        const loginBtn = header.querySelector('.login-btn');
        loginBtn.addEventListener('click', () => {
            
            console.log('라우터 존재:', !!window.router);
            console.log('라우터 객체:', window.router);

            // 2. 라우트 목록 확인
            console.log('등록된 라우트:', Object.keys(window.router?.routes || {}));
            const accessToken = localStorage.getItem('accessToken');

            console.log(`로그아웃전에 값확인: ${accessToken}`);

            if (accessToken) {
                this.handleLogout();
            } else {
                window.router.navigateTo('/login');
            }

        });
    }

    // handleSearch(query) {
    //     if (query.trim()) {
    //         // 검색어가 있으면 상품 페이지로 이동
    //         this.router.navigate(`/products?search=${encodeURIComponent(query)}`);
    //     } else {
    //         alert('검색어를 입력해주세요');
    //     }
    // }
}
