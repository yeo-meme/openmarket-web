import { loginPageTemplate } from '../../templates/login.html.js'
import { loginPageStyles } from '../../styles/login.css.js';
import { styleManager } from '../utils/CSSManager.js';


export default class LoginPage {
    constructor() {
        this.pageTitle = "HODU - 로그인";
        this.currentTab = 'buyer'; // 'buyer' 또는 'seller'
        this.styleId = 'login-page-styles';
        this.apiBaseUrl = 'https://api.wenivops.co.kr/services/open-market';
        this.isLoading = false;
    }

    render() {
        try {
            const page = document.createElement('main');
            page.className = 'login-page';
            page.innerHTML = loginPageTemplate();
            this.loadStyles();
            // this.bindEvents();
            this.addPageAnimation(page);


            // ✅ 상위 요소에 이벤트 위임
            page.addEventListener('click',
                this.handlePageClick.bind(this));

            // this.setupInputEvents(page);

            return page;

        } catch (error) {
            console.error('❌ LoginPage 렌더링 오류:', error);
            console.error('오류 스택:', error.stack);

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


    handlePageClick(event) {
        const target = event.target;
        console.log('🖱️ 클릭 이벤트 발생:', 
            {
                className: target.className,
                id: target.id,
                dataset: target.dataset
            });

        // 1. 탭 버튼 클릭 처리
        if (target.classList.contains('tab-btn')) {
            event.preventDefault();
            this.handleTabClick(target);
        }

        // 2. 로그인 버튼
        if (target.classList.contains('login-btn') || target.type === 'submit') {
            event.preventDefault();
            this.handleLoginClick(event);
        }
        // data-action 속성으로 구분
        // if (target.dataset.action === 'login') {
        //     console.log('로그인 클릭');
        //     this.handleLogin();
        // }

        // if (target.dataset.action === 'signup') {
        //     console.log('회원가입 클릭');
        //     window.router.navigateTo('/register');
        // }

        if (target.id === 'goToSignup') {
            console.log('회원가입 페이지로 이동');
            window.router.navigateTo('/register');
        }
    }

    /**
     * 🔄 탭 클릭 처리 (UI만 변경)
     */
    handleTabClick(clickedTab) {
        const newTabType = clickedTab.dataset.tab;
        
        console.log(`🔄 탭 전환: ${this.currentTab} → ${newTabType}`);
        
        // 이미 활성화된 탭이면 무시
        if (newTabType === this.currentTab) {
            console.log('⚠️ 이미 활성화된 탭입니다.');
            return;
        }
        
        // 1. 모든 탭 버튼에서 active 클래스 제거
        const allTabButtons = document.querySelectorAll('.tab-btn');
        allTabButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        // 2. 클릭된 탭 버튼에 active 클래스 추가
        clickedTab.classList.add('active');
        
        // 3. 현재 탭 상태 업데이트
        this.currentTab = newTabType;
        
        // 4. 폼 초기화 (선택사항)
        this.clearForm();
        
        console.log(`✅ 탭 UI 변경 완료: ${newTabType === 'buyer' ? '구매회원' : '판매회원'}`);
        
        // 5. 탭 변경 시 추가 동작이 필요하다면 여기에 추가
        this.onTabChanged(newTabType);
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

    setupLoginPageLogic() {
        const authForm = document.getElementById('authForm');
        const userIdInput = document.getElementById('userId');
        const passwordInput = document.getElementById('password');
        const userIdWarning = document.getElementById('userIdWarning');
        const passwordWarning = document.getElementById('passwordWarning');
        const tabContainer = document.querySelector('.tab-container');

        // --- Tab Switching Logic ---
        tabContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('tab-btn')) {
                document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
                event.target.classList.add('active');
                this.currentTab = event.target.dataset.tab;
                this.clearWarnings();
                userIdInput.value = '';
                passwordInput.value = '';
            }
        });

        // --- Form Submission and Validation ---
        authForm.addEventListener('submit', (event) => {
            console.log(`로그인 이벤트 크르르이이익`);
            event.preventDefault(); // Prevent default form submission

            this.clearWarnings(); // Clear previous warnings

            const userId = userIdInput.value.trim();
            const password = passwordInput.value.trim();

            let isValid = true;

            // 1. Check if fields are empty
            if (!userId) {
                userIdWarning.textContent = '아이디를 입력해주세요.';
                userIdInput.focus();
                isValid = false;
            }
            if (!password) {
                passwordWarning.textContent = '비밀번호를 입력해주세요.';
                if (isValid) {
                    passwordInput.focus();
                }
                isValid = false;
            }

            if (!isValid) {
                return; // Stop if any field is empty
            }

            // Simulate login (replace with actual API call)
            const correctBuyerId = 'hodubuyer';
            const correctBuyerPw = 'hodu1234';
            const correctSellerId = 'hoduseller';
            const correctSellerPw = 'seller1234';

            let credentialsMatch = false;

            if (this.currentTab === 'buyer') {
                if (userId === correctBuyerId && password === correctBuyerPw) {
                    credentialsMatch = true;
                }
            } else if (this.currentTab === 'seller') {
                if (userId === correctSellerId && password === correctSellerPw) {
                    credentialsMatch = true;
                }
            }

            // 2. Check for incorrect credentials
            if (!credentialsMatch) {
                passwordWarning.textContent = '아이디 또는 비밀번호가 일치하지 않습니다.';
                passwordInput.value = ''; // Clear password field
                passwordInput.focus();
                return;
            }

            // --- Successful Login ---
            alert(`${this.currentTab === 'buyer' ? '구매회원' : '판매회원'} 로그인 성공!`);
            console.log("로그인 성공! 이전 페이지로 이동합니다.");
            // In a real application, you'd use window.history.back() or a router
            // window.history.back();
        });

        // --- Clear warnings on input focus/typing ---
        userIdInput.addEventListener('input', () => {
            if (userIdWarning.textContent) {
                userIdWarning.textContent = '';
            }
        });

        passwordInput.addEventListener('input', () => {
            if (passwordWarning.textContent) {
                passwordWarning.textContent = '';
            }
        });
    }


    async handleLoginClick(event) {
        console.log('🔐 로그인 버튼 클릭');

        if (this.isLoading) {
            console.log('⚠️ 이미 로그인 요청 중...');
            return;
        }

        const userIdInput = document.querySelector('#userId');
        const passwordInput = document.querySelector('#password');

        const userId = userIdInput.value.trim();
        const password = passwordInput.value.trim();

        // 1. 입력 유효성 검사
        if (!this.validateInputs(userId, password, userIdInput, passwordInput)) {
            return;
        }

        // 2. API 로그인 요청
        await this.performLogin(userId, password);
    }

    /**
    * 📡 실제 API 로그인 요청
    */
    async performLogin(userId, password) {
        this.setLoadingState(true);

        try {
            console.log('📡 API 로그인 요청 시작:', { userId, userType: this.currentTab });

            const loginData = {
                username: userId,
                password: password,
                login_type: this.currentTab.toUpperCase() // BUYER 또는 SELLER
            };

            const response = await fetch(`${this.apiBaseUrl}/accounts/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData)
            });

            console.log('📡 API 응답 상태:', response.status);

            if (response.ok) {
                const data = await response.json();
                console.log('✅ 로그인 성공:', data);

                await this.handleLoginSuccess(data, userId);

            } else {
                const errorData = await response.json();
                console.log('❌ 로그인 실패:', errorData);

                this.handleLoginFailure(errorData);
            }

        } catch (error) {
            console.error('❌ API 요청 오류:', error);
            this.showError('네트워크 오류가 발생했습니다. 다시 시도해주세요.');

        } finally {
            this.setLoadingState(false);
        }
    }

    /**
     * ✅ 입력 유효성 검사
     */
    validateInputs(userId, password, userIdInput, passwordInput) {
        let isValid = true;

        // 아이디 입력 확인
        if (!userId) {
            this.showFieldError(userIdInput, '아이디를 입력해주세요.');
            userIdInput.focus();
            isValid = false;
        }

        // 비밀번호 입력 확인
        if (!password) {
            this.showFieldError(passwordInput, '비밀번호를 입력해주세요.');
            if (isValid) {
                passwordInput.focus();
            }
            isValid = false;
        }

        return isValid;
    }

    /**
     * ✅ 로그인 성공 처리
     */
    async handleLoginSuccess(data, userId) {
        // 토큰 저장
        if (data.token) {
            localStorage.setItem('accessToken', data.token);
            localStorage.setItem('refreshToken', data.refresh_token || '');
        }

        // 사용자 정보 저장
        const userInfo = {
            id: userId,
            username: data.username || userId,
            userType: this.currentTab,
            loginTime: new Date().toISOString(),
            ...data.user // API에서 추가 사용자 정보가 있다면
        };

        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        console.log('💾 사용자 정보 저장 완료:', userInfo);

        // 성공 메시지 표시
        this.showSuccessMessage(`${userInfo.username || userId}님, 환영합니다!`);

        // 이전 페이지로 이동 (2초 후)
        setTimeout(() => {
            const previousPage = sessionStorage.getItem('previousPage') || '/';
            sessionStorage.removeItem('previousPage');

            console.log('🔙 이전 페이지로 이동:', previousPage);
            window.router.navigateTo(previousPage);
        }, 2000);
    }

    /**
     * ❌ 로그인 실패 처리
     */
    handleLoginFailure(errorData) {
        const passwordInput = document.querySelector('#password');

        // 비밀번호 필드 초기화 및 포커스
        passwordInput.value = '';
        passwordInput.focus();

        // 에러 메시지 결정
        let errorMessage = '로그인에 실패했습니다.';

        if (errorData.detail) {
            if (errorData.detail.includes('자격 인증데이터')) {
                errorMessage = '아이디 또는 비밀번호가 올바르지 않습니다.';
            } else if (errorData.detail.includes('token')) {
                errorMessage = '인증 오류가 발생했습니다.';
            } else {
                errorMessage = errorData.detail;
            }
        } else if (errorData.non_field_errors) {
            errorMessage = errorData.non_field_errors[0] || errorMessage;
        } else if (errorData.username) {
            errorMessage = '아이디를 확인해주세요.';
        } else if (errorData.password) {
            errorMessage = '비밀번호를 확인해주세요.';
        }

        this.showFieldError(passwordInput, errorMessage);

        // 폼에 오류 상태 추가
        const form = document.querySelector('#authForm');
        if (form) {
            form.classList.add('error-state');
            setTimeout(() => {
                form.classList.remove('error-state');
            }, 3000);
        }

        passwordInput.value = ''; // 비밀번호 필드 비우기
        passwordInput.focus();    // 비밀번호 필드로 포커스 이동
    }

    /**
     * ⏳ 로딩 상태 관리
     */
    setLoadingState(isLoading) {
        this.isLoading = isLoading;
        const loginBtn = document.querySelector('.login-btn');

        if (loginBtn) {
            if (isLoading) {
                loginBtn.disabled = true;
                loginBtn.innerHTML = `
                    <span class="loading-spinner"></span>
                    로그인 중...
                `;
                loginBtn.classList.add('loading');
            } else {
                loginBtn.disabled = false;
                loginBtn.innerHTML = '로그인';
                loginBtn.classList.remove('loading');
            }
        }
    }


    // Helper function to clear all warning messages
    clearWarnings() {
        document.getElementById('userIdWarning').textContent = '';
        document.getElementById('passwordWarning').textContent = '';
    }


    // 성공 메시지를 표시하는 헬퍼 메서드
    showSuccessMessage(message) {
        let successMessageElement = document.getElementById('successMessage');
        if (!successMessageElement) {
            successMessageElement = document.createElement('p');
            successMessageElement.id = 'successMessage';
            successMessageElement.className = 'success-message'; // CSS 스타일링을 위한 클래스 추가
            const authForm = document.getElementById('authForm');
            if (authForm) {
                authForm.parentNode.insertBefore(successMessageElement, authForm.nextSibling);
            }
        }
        successMessageElement.textContent = message;
        successMessageElement.style.display = 'block'; // 보이게 처리

        // 3초 후 메시지 자동 숨김
        setTimeout(() => {
            this.clearWarnings();
        }, 3000);
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
        // const tabBtns = document.querySelectorAll('.tab-btn');
        // tabBtns.forEach(btn => {
        //     btn.addEventListener('click', (e) => {
        //         const tab = e.target.dataset.tab;
        //         this.switchTab(tab);
        //     });
        // });

        // // 폼 제출 이벤트
        // const authForm = document.getElementById('authForm');
        // authForm.addEventListener('submit', (e) => {
        //     e.preventDefault();
        //     this.handleLogin();
        // });

        //회원가입
        const signupBtn = document.querySelector('.goToSignup');
        console.log('--------------버튼:', signupBtn); // null이 아니면 다음 코드도 실행
        signupBtn.onclick = () => console.log('✅ 클릭됨');
        if (signupBtn) {
            signupBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(`-----------회원가입클릭`);
                window.router.navigateTo('/register');
            });
        }

        console.log('🔗 LoginPage 이벤트 바인딩 완료');
    }

    destroy() {
        console.log('🧹 LoginPagfe 정리 시작 (모듈 분리 버전)');

        // 스타일 정리
        this.unloadStyles();

        console.log('✅ LoginPagfe 정리 완료');
    }

    // 에러 메시지를 위한 헬퍼 (선택 사항, 경고 메시지와 다르게 표시하고 싶을 때)
    showErrorMessage(message) {
        const passwordWarning = document.getElementById('passwordWarning'); // 기존 경고 메시지 영역 재활용
        if (passwordWarning) {
            passwordWarning.textContent = message;
            passwordWarning.style.display = 'block';
        }
    }
    /**
 * 특정 입력 필드 아래에 경고 메시지를 표시합니다.
 * @param {HTMLInputElement} inputElement - 메시지를 표시할 입력 필드 요소
 * @param {string} message - 표시할 에러 메시지
 */
    showFieldError(inputElement, message) {
        const warningElementId = inputElement.id + 'Warning';
        const warningElement = document.getElementById(warningElementId);
        if (warningElement) {
            warningElement.textContent = message;
            // 필요하다면 입력 필드에 에러 스타일 클래스 추가
            inputElement.classList.add('input-error');
        }
    }

}