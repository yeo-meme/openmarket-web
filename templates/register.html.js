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

        <div id="buyer" class="tab-content active">
            <form>
                <div class="form-group">
                    <label for="buyer-id">아이디</label>
                    <input type="text" id="username" placeholder="아이디를 입력해주세요">

                    <button type="button" class="verify-btn">중복확인</button>
                    <div id="buyer-id-message" class="message-container hidden">
                    <span class="message-text"></span>
                    </div>
                
                    </div>

                <div class="form-group">
                    <label for="buyer-password">비밀번호</label>
                    <input type="password" id="password-input" placeholder="비밀번호를 입력해주세요">
                    <div id="password-message" class="password-container hidden">
                    <span class="message-text"></span>
                    </div>
                </div>

                <div class="form-group">
                    <label for="buyer-password-confirm">비밀번호 재확인</label>
                    <input type="password" id="buyer-password-confirm" placeholder="비밀번호를 다시 입력해주세요">
                    <div id="re-password-message" class="re-password-container hidden">
                    <span class="message-text"></span>
                    </div>
                </div>

                <div class="form-group">
                    <label for="buyer-name">이름</label>
                    <input type="text" id="buyer-name" placeholder="이름을 입력해주세요">
                    <div id="name-message" class="name-container hidden">
                    <span class="message-text"></span>
                    </div>
                  
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
                        <input type="tel" class="phone-input" id="phone-input" placeholder="휴대폰 번호를 입력해주세요">
                          <div id="phone-message" class="phone-container hidden">
                         <span class="message-text"></span>
                         </div>
                    </div>
                </div>


                 <div class="terms">
                     <input type="checkbox" id="termsAgree">
                    <label for="termsAgree">호두샵의 <u>이용약관</u> 및 <u>개인정보처리방침</u>에 대한 내용을 확인하였고 동의합니다.</label>
                    <p class="warning-message" id="termsAgreeWarning"></p>
                        <div id="terms-message" class="terms-container hidden">
                         <span class="message-text"></span>
                         </div>
                </div>
                <button type="submit" class="signup-btn">가입하기</button>

          
            </form>
        </div>
    </div>
    </div>
        `;