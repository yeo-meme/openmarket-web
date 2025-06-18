export const loginPageTemplate = () => `
<div class="login-container">
    <div class="logo-section">
        <h1 class="logo">HODU</h1>
    </div>
    
    <div class="auth-form-container">
        <div class="tab-container">
            <button class="tab-btn active" data-tab="buyer">구매회원 로그인</button>
            <button class="tab-btn" data-tab="seller">판매회원 로그인</button>
        </div>
        
        <form class="auth-form" id="authForm">
            <div class="form-group">
                <input 
                    type="text" 
                    id="userId" 
                    placeholder="아이디" 
                    class="form-input"
                    required
                >
            </div>
            
            <div class="form-group">
                <input 
                    type="password" 
                    id="password" 
                    placeholder="비밀번호" 
                    class="form-input"
                    required
                >
            </div>
            
            <button type="submit" class="login-btn">로그인</button>
        </form>
        
        <div class="auth-links">
            <a href="#" class="link" id="goToSignup">회원가입</a>
            <span class="divider">|</span>
            <a href="#" class="link" id="findPassword">비밀번호 찾기</a>
        </div>
    </div>
</div>
`;
