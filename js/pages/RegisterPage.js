import { registerPageTemplate } from '../../templates/register.html.js'
import { registerPageStyles } from '../../styles/register.css.js';
import { styleManager } from '../utils/CSSManager.js';


class RegisterPage {

    constructor() {
        this.pageTitle = "HODU - 로그인";
        this.currentTab = 'buyer'; // 'buyer' 또는 'seller'
        this.styleId = 'register-page-styles';
        this.apiBaseUrl = 'https://api.wenivops.co.kr/services/open-market';
    }

    render() {
        const page = document.createElement('main');
        page.className = 'register-page';
        page.innerHTML = registerPageTemplate();
        this.loadStyles();
        // this.bindEvents();
        // this.addPageAnimation(page);
        // ✅ 상위 요소에 이벤트 위임
        page.addEventListener('click',
            this.handlePageClick.bind(this));

        // this.attachEvents();
        return page;
    }

    loadStyles() {
        styleManager.loadStyle(this.styleId, registerPageStyles);
    }

    unloadStyles() {
        styleManager.unloadStyle(this.styleId);
    }


    async handlePageClick(event) {
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

           // 2. 가입 버튼 클릭 처리
    if (target.classList.contains('signup-btn')) {
        event.preventDefault(); // form submit 방지
        this.validateAndSubmitForm(); 
        return;
    }

    // 3. 중복확인
    if (target.classList.contains('verify-btn')) {
        event.preventDefault(); // form submit 방지
        await this.handleIdCheck(); // 중복확인
        return;
    }

    }


    /**
     * 🔍 ID 중복확인 async 처리
     */
    async handleIdCheck(button) {
        console.log('🔍 ID 중복확인 시작');
        
        // 현재 입력된 아이디 가져오기
        const usernameInput = document.querySelector('#username');
        const username = usernameInput.value.trim();
    
        
        // this.hideMessage(messageEl);
        
        
        // 1. 입력값 검증
        if (!username) {
            this.showMessage('아이디를 입력해주세요.');
            usernameInput.focus();
            return;
        }
        
        if (username.length > 20 || !/^[a-zA-Z0-9]+$/.test(username)) {
            this.showMessage('ID는 20자 이내의 영어, 숫자만 가능합니다.');
            return;
        }
        
        this.showMessage('확인 중...');
        // this.setButtonLoading(button, true);
        
        try {
            // 3. ⭐ API 요청 (async)
            const response = await fetch(`${this.apiBaseUrl}/accounts/validate-username/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username })
            });
            
            if (response.ok) {
                this.showMessage('✓ 사용 가능한 아이디입니다!', 'success');
                console.log('✅ ID 중복확인 성공');
                
            } else {
                // ❌ 실패
                const errorData = await response.json();
                
                let errorText = '이미 사용 중인 아이디입니다.';
                if (errorData.detail) {
                    errorText = errorData.detail;
                } else if (errorData.username) {
                    errorText = errorData.username[0];
                }
                this.showMessage( errorText, 'error');
                
                console.log('❌ ID 중복확인 실패:', errorText);
            }
            
        } catch (error) {
            // 🚨 네트워크 오류
            console.error('❌ ID 중복확인 API 오류:', error);
            
            this.hideMessage(loadingMessage);
            this.showMessage( '네트워크 오류가 발생했습니다.', 'error');
            
        } finally {
            // 5. 로딩 상태 해제
            this.setButtonLoading(button, false);
        }
    }

//     // 메시지 표시 함수
//     showMessage(element, text, type = 'info') {
//     const messageEl = document.getElementById('buyer-id-message');
        
//     element.textContent = text;
//     element.className = `message ${type} visible`;
//     element.style.display = 'block';
    
//     // 부드러운 애니메이션
//     element.style.opacity = '1';
// }

showMessage(text, type = 'info') {
    const messageContainer = document.getElementById('buyer-id-message');
    const messageText = messageContainer.querySelector('.message-text');
    
    if (!messageContainer || !messageText) {
        console.error('메시지 요소를 찾을 수 없습니다:', messageId);
        return;
    }
    
    // 메시지 내용 설정
    messageText.textContent = text;
    
    // 타입별 클래스 설정
    messageContainer.className = `message-container visible ${type}`;
    
    // ✅ 숨김 → 표시 애니메이션
    messageContainer.style.display = 'block';
    messageContainer.style.opacity = '0';
    messageContainer.style.transform = 'translateY(-10px)';
    
    // 부드러운 나타나기 애니메이션
    setTimeout(() => {
        messageContainer.style.opacity = '1';
        messageContainer.style.transform = 'translateY(0)';
    }, 10);
    
    console.log(`📢 메시지 표시: [${type}] ${text}`);
}


    validateAndSubmitForm() {
        const buyerSignupForm = document.getElementById('buyerSignupForm');
        const sellerSignupForm = document.getElementById('sellerSignupForm');

        // 구매자 폼 요소
        const buyerInputs = {
            username: document.getElementById('userId'),
            password: document.getElementById('password'),
            passwordConfirm: document.getElementById('passwordConfirm'),
            name: document.getElementById('name'),
            phonePrefix: document.getElementById('phonePrefix'),
            phoneMiddle: document.getElementById('phoneMiddle'),
            phoneLast: document.getElementById('phoneLast'),
            termsAgree: document.getElementById('termsAgree')
        };
        const buyerWarnings = {
            username: document.getElementById('userIdWarning'),
            password: document.getElementById('passwordWarning'),
            passwordConfirm: document.getElementById('passwordConfirmWarning'),
            name: document.getElementById('nameWarning'),
            phoneNumber: document.getElementById('phoneNumberWarning'),
            termsAgree: document.getElementById('termsAgreeWarning')
        };
        const buyerSuccess = {
            username: document.getElementById('userIdSuccess')
        };
        const checkUserIdBtn = document.getElementById('checkUserId');

        // 판매자 폼 요소 (판매자 폼이 활성화될 때 가져와야 함)
        let sellerInputs = {};
        let sellerWarnings = {};
        let sellerSuccess = {};
        let checkSellerUserIdBtn = null;

        let currentActiveForm = 'buyer'; // 현재 활성화된 폼 추적

        const baseUrl = 'https://api.wenivops.co.kr';
        const buyerSignupEndpoint = `${baseUrl}/accounts/buyer/signup/`;
        const sellerSignupEndpoint = `${baseUrl}/accounts/seller/signup/`; // 판매자 회원가입 엔드포인트 (가정)
        const checkIdEndpoint = `${baseUrl}/accounts/check-id/`; // ID 중복확인 엔드포인트 (가정)





        // --- 구매자 폼 제출 로직 ---
        buyerSignupForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            this.clearWarnings(buyerWarnings); // 구매자 폼 경고만 초기화
            this.clearSuccessMessages(buyerSuccess); // 구매자 폼 성공 메시지 초기화

            const username = buyerInputs.username.value.trim();
            const password = buyerInputs.password.value.trim();
            const passwordConfirm = buyerInputs.passwordConfirm.value.trim();
            const name = buyerInputs.name.value.trim();
            const phoneNumber = buyerInputs.phonePrefix.value + buyerInputs.phoneMiddle.value.trim() + buyerInputs.phoneLast.value.trim();
            const termsAgreed = buyerInputs.termsAgree.checked;

            let isValid = true;

            // 1. 모든 필드는 필수로 작성해야 합니다.
            if (!username) { buyerWarnings.username.textContent = '아이디를 입력해주세요.'; isValid = false; }
            if (!password) { buyerWarnings.password.textContent = '비밀번호를 입력해주세요.'; isValid = false; }
            if (!passwordConfirm) { buyerWarnings.passwordConfirm.textContent = '비밀번호 재확인을 입력해주세요.'; isValid = false; }
            if (!name) { buyerWarnings.name.textContent = '이름을 입력해주세요.'; isValid = false; }
            if (!phoneNumber.length === 0) { buyerWarnings.phoneNumber.textContent = '휴대폰 번호를 입력해주세요.'; isValid = false; }
            if (!termsAgreed) { buyerWarnings.termsAgree.textContent = '이용약관 및 개인정보처리방침에 동의해야 합니다.'; isValid = false; }

            // 2. 비밀번호 재확인 일치
            if (password && passwordConfirm && password !== passwordConfirm) {
                buyerWarnings.passwordConfirm.textContent = '비밀번호가 일치하지 않습니다.';
                isValid = false;
            }

            // 3. 비밀번호 유효성 (8자 이상, 영소문자, 숫자 포함)
            if (password) {
                if (password.length < 8) {
                    buyerWarnings.password.textContent = '비밀번호는 8자 이상이어야 합니다.';
                    isValid = false;
                } else if (!/[a-z]/.test(password)) {
                    buyerWarnings.password.textContent = '비밀번호는 한 개 이상의 영소문자를 포함해야 합니다.';
                    isValid = false;
                } else if (!/[0-9]/.test(password)) {
                    buyerWarnings.password.textContent = '비밀번호는 한 개 이상의 숫자를 포함해야 합니다.';
                    isValid = false;
                }
            }

            // 4. 아이디 유효성 (20자 이내, 영문/숫자만)
            if (username && (username.length > 20 || !/^[a-zA-Z0-9]+$/.test(username))) {
                buyerWarnings.username.textContent = 'ID는 20자 이내의 영어 소문자, 대문자, 숫자만 가능합니다.';
                isValid = false;
            }

            // 5. 휴대폰 번호 유효성 (010으로 시작하는 10~11자리 숫자)
            if (phoneNumber && !/^010[0-9]{7,8}$/.test(phoneNumber)) {
                buyerWarnings.phoneNumber.textContent = '핸드폰번호는 010으로 시작하는 10~11자리 숫자여야 합니다.';
                isValid = false;
            }

            // 6. ID 중복확인 여부 (API 요청 전에 필수적으로 확인)
            // if (!isBuyerIdChecked) {
            //     buyerWarnings.username.textContent = '아이디 중복확인을 해주세요.';
            //     isValid = false;
            // }

            if (!isValid) {
                console.log('클라이언트 측 유효성 검사 실패');
                return;
            }

            // --- API 요청 전 최종 데이터 확인 ---
            console.log('구매자 회원가입 요청 데이터:', { username, password, name, phone_number: phoneNumber, user_type: "BUYER" });

            try {
                const response = await fetch(buyerSignupEndpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                        name: name,
                        phone_number: phoneNumber,
                        user_type: "BUYER"
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('구매자 회원가입 API 응답 오류:', errorData);

                    this.displayApiErrors(errorData, buyerWarnings, buyerSuccess);
                    return;
                }

                const successData = await response.json();
                console.log('구매자 회원가입 성공:', successData);
                this.showGlobalSuccessMessage('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');

                // 회원가입 성공 후 로그인 페이지로 이동 (라우터 사용 권장)
                setTimeout(() => {
                    if (this.router) {
                        this.router.navigateTo('/login');
                    } else {
                        window.location.href = '/login';
                    }
                }, 2000);

            } catch (error) {
                console.error('구매자 회원가입 API 요청 중 치명적인 오류 발생:', error);
                this.showGlobalErrorMessage('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            }
        });
    }

    // 특정 폼의 입력값과 메시지를 초기화하는 헬퍼
    resetForm(formElement) {
        formElement.reset(); // 폼의 모든 입력 필드 초기화
        this.clearAllWarningsAndSuccessMessages(); // 모든 메시지 초기화
    }

    // 모든 경고 메시지 및 성공 메시지를 초기화하는 함수 (전역 적용)
    clearAllWarningsAndSuccessMessages() {
        document.querySelectorAll('.warning-message').forEach(el => el.textContent = '');
        document.querySelectorAll('.success-message').forEach(el => el.classList.add('hidden'));
        // 전역 성공/오류 메시지 영역도 초기화
        const globalMessageContainer = document.getElementById('globalMessageContainer');
        if (globalMessageContainer) {
            globalMessageContainer.innerHTML = '';
            globalMessageContainer.classList.add('hidden');
        }
    }

    // API 응답 에러를 해당 필드의 경고 메시지에 표시하는 헬퍼
    displayApiErrors(errorData, warnings, successMessages) {
        // 필드별 오류 메시지 처리
        for (const field in errorData) {
            if (warnings[field]) { // 해당 필드의 경고 메시지 영역이 존재하면
                warnings[field].textContent = errorData[field][0];
            } else if (field === 'non_field_errors' || field === 'detail' || field === 'message') {
                // 특정 필드에 해당하지 않는 일반 오류 메시지 처리
                this.showGlobalErrorMessage(errorData[field][0] || errorData[field]);
            }
        }
        // 모든 성공 메시지 숨김
        this.clearSuccessMessages(successMessages);
    }

    // 특정 성공 메시지 요소의 ID를 가져오기 위한 헬퍼 (예: userId -> username)
    getSuccessKey(inputId) {
        if (inputId === 'userId' || inputId === 'sellerUserId') return 'username';
        return inputId;
    }

    // 특정 경고 메시지 요소의 ID를 가져오기 위한 헬퍼 (예: userId -> username)
    getWarningKey(inputId) {
        if (inputId === 'userId' || inputId === 'sellerUserId') return 'username';
        if (inputId === 'password' || inputId === 'sellerPassword') return 'password';
        if (inputId === 'passwordConfirm' || inputId === 'sellerPasswordConfirm') return 'passwordConfirm';
        if (inputId === 'name' || inputId === 'sellerName') return 'name';
        if (inputId.startsWith('phone')) return 'phoneNumber'; // 전화번호는 묶어서 처리
        if (inputId === 'termsAgree' || inputId === 'sellerTermsAgree') return 'termsAgree';
        if (inputId === 'businessNumber') return 'businessNumber';
        if (inputId === 'storeName') return 'storeName';
        return inputId; // 매핑되지 않으면 그대로 반환
    }

    // 특정 폼의 성공 메시지를 숨기는 헬퍼 (초기화 또는 다른 메시지 표시 시 사용)
    clearSuccessMessages(successElements) {
        for (const key in successElements) {
            if (successElements[key] && !successElements[key].classList.contains('hidden')) {
                successElements[key].classList.add('hidden');
            }
        }
    }


    // 전역 성공 메시지를 표시하는 헬퍼 (예: 폼 상단에)
    showGlobalSuccessMessage(message) {
        let globalMessageContainer = document.getElementById('globalMessageContainer');
        if (!globalMessageContainer) {
            globalMessageContainer = document.createElement('div');
            globalMessageContainer.id = 'globalMessageContainer';
            globalMessageContainer.className = 'global-message success-message'; // CSS 클래스
            // 폼 컨테이너 바로 아래에 추가
            const formContainer = document.querySelector('.form-container');
            if (formContainer) {
                formContainer.parentNode.insertBefore(globalMessageContainer, formContainer.nextSibling);
            }
        }
        globalMessageContainer.textContent = message;
        globalMessageContainer.classList.remove('hidden'); // 보이게 처리
        globalMessageContainer.classList.remove('error-message'); // 오류 메시지 클래스 제거
        globalMessageContainer.classList.add('success-message'); // 성공 메시지 클래스 추가

        setTimeout(() => {
            this.clearAllWarningsAndSuccessMessages();
        }, 3000);
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

    /**
     * 📝 회원가입 버튼 클릭 처리
     */
    handleRegisterClick(event) {
        console.log('📝 회원가입 버튼 클릭');
        console.log('현재 선택된 탭:', this.currentTab);

        // 폼 데이터 수집
        const formData = this.getFormData();

        if (this.validateForm(formData)) {
            // 서버로 전송할 때 현재 탭 정보 포함
            const registerData = {
                ...formData,
                userType: this.currentTab, // 'buyer' 또는 'seller'
                login_type: this.currentTab.toUpperCase() // 'BUYER' 또는 'SELLER'
            };

            console.log('📤 서버로 전송할 데이터:', registerData);

            // 실제 API 호출
            this.performRegister(registerData);
        }
    }

    /**
     * 📊 폼 데이터 수집
     */
    getFormData() {
        return {
            username: document.querySelector('#username')?.value?.trim() || '',
            email: document.querySelector('#email')?.value?.trim() || '',
            password: document.querySelector('#password')?.value?.trim() || '',
            passwordConfirm: document.querySelector('#passwordConfirm')?.value?.trim() || '',
        };
    }

    /**
     * ✅ 폼 유효성 검사
     */
    validateForm(formData) {
        let isValid = true;

        // 간단한 유효성 검사 예시
        if (!formData.username) {
            this.showError('아이디를 입력해주세요.');
            isValid = false;
        }

        if (!formData.email) {
            this.showError('이메일을 입력해주세요.');
            isValid = false;
        }

        if (!formData.password) {
            this.showError('비밀번호를 입력해주세요.');
            isValid = false;
        }

        if (formData.password !== formData.passwordConfirm) {
            this.showError('비밀번호가 일치하지 않습니다.');
            isValid = false;
        }

        return isValid;
    }

    /**
     * 📡 실제 회원가입 API 호출
     */
    async performRegister(registerData) {
        try {
            console.log('📡 회원가입 API 요청 시작...');

            // API 엔드포인트는 실제 명세에 맞게 수정
            const response = await fetch('https://api.wenivops.co.kr/services/open-market/accounts/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('✅ 회원가입 성공:', data);

                alert(`${registerData.userType === 'buyer' ? '구매회원' : '판매회원'} 가입이 완료되었습니다!`);

                // 로그인 페이지로 이동
                setTimeout(() => {
                    window.router.navigateTo('/login');
                }, 1000);

            } else {
                const errorData = await response.json();
                console.log('❌ 회원가입 실패:', errorData);
                this.showError('회원가입에 실패했습니다.');
            }

        } catch (error) {
            console.error('❌ API 요청 오류:', error);
            this.showError('네트워크 오류가 발생했습니다.');
        }
    }

    /**
     * 🔄 탭 변경 시 추가 동작
     */
    onTabChanged(newTabType) {
        // 탭 변경 시 추가로 필요한 동작이 있다면 여기에 구현

        // 예시: 탭에 따라 폼 필드 변경
        const formTitle = document.querySelector('.form-title');
        if (formTitle) {
            formTitle.textContent = newTabType === 'buyer' ? '구매회원 가입' : '판매회원 가입';
        }

        // 예시: 탭에 따라 특정 필드 표시/숨김
        // const businessFields = document.querySelectorAll('.business-field');
        // businessFields.forEach(field => {
        //     field.style.display = newTabType === 'seller' ? 'block' : 'none';
        // });
    }

    /**
     * 🧹 폼 초기화
     */
    clearForm() {
        const form = document.querySelector('.register-form');
        if (form) {
            form.reset();
        }

        // 오류 메시지 제거
        const errorMessages = document.querySelectorAll('.field-error');
        errorMessages.forEach(msg => msg.remove());
    }

    /**
     * 🚨 에러 메시지 표시
     */
    showError(message) {
        // 간단한 에러 표시 (나중에 토스트 메시지로 개선 가능)
        alert(message);
    }



}

export default RegisterPage; 