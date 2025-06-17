class LoginPage {

    constructor() {
        this.container = document.createElement('main');
        this.container.className = 'login-page';
    }
    render() {
        // const mainContent = document.getElementById('div');
        
        // ⭐ 로그인 페이지 UI 렌더링
        this.container.innerHTML = `
      <div class="logo">HÖDU</div>
    <div class="main-content">
        <div class="tab-container">
            <button class="tab active" data-tab="구매회원가입">구매회원가입</button>
            <button class="tab" data-tab="판매회원가입">판매회원가입</button>
        </div>
        
        <div class="form-container">
            <form id="signupForm">
                <div class="form-group">
                    <label for="userId">아이디</label>
                    <div class="input-with-button">
                        <input type="text" id="userId" placeholder="jayooding22">
                        <button type="button" class="check-btn" id="checkUserId">중복확인</button>
                    </div>
                    <div class="success-message hidden" id="userIdSuccess">
                        <span class="check-icon">✓</span> 멋진 아이디네요! 1
                    </div>
                </div>

                <div class="form-group">
                    <label for="password">비밀번호</label>
                    <input type="password" id="password" placeholder="비밀번호">
                </div>

                <div class="form-group">
                    <label for="passwordConfirm">비밀번호 재확인</label>
                    <input type="password" id="passwordConfirm" placeholder="비밀번호 재확인">
                    <div class="error-message hidden" id="passwordError">
                        비밀번호가 일치하지 않습니다.
                    </div>
                </div>

                <div class="form-group">
                    <label for="name">이름</label>
                    <input type="text" id="name">
                </div>

                <div class="form-group">
                    <label>휴대폰번호</label>
                    <div class="phone-group">
                        <select class="phone-select" id="phonePrefix">
                            <option value="010">010</option>
                            <option value="011">011</option>
                            <option value="016">016</option>
                            <option value="017">017</option>
                            <option value="018">018</option>
                            <option value="019">019</option>
                        </select>
                        <div class="phone-inputs">
                            <input type="text" id="phoneMiddle" maxlength="4">
                            <input type="text" id="phoneLast" maxlength="4">
                        </div>
                    </div>
                </div>

                <div class="checkbox-group">
                    <input type="checkbox" id="termsAgree">
                    <label for="termsAgree">호두샵의 <u>이용약관</u> 및 <u>개인정보처리방침</u>에 대한 내용을 확인하였고 동의합니다.</label>
                </div>

                <button type="submit" class="submit-btn" id="submitBtn">가입하기</button>
            </form>
            
            <!-- 판매회원가입 폼 (숨김) -->
            <form id="sellerSignupForm" class="hidden">
                <div class="form-group">
                    <label for="sellerUserId">아이디</label>
                    <div class="input-with-button">
                        <input type="text" id="sellerUserId" placeholder="seller123">
                        <button type="button" class="check-btn">중복확인</button>
                    </div>
                </div>

                <div class="form-group">
                    <label for="sellerPassword">비밀번호</label>
                    <input type="password" id="sellerPassword">
                </div>

                <div class="form-group">
                    <label for="sellerPasswordConfirm">비밀번호 재확인</label>
                    <input type="password" id="sellerPasswordConfirm">
                </div>

                <div class="form-group">
                    <label for="sellerName">이름</label>
                    <input type="text" id="sellerName">
                </div>

                <div class="form-group">
                    <label for="businessNumber">사업자 등록번호</label>
                    <input type="text" id="businessNumber" placeholder="000-00-00000">
                </div>

                <div class="form-group">
                    <label for="storeName">스토어 이름</label>
                    <input type="text" id="storeName">
                </div>

                <div class="checkbox-group">
                    <input type="checkbox" id="sellerTermsAgree">
                    <label for="sellerTermsAgree">호두샵의 <u>이용약관</u> 및 <u>개인정보처리방침</u>에 대한 내용을 확인하였고 동의합니다.</label>
                </div>

                <button type="submit" class="submit-btn">가입하기</button>
            </form>
        </div>
    </div>
        `;
     
        // this.attachEvents();
        return this.container;
    }

    attachEvents() {
        // 로그인 폼 제출 이벤트
        const form = document.querySelector('.login-form form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // ... 로그인 로직 처리 ...
        });
    }
}

export default LoginPage; // 이렇게 'default' 키워드를 추가합니다.