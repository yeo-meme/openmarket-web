export const registerPageTemplate = () => `
    <div class="logo">HÖDU</div>
      <div class="signup-container">
        <div class="logo">
            <h1>HODU</h1>
        </div>

        <div class="tabs">
            <button class="tab-btn active" data-tab="buyer">구매회원가입</button>
            <button class="tab-btn" data-tab="seller">판매회원가입</button>
        </div>

        <!-- 구매회원가입 탭 -->
        <div id="buyer" class="tab-content active">
            <form>
                <div class="form-group">
                    <label for="buyer-id">아이디</label>
                    <input type="text" id="buyer-id" placeholder="아이디를 입력해주세요">
                </div>

                <div class="form-group">
                    <label for="buyer-password">비밀번호</label>
                    <input type="password" id="buyer-password" placeholder="비밀번호를 입력해주세요">
                </div>

                <div class="form-group">
                    <label for="buyer-password-confirm">비밀번호 재확인</label>
                    <input type="password" id="buyer-password-confirm" placeholder="비밀번호를 다시 입력해주세요">
                </div>

                <div class="form-group">
                    <label for="buyer-name">이름</label>
                    <input type="text" id="buyer-name" placeholder="이름을 입력해주세요">
                </div>

                <div class="form-group">
                    <label>휴대폰번호</label>
                    <div class="phone-group">
                        <select class="phone-select">
                            <option value="010">010</option>
                            <option value="011">011</option>
                            <option value="016">016</option>
                            <option value="017">017</option>
                            <option value="018">018</option>
                            <option value="019">019</option>
                        </select>
                        <input type="tel" class="phone-input" placeholder="휴대폰 번호를 입력해주세요">
                        <button type="button" class="verify-btn">인증번호 받기</button>
                    </div>
                </div>

                <div class="form-group">
                    <input type="text" placeholder="인증번호를 입력해주세요">
                </div>

                <button type="submit" class="signup-btn">가입하기</button>

                <div class="terms">
                    회원가입을 위해서는 <a href="#">이용약관</a> 및 <a href="#">개인정보처리방침</a>에 대한 동의가 필요합니다.
                </div>
            </form>
        </div>
    </div>
       
    </div>

        `;