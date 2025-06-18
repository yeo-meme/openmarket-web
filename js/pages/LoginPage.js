import { loginPageTemplate } from '../../templates/login.html.js'
import { loginPageStyles } from '../../styles/login.css.js';
import { styleManager } from '../utils/CSSManager.js';


export default class LoginPage {
    constructor() {
        this.pageTitle = "HODU - 로그인";
        this.currentTab = 'buyer'; // 'buyer' 또는 'seller'
        this.styleId = 'login-page-styles';
    }
    render() {
 
        try {
            const page = document.createElement('main');
            page.className = 'login-page';
            
            console.log('🔧 템플릿 적용 중...');
            page.innerHTML = loginPageTemplate();
            
            console.log('🔧 스타일 로드 중...');
            this.loadStyles();
            
            console.log('🔧 이벤트 바인딩 중...');
            // this.bindEvents();
            
            console.log('🔧 애니메이션 추가 중...');
            this.addPageAnimation(page);
            
            console.log('🔧 페이지 요소 생성 완료:', page);
            return page;
            
        } catch (error) {
            console.error('❌ LoginPage 렌더링 오류:', error);
            console.error('오류 스택:', error.stack);
            
            // 기본 페이지라도 반환
            const errorPage = document.createElement('main');
            errorPage.innerHTML = '<h1>로그인 페이지 로드 오류</h1>';
            return errorPage;
        }
    }

    loadStyles() {
        styleManager.loadStyle(this.styleId, loginPageStyles);
    }

    unloadStyles() {
        styleManager.unloadStyle(this.styleId);
    }


    // addStyles() {
    //     if (!document.getElementById('auth-page-styles')) {
    //         const style = document.createElement('style');
    //         style.id = 'auth-page-styles';
    //         style.textContent = `
    //             .auth-page {
    //                 min-height: 100vh;
    //                 background: #f8f9fa;
    //                 display: flex;
    //                 align-items: center;
    //                 justify-content: center;
    //                 padding: 2rem 1rem;
    //                 font-family: 'Spoqa Han Sans Neo', sans-serif;
    //             }

    //             .auth-container {
    //                 width: 100%;
    //                 max-width: 440px;
    //                 background: white;
    //                 padding: 0;
    //                 border-radius: 10px;
    //                 box-shadow: 0 0 10px rgba(0,0,0,0.1);
    //                 overflow: hidden;
    //             }

    //             .logo-section {
    //                 background: white;
    //                 padding: 3rem 0 2rem 0;
    //                 text-align: center;
    //             }

    //             .logo {
    //                 font-size: 3rem;
    //                 font-weight: 900;
    //                 color: #21BF48;
    //                 margin: 0;
    //                 letter-spacing: 2px;
    //             }

    //             .auth-form-container {
    //                 padding: 0;
    //             }

    //             .tab-container {
    //                 display: flex;
    //                 border-bottom: 1px solid #e9ecef;
    //             }

    //             .tab-btn {
    //                 flex: 1;
    //                 padding: 1.2rem;
    //                 border: none;
    //                 background: #f8f9fa;
    //                 color: #6c757d;
    //                 font-size: 1rem;
    //                 font-weight: 500;
    //                 cursor: pointer;
    //                 transition: all 0.3s ease;
    //                 border-bottom: 2px solid transparent;
    //             }

    //             .tab-btn.active {
    //                 background: white;
    //                 color: #495057;
    //                 border-bottom-color: #21BF48;
    //                 font-weight: 600;
    //             }

    //             .tab-btn:hover:not(.active) {
    //                 background: #e9ecef;
    //                 color: #495057;
    //             }

    //             .auth-form {
    //                 padding: 2rem;
    //             }

    //             .form-group {
    //                 margin-bottom: 1rem;
    //             }

    //             .form-input {
    //                 width: 100%;
    //                 padding: 1rem;
    //                 border: 1px solid #e9ecef;
    //                 border-radius: 5px;
    //                 font-size: 1rem;
    //                 background: #f8f9fa;
    //                 transition: all 0.3s ease;
    //                 box-sizing: border-box;
    //             }

    //             .form-input:focus {
    //                 outline: none;
    //                 border-color: #21BF48;
    //                 background: white;
    //                 box-shadow: 0 0 0 2px rgba(33, 191, 72, 0.1);
    //             }

    //             .form-input::placeholder {
    //                 color: #adb5bd;
    //             }

    //             .login-btn {
    //                 width: 100%;
    //                 padding: 1rem;
    //                 background: #21BF48;
    //                 color: white;
    //                 border: none;
    //                 border-radius: 5px;
    //                 font-size: 1.1rem;
    //                 font-weight: 600;
    //                 cursor: pointer;
    //                 transition: all 0.3s ease;
    //                 margin-top: 1rem;
    //             }

    //             .login-btn:hover {
    //                 background: #1ea63c;
    //                 transform: translateY(-1px);
    //                 box-shadow: 0 4px 12px rgba(33, 191, 72, 0.3);
    //             }

    //             .login-btn:active {
    //                 transform: translateY(0);
    //             }

    //             .auth-links {
    //                 text-align: center;
    //                 padding: 1.5rem 2rem 2rem 2rem;
    //                 background: #f8f9fa;
    //                 border-top: 1px solid #e9ecef;
    //             }

    //             .link {
    //                 color: #6c757d;
    //                 text-decoration: none;
    //                 font-size: 0.9rem;
    //                 transition: color 0.3s ease;
    //             }

    //             .link:hover {
    //                 color: #21BF48;
    //                 text-decoration: underline;
    //             }

    //             .divider {
    //                 margin: 0 1rem;
    //                 color: #dee2e6;
    //             }

    //             /* 로딩 상태 */
    //             .login-btn.loading {
    //                 background: #95a5a6;
    //                 cursor: not-allowed;
    //                 position: relative;
    //                 overflow: hidden;
    //             }

    //             .login-btn.loading::after {
    //                 content: '';
    //                 position: absolute;
    //                 top: 50%;
    //                 left: 50%;
    //                 width: 20px;
    //                 height: 20px;
    //                 border: 2px solid transparent;
    //                 border-top: 2px solid white;
    //                 border-radius: 50%;
    //                 animation: spin 1s linear infinite;
    //                 transform: translate(-50%, -50%);
    //             }

    //             @keyframes spin {
    //                 0% { transform: translate(-50%, -50%) rotate(0deg); }
    //                 100% { transform: translate(-50%, -50%) rotate(360deg); }
    //             }

    //             /* 에러 상태 */
    //             .form-input.error {
    //                 border-color: #dc3545;
    //                 background: #fff5f5;
    //             }

    //             .error-message {
    //                 color: #dc3545;
    //                 font-size: 0.85rem;
    //                 margin-top: 0.5rem;
    //                 display: none;
    //             }

    //             .error-message.show {
    //                 display: block;
    //             }

    //             /* 성공 상태 */
    //             .form-input.success {
    //                 border-color: #28a745;
    //                 background: #f8fff9;
    //             }

    //             /* 반응형 디자인 */
    //             @media (max-width: 480px) {
    //                 .auth-page {
    //                     padding: 1rem;
    //                 }

    //                 .auth-container {
    //                     max-width: 100%;
    //                     margin: 0;
    //                 }

    //                 .logo {
    //                     font-size: 2.5rem;
    //                 }

    //                 .logo-section {
    //                     padding: 2rem 0 1.5rem 0;
    //                 }

    //                 .tab-btn {
    //                     font-size: 0.9rem;
    //                     padding: 1rem 0.5rem;
    //                 }

    //                 .auth-form {
    //                     padding: 1.5rem;
    //                 }

    //                 .form-input {
    //                     padding: 0.9rem;
    //                 }

    //                 .login-btn {
    //                     padding: 0.9rem;
    //                     font-size: 1rem;
    //                 }
    //             }

    //             /* 접근성 개선 */
    //             .tab-btn:focus,
    //             .form-input:focus,
    //             .login-btn:focus,
    //             .link:focus {
    //                 outline: 2px solid #21BF48;
    //                 outline-offset: 2px;
    //             }

    //             /* 다크모드 대응 */
    //             @media (prefers-color-scheme: dark) {
    //                 .auth-page {
    //                     background: #1a1a1a;
    //                 }

    //                 .auth-container {
    //                     background: #2d3748;
    //                     box-shadow: 0 0 20px rgba(0,0,0,0.3);
    //                 }

    //                 .logo-section {
    //                     background: #2d3748;
    //                 }

    //                 .tab-btn {
    //                     background: #4a5568;
    //                     color: #a0aec0;
    //                 }

    //                 .tab-btn.active {
    //                     background: #2d3748;
    //                     color: #e2e8f0;
    //                 }

    //                 .form-input {
    //                     background: #4a5568;
    //                     border-color: #718096;
    //                     color: #e2e8f0;
    //                 }

    //                 .form-input::placeholder {
    //                     color: #a0aec0;
    //                 }

    //                 .auth-links {
    //                     background: #4a5568;
    //                     border-top-color: #718096;
    //                 }

    //                 .link {
    //                     color: #a0aec0;
    //                 }
    //             }

    //             /* 페이지 진입 애니메이션 */
    //             .auth-page {
    //                 animation: fadeIn 0.5s ease-out;
    //             }

    //             @keyframes fadeIn {
    //                 from {
    //                     opacity: 0;
    //                     transform: translateY(20px);
    //                 }
    //                 to {
    //                     opacity: 1;
    //                     transform: translateY(0);
    //                 }
    //             }

    //             .auth-container {
    //                 animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    //             }

    //             @keyframes slideUp {
    //                 from {
    //                     opacity: 0;
    //                     transform: translateY(40px) scale(0.95);
    //                 }
    //                 to {
    //                     opacity: 1;
    //                     transform: translateY(0) scale(1);
    //                 }
    //             }
    //         `;
    //         document.head.appendChild(style);
    //     }
    // }

    bindEvents() {
        // 탭 버튼 이벤트
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                this.switchTab(tab);
            });
        });

        // 폼 제출 이벤트
        const authForm = document.getElementById('authForm');
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // 입력 필드 이벤트
        const inputs = document.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                this.clearError(input);
            });

            input.addEventListener('blur', () => {
                this.validateInput(input);
            });
        });

        // 링크 이벤트
        document.getElementById('findId').addEventListener('click', (e) => {
            e.preventDefault();
            this.showNotification('아이디 찾기 기능을 준비 중입니다.', 'info');
        });

        document.getElementById('findPassword').addEventListener('click', (e) => {
            e.preventDefault();
            this.showNotification('비밀번호 찾기 기능을 준비 중입니다.', 'info');
        });

        console.log('🔗 AuthPage 이벤트 바인딩 완료');
    }

    switchTab(tab) {
        this.currentTab = tab;
        
        // 탭 버튼 상태 변경
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

        // 폼 초기화
        this.clearForm();

        console.log(`🔄 탭 변경: ${tab === 'buyer' ? '구매회원' : '판매회원'}`);
    }

    async handleLogin() {
        const userId = document.getElementById('userId').value.trim();
        const password = document.getElementById('password').value.trim();

        // 유효성 검사
        if (!this.validateForm(userId, password)) {
            return;
        }

        // 로딩 상태
        this.setLoadingState(true);

        try {
            // 로그인 시뮬레이션 (2초 지연)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // 간단한 로그인 검증
            if (this.authenticateUser(userId, password)) {
                this.showNotification('로그인 성공!', 'success');
                
                // 홈페이지로 이동
                setTimeout(() => {
                    if (window.router) {
                        window.router.navigateTo('/');
                    }
                }, 1000);
            } else {
                this.showError('아이디 또는 비밀번호가 올바르지 않습니다.');
            }

        } catch (error) {
            console.error('로그인 오류:', error);
            this.showError('로그인 중 오류가 발생했습니다.');
        } finally {
            this.setLoadingState(false);
        }
    }

    authenticateUser(userId, password) {
        // 테스트 계정
        const testAccounts = {
            buyer: { id: 'buyer123', password: 'password123' },
            seller: { id: 'seller123', password: 'password123' }
        };

        const account = testAccounts[this.currentTab];
        return userId === account.id && password === account.password;
    }

    validateForm(userId, password) {
        let isValid = true;

        if (!userId) {
            this.showInputError('userId', '아이디를 입력해주세요.');
            isValid = false;
        }

        if (!password) {
            this.showInputError('password', '비밀번호를 입력해주세요.');
            isValid = false;
        }

        return isValid;
    }

    validateInput(input) {
        const value = input.value.trim();
        
        if (!value) {
            this.showInputError(input.id, `${input.placeholder}을(를) 입력해주세요.`);
            return false;
        }

        this.clearError(input);
        return true;
    }

    showInputError(inputId, message) {
        const input = document.getElementById(inputId);
        input.classList.add('error');
        
        // 에러 메시지 표시 (필요시 구현)
        console.warn(`❌ ${message}`);
    }

    clearError(input) {
        input.classList.remove('error');
        input.classList.remove('success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    clearForm() {
        const inputs = document.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.value = '';
            this.clearError(input);
        });
    }

    setLoadingState(loading) {
        const btn = document.querySelector('.login-btn');
        const inputs = document.querySelectorAll('.form-input');

        if (loading) {
            btn.classList.add('loading');
            btn.disabled = true;
            btn.textContent = '';
            inputs.forEach(input => input.disabled = true);
        } else {
            btn.classList.remove('loading');
            btn.disabled = false;
            btn.textContent = '로그인';
            inputs.forEach(input => input.disabled = false);
        }
    }

    showNotification(message, type = 'info') {
        // 간단한 알림 표시
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            z-index: 10000;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.animation = 'slideInRight 0.3s ease reverse';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, 3000);
    }

    addPageAnimation(page) {
        page.style.opacity = '0';
        page.style.transform = 'translateY(20px)';
        page.style.transition = 'all 0.5s ease';
        
        requestAnimationFrame(() => {
            page.style.opacity = '1';
            page.style.transform = 'translateY(0)';
        });
    }

    bindEvents() {
        // 탭 버튼 이벤트
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                this.switchTab(tab);
            });
        });

        // 폼 제출 이벤트
        const authForm = document.getElementById('authForm');
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // 회원가입 버튼 이벤트
        this.addSignupButtonEvent();

        console.log('🔗 AuthPage 이벤트 바인딩 완료');
    }

 destroy() {
        console.log('🧹 AuthPage 정리 시작 (모듈 분리 버전)');
        
        // 스타일 정리
        this.unloadStyles();
        
        console.log('✅ AuthPage 정리 완료');
    }
}