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
            link.href = '/styles/components/header.css';


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
            this.router.navigate('/login');  // 로그인 페이지로 이동
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
