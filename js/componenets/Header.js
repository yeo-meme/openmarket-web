export default class Header {
    constructor(router) {
        this.router = router;  // 라우터 인스턴스 받기
    }

    render() {
        const header = document.createElement('header');
        header.innerHTML = `
            <div class="header-content">
                <a href="#" class="logo">KODU</a>
                <!-- ... 검색바 생략 ... -->
                <div class="header-actions">
                    <button class="header-btn">🛒</button>
                    <button class="header-btn login-btn">👤</button>  <!-- 로그인 버튼 -->
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

        // ... 다른 이벤트들 생략 ...
    }
}
