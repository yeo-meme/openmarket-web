import router from '../router.js';

export default class Header {
    constructor(router) {
        this.router = router;  // 라우터 인스턴스 받기
        this.loadCSS();
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

    render() {
        const header = document.createElement('header');
        header.innerHTML = `
       <div class="header-content">
            <a href="#" class="logo">KODU</a>
            <div class="search-container">
                <input type="text" class="search-input" placeholder="상품을 검색해보세요">
                <button class="search-btn">🔍</button>
            </div>
            <div class="header-actions">
                <button class="header-btn cart-btn">🛒</button>
                <button class="header-btn login-btn">👤</button>
            </div>
        </div>
        `;

        this.attachEvents(header);
        return header;
    }

    attachEvents(header) {
        // 👤 로그인 버튼 클릭 이벤트
        const loginBtn = header.querySelector('.login-btn');
        loginBtn.addEventListener('click', () => {
            // this.router.navigate('/login');  // 로그인 페이지로 이동
            console.log('라우터 존재:', !!window.router);
            console.log('라우터 객체:', window.router);

            // 2. 라우트 목록 확인
            console.log('등록된 라우트:', Object.keys(window.router?.routes || {}));
            window.router.navigateTo('/login');
            // if (window.router) {
            //     window.router.navigateTo('/login');
            //   } else {
            //     console.error('라우터를 찾을 수 없습니다.');
            //     window.location.href = '/login';
            //   }
        });
    }

    handleSearch(query) {
        if (query.trim()) {
            // 검색어가 있으면 상품 페이지로 이동
            this.router.navigate(`/products?search=${encodeURIComponent(query)}`);
        } else {
            alert('검색어를 입력해주세요');
        }
    }
}
