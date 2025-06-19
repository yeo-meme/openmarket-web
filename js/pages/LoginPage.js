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

        // 로그인 폼 상태 관리
        this.loginState = {
            username: { isValid: false, message: '', value: '' },
            password: { isValid: false, message: '', value: '' }
        };
    }

    render() {
        try {
            const page = document.createElement('main');
            page.className = 'login-page';
            page.innerHTML = loginPageTemplate();
            this.loadStyles();
            this.addPageAnimation(page);

            // 이벤트 위임으로 통합
            page.addEventListener('click', this.handlePageClick.bind(this));

            return page;
        } catch (error) {
            console.error('❌ LoginPage 렌더링 오류:', error);
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
        
        // 탭 버튼 클릭 처리
        if (target.classList.contains('tab-btn')) {
            event.preventDefault();
            this.handleTabClick(target);
        }

        // 로그인 버튼 클릭 처리
        if (target.classList.contains('login-btn') || target.type === 'submit') {
            event.preventDefault();
            this.handleLoginClick(event);
        }

        // 회원가입 페이지 이동
        if (target.id === 'goToSignup') {
            console.log('회원가입 페이지로 이동');
            window.router.navigateTo('/register');
        }
    }

    /**
     * 탭 클릭 처리
     */
    handleTabClick(clickedTab) {
        const newTabType = clickedTab.dataset.tab;
        
        if (newTabType === this.currentTab) {
            return; // 이미 활성화된 탭이면 무시
        }
        
        // 탭 UI 업데이트
        document.querySelectorAll('.tab-btn').forEach(button => {
            button.classList.remove('active');
        });
        
        clickedTab.classList.add('active');
        this.currentTab = newTabType;
        
        // 폼 초기화
        this.clearForm();
        console.log(`✅ 탭 변경: ${newTabType === 'buyer' ? '구매회원' : '판매회원'}`);
    }

    /**
     * 로그인 버튼 클릭 처리
     */
    async handleLoginClick(event) {
        console.log('🔐 로그인 버튼 클릭');

        if (this.isLoading) {
            console.log('⚠️ 이미 로그인 요청 중...');
            return;
        }

        // 입력값 가져오기
        const userIdInput = document.querySelector('#userId');
        const passwordInput = document.querySelector('#password');
        const userId = userIdInput.value.trim();
        const password = passwordInput.value.trim();

        // 유효성 검사
        if (!this.validateInputs(userId, password, userIdInput, passwordInput)) {
            return;
        }

        // API 로그인 요청
        await this.performLogin(userId, password);
    }

    /**
     * 입력값 유효성 검사
     */
    validateInputs(userId, password, userIdInput, passwordInput) {
        let isValid = true;

        // 아이디 검증
        if (!userId) {
            this.showFieldError(userIdInput, '아이디를 입력해주세요.');
            userIdInput.focus();
            isValid = false;
        }

        // 비밀번호 검증
        if (!password) {
            this.showFieldError(passwordInput, '비밀번호를 입력해주세요.');
            if (isValid) passwordInput.focus();
            isValid = false;
        }

        if (!isValid) {
            alert(errorMessage);
        }

        return isValid;
    }

    /**
     * 실제 로그인 API 요청 수행
     */
    async performLogin(userId, password) {
        this.setLoadingState(true);

        try {
            console.log('📡 API 로그인 요청 시작:', { userId, userType: this.currentTab });

            const loginData = { username: userId, password: password };
            const result = await this.loginApiRequest(loginData);

            if (result.success) {
                await this.handleLoginSuccess(result.data, userId);
            } else {
                this.handleLoginFailure(result.error);
            }

        } catch (error) {
            console.error('❌ 로그인 오류:', error);
            this.showError('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            this.setLoadingState(false);
        }
    }

    /**
     * 로그인 API 요청
     */
    async loginApiRequest(loginData) {
        console.log('📡 로그인 API 요청 시작');
        
        try {
            const apiUrl = `${this.apiBaseUrl}/accounts/login/`;
            
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            };
            
            const response = await fetch(apiUrl, requestOptions);
            
            if (response.ok) {
                const responseData = await response.json();
                console.log('✅ 로그인 API 성공 - 전체 응답 데이터:');
                console.log('📋 SUCCESS 응답:', responseData);
                console.log('🔑 토큰 정보:');
                console.log('  - access:', responseData.access);
                console.log('  - refresh:', responseData.refresh);
                console.log('👤 사용자 정보:');
                console.log('  - user:', responseData.user);
                if (responseData.user) {
                    console.log('    - username:', responseData.user.username);
                    console.log('    - name:', responseData.user.name);
                    console.log('    - phone_number:', responseData.user.phone_number);
                    console.log('    - user_type:', responseData.user.user_type);
                }
                
                console.log('✅ 로그인 API 성공');
                return { success: true, data: responseData };
            } else {
                let errorData;
                const contentType = response.headers.get('content-type');
                
                if (contentType && contentType.includes('application/json')) {
                    errorData = await response.json();
                } else {
                    errorData = { detail: await response.text() };
                }
                
                console.log('❌ 로그인 API 실패:', response.status);
                return { success: false, error: errorData, status: response.status };
            }
            
        } catch (error) {
            console.error('❌ 로그인 API 네트워크 오류:', error);
            return { success: false, error: { message: error.message } };
        }
    }

    /**
     * 로그인 성공 처리
     */
    async handleLoginSuccess(data, userId) {
        // 토큰 저장
        if (data) {
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh || '');
        }
        console.log(`액세스토큰 저장함요 ${localStorage.getItem('accessToken')}, refresh:${localStorage.getItem('refreshToken')}`);

        // 사용자 정보 저장
        const userInfo = {
            id: userId,
            username: data.username || userId,
            userType: this.currentTab,
            loginTime: new Date().toISOString(),
            ...data.user
        };

        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        console.log('💾 사용자 정보 저장 완료');

        // 성공 메시지 표시
        this.showNotification(`${userInfo.username || userId}님, 환영합니다!`, 'success');

        // 이전 페이지로 이동 (2초 후)
        setTimeout(() => {
            const previousPage = sessionStorage.getItem('previousPage') || '/';
            sessionStorage.removeItem('previousPage');
            console.log('🔙 이전 페이지로 이동:', previousPage);
            window.router.navigateTo(previousPage);
        }, 2000);
    }

    /**
     * 로그인 실패 처리
     */
    handleLoginFailure(errorData) {
        const passwordInput = document.querySelector('#password');

        // 에러 메시지 결정
        let errorMessage = '사용자 정보가 옳지 않습니다.';

        if (errorData.detail) {
            if (errorData.detail.includes('자격 인증데이터')) {
                errorMessage = '아이디 또는 비밀번호가 올바르지 않습니다.';
            } else {
                errorMessage = errorData.detail;
            }

            alert(errorMessage);

        } else if (errorData.non_field_errors) {
            errorMessage = errorData.non_field_errors[0] || errorMessage;
        }

        this.showFieldError(passwordInput, errorMessage);

        passwordInput.value = '';
        passwordInput.focus();
    }

    /**
     * 로딩 상태 관리
     */
    setLoadingState(isLoading) {
        this.isLoading = isLoading;
        const loginBtn = document.querySelector('.login-btn');

        if (loginBtn) {
            if (isLoading) {
                loginBtn.disabled = true;
                loginBtn.innerHTML = '<span class="loading-spinner"></span>로그인 중...';
                loginBtn.classList.add('loading');
            } else {
                loginBtn.disabled = false;
                loginBtn.innerHTML = '로그인';
                loginBtn.classList.remove('loading');
            }
        }
    }

    /**
     * 폼 초기화
     */
    clearForm() {
        const inputs = document.querySelectorAll('#userId, #password');
        const warnings = document.querySelectorAll('#userIdWarning, #passwordWarning');
        
        inputs.forEach(input => {
            input.value = '';
            input.classList.remove('error');
        });
        
        warnings.forEach(warning => {
            warning.textContent = '';
        });
    }

    /**
     * 필드 에러 표시
     */
    showFieldError(inputElement, message) {
        const warningElementId = inputElement.id + 'Warning';
        const warningElement = document.getElementById(warningElementId);
        
        if (warningElement) {
            warningElement.textContent = message;
            inputElement.classList.add('error');
        }
    }

    /**
     * 에러 메시지 표시
     */
    showError(message) {
        this.showNotification(message, 'error');
    }

    /**
     * 알림 메시지 표시
     */
    showNotification(message, type = 'info') {
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
                document.body.removeChild(notification);
            }
        }, 3000);
    }

    /**
     * 페이지 애니메이션 추가
     */
    addPageAnimation(page) {
        page.style.opacity = '0';
        page.style.transform = 'translateY(20px)';
        page.style.transition = 'all 0.5s ease';

        requestAnimationFrame(() => {
            page.style.opacity = '1';
            page.style.transform = 'translateY(0)';
        });
    }

    /**
     * 리소스 정리
     */
    destroy() {
        console.log('🧹 LoginPage 정리 시작');
        this.unloadStyles();
        console.log('✅ LoginPage 정리 완료');
    }
}