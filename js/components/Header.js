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

        // 액세스 토큰 확인
        const accessToken = localStorage.getItem('accessToken');
        const userInfo = localStorage.getItem('userInfo');
        let username = '';

        if (userInfo) {
            try {

                console.log('📋 삭제 전 로컬스토리지 상태:');
                console.log('  - accessToken:', localStorage.getItem('accessToken'));
                console.log('  - refreshToken:', localStorage.getItem('refreshToken'));
                console.log('  - userInfo:', localStorage.getItem('userInfo'));


                const userData = JSON.parse(userInfo);
                console.log('📋 파싱된 사용자 정보:', userData);

                username = userData.username || userData.id || '';
                console.log('👤 추출된 사용자명:', username);

            } catch (e) {
                console.error('사용자 정보 파싱 오류:', e);
            }
        }
        // 로그인 상태에 따른 버튼 텍스트 결정
        const loginButtonText = accessToken ? `${username} 마이페이지` : '👤';



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
                <button class="header-btn login-btn">${loginButtonText}</button>

            </div>
        </div>
        `;

        this.attachEvents(header);
        return header;
    }

    // 로그아웃 처리 메서드 수정
    // handleLogout() {
    //     // 확인 다이얼로그
    //     if (confirm('로그아웃 하시겠습니까?')) {
    //         console.log('🚪 로그아웃 시작');

    //         // 삭제 전 현재 저장된 값들 확인
    //         console.log('📋 삭제 전 로컬스토리지 상태:');
    //         console.log('  - accessToken:', localStorage.getItem('accessToken'));
    //         console.log('  - refreshToken:', localStorage.getItem('refreshToken'));
    //         console.log('  - userInfo:', localStorage.getItem('userInfo'));

    //         // 로컬스토리지 토큰 및 사용자 정보 삭제
    //         localStorage.removeItem('accessToken');
    //         localStorage.removeItem('refreshToken');
    //         localStorage.removeItem('userInfo');

    //         // 삭제 후 확인
    //         console.log('🧹 삭제 후 로컬스토리지 상태:');
    //         console.log('  - accessToken:', localStorage.getItem('accessToken'));
    //         console.log('  - refreshToken:', localStorage.getItem('refreshToken'));
    //         console.log('  - userInfo:', localStorage.getItem('userInfo'));

    //         console.log('✅ 로그아웃 완료 - 모든 토큰 삭제됨');

    //         // 알림 표시
    //         alert('로그아웃되었습니다.');

    //         // 페이지 새로고침하여 헤더 업데이트
    //         window.location.reload();
    //     } else {
    //         console.log('❌ 로그아웃 취소됨');
    //     }
    // }


    attachEvents(header) {
        // 👤 로그인 버튼 클릭 이벤트
        const loginBtn = header.querySelector('.login-btn');
        loginBtn.addEventListener('click', () => {
            // this.router.navigate('/login');  // 로그인 페이지로 이동
            console.log('라우터 존재:', !!window.router);
            console.log('라우터 객체:', window.router);

            // 2. 라우트 목록 확인
            console.log('등록된 라우트:', Object.keys(window.router?.routes || {}));
            const accessToken = localStorage.getItem('accessToken');

            if (accessToken) {
                // 로그인된 상태 - 로그아웃 처리
                this.handleLogout();
            } else {
                // 로그인되지 않은 상태 - 로그인 페이지로 이동
                window.router.navigateTo('/login');
            }

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
