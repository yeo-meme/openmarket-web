import { registerPageTemplate } from '../../templates/register.html.js'
import { registerPageStyles } from '../../styles/register.css.js';
import { styleManager } from '../utils/CSSManager.js';


class RegisterPage {

    constructor() {
        this.pageTitle = "HODU - 로그인";
        this.currentTab = 'buyer'; // 'buyer' 또는 'seller'
        this.styleId = 'register-page-styles';
        this.apiBaseUrl = 'https://api.wenivops.co.kr/services/open-market';


        this.fieldsState = {
            username: { isValid: false, message: '', lastChecked: null },
            password: { isValid: false, message: '', lastChecked: null },
            passwordConfirm: { isValid: false, message: '', lastChecked: null },
            name: { isValid: false, message: '', lastChecked: null },
            phone: { isValid: false, message: '', lastChecked: null },
            terms: { isValid: false, message: '', lastChecked: null }
        };

    }


    render() {
        const page = document.createElement('main');
        page.className = 'register-page';
        page.innerHTML = registerPageTemplate();

        this.loadStyles();

        page.addEventListener('click',
            this.handlePageClick.bind(this));

        page.addEventListener('input',
            this.handleInputChangeAll.bind(this));

        return page;
    }



    /**
   * 🔥살려 입력 필드 변경 시 실시간 검증
   */
    handleInputChangeAll(e) {
        const fieldId = e.target.id;        // 이벤트가 발생한 요소의 ID
        const fieldType = e.target.type;    // input 타입 (text, password, etc.)
        const tagName = e.target.tagName;   // HTML 태그명


        console.log(`what!!1! ${fieldId} ,tagName : ${tagName}`);
        // input/textarea가 아니면 무시
        // if (tagName !== 'input' && tagName !== 'textarea') {
        //     return;
        // }

        switch (fieldId) {
            case 'username':
                this.validateUsernameField();
                break;
            case 'password-input':
                this.passwordInputChange();
                break;
            case 'buyer-password-confirm':
                this.validatePasswordConfirmField();
                break;
            case 'buyer-name':
                this.validateNameField();
                break;
            case 'phone-input': // 실제 ID에 맞게 조정
                this.validatePhoneField();
                break;
        }

        this.logFieldStates();
    }

    /**
   *🔥살려 아이디 필드 실시간 검증 (중복확인 제외)
   */
    validateUsernameField() {
        const username = document.getElementById('username').value.trim();
        let result = { isValid: true, message: '' };

        if (!username) {
            result = { isValid: false, message: '아이디를 입력해주세요.' };
        } else if (username.length < 3 || username.length > 20) {
            result = { isValid: false, message: 'ID는 3~20자여야 합니다.' };
        } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
            result = { isValid: false, message: 'ID는 영어, 숫자만 가능합니다.' };
        } else {
            result = { isValid: true, message: '✓ 사용 가능한 형식입니다. (중복확인 필요)' };
        }

        this.updateFieldState('username', result);
        this.showFieldMessage('buyer-id-message', result);
    }

    /**
    * 🔥살려필드 메시지 표시
    */
    showFieldMessage(messageDivId, result) {

        const messageDiv = document.getElementById(messageDivId);
        console.log(`messageDiv:${messageDiv.id} `);
        console.log(`messageDiv:${messageDiv} `);

        // const messageDiv = document.getElementById(messageElementId);
        if (!messageDiv) {
            console.error('❌ message 요소를 찾을 수 없습니다');
            return;
        }

        const messageText = messageDiv.querySelector('.message-text') || messageDiv;

        if (!messageText) {
            console.error('❌ messageText 요소를 찾을 수 없습니다');
            return;
        }
        messageText.textContent = result.message;

        console.error(`re eeeee ${result.message}`);
        messageDiv.classList.remove('hidden');
        messageDiv.classList.add('visible');
        messageDiv.style.color = result.isValid ? 'green' : 'red';
    }


    /**
    * 🔥살려 이름 필드 실시간 검증
    */
    validateNameField() {
        const name = document.getElementById('buyer-name').value.trim();
        let result = { isValid: true, message: '' };

        if (!name) {
            result = { isValid: false, message: '이름을 입력해주세요.' };
        } else if (name.length < 2) {
            result = { isValid: false, message: '이름은 2자 이상 입력해주세요.' };
        } else if (!/^[가-힣a-zA-Z\s]+$/.test(name)) {
            result = { isValid: false, message: '이름은 한글, 영어만 입력 가능합니다.' };
        } else {
            result = { isValid: true, message: '✓ 올바른 이름입니다.' };
        }

        this.updateFieldState('name', result);
        this.showFieldMessage('name-message', result);
    }

    /**
     * 🔥살려 휴대폰 번호 실시간 검증
     */
    validatePhoneField() {
        const phoneResult = this.validatePhoneNumber();

        this.updateFieldState('phone', phoneResult);
        this.showFieldMessage('phone-message', phoneResult);
    }

    /**
     * 약관 동의 실시간 검증
     */


    validateTermsField() {
        const termsAgree = document.getElementById('termsAgree').checked;
        const result = {
            isValid: termsAgree,
            message: termsAgree ? '✓ 약관에 동의하셨습니다.' : '이용약관 및 개인정보처리방침에 동의해주세요.'
        };
        
        this.updateFieldState('terms', result);
        return result; 
    }


    /**
     * 🔥살려비밀번호 확인 필드 실시간 검증
     */
    validatePasswordConfirmField() {
        const password = document.getElementById('password-input').value;
        const passwordConfirm = document.getElementById('buyer-password-confirm').value;
        let result = { isValid: true, message: '' };

        if (!passwordConfirm) {
            result = { isValid: false, message: '비밀번호 확인을 입력해주세요.' };
        } else if (password !== passwordConfirm) {
            result = { isValid: false, message: '비밀번호가 일치하지 않습니다.' };
        } else {
            result = { isValid: true, message: '✓ 비밀번호가 일치합니다.' };
        }

        this.updateFieldState('passwordConfirm', result);
        this.showFieldMessage('re-password-message', result);
    }
    /**
       * 체크박스 검증보류!!!~
       */
    handleChangeEvent(e) {
        const fieldId = e.target.id;

        if (fieldId === 'termsAgree') {
            this.validateTermsField();
        }

        this.logFieldStates();
    }


    //🔥살려 패스워드 상세 체크 -- 전필드를 상시체크하고 플래그 값을 받아서 서브밋때 안된건 리젝 포스트전송도 
    passwordInputChange() {

        const passwordInput = document.getElementById('password-input');
        const messageDiv = document.getElementById('password-message');
        console.log(`passwordInputChange in!!!! ,: ${passwordInput.id}`);
        if (!passwordInput) {
            console.error('❌ password-input 요소를 찾을 수 없습니다');
            return;
        }

        if (!messageDiv) {
            console.error('❌ password-message 요소를 찾을 수 없습니다');
            return;
        }

        console.log('✅ DOM 요소들이 정상적으로 발견됨');
        console.log('messageDiv 현재 클래스:', messageDiv.className);
        console.log('messageDiv 현재 스타일:', messageDiv.style.cssText);


        const messageText = messageDiv.querySelector('.message-text');

        const password = passwordInput.value;

        if (!password) {
            console.log('📝 패스워드가 비어있음 - 상태 초기화');
            
            // 🔥 빈 패스워드일 때도 전역 상태 업데이트 (중요!)
            const emptyResult = {
                isValid: false,
                message: '비밀번호를 입력해주세요.'
            };
            
            this.updateFieldState('password', emptyResult);
            
            // UI 숨김
            messageDiv.classList.add('hidden');
            messageDiv.classList.remove('visible');
            
            console.log('📊 빈 패스워드 상태 업데이트:', this.fieldsState.password);
            return;
        }

        const result = this.validatePassword(password);

        this.updateFieldState('password', result);
        this.showFieldMessage(messageDiv.id, result);
    }

    /**
  * 필드 상태 업데이트
  */
    updateFieldState(fieldName, result) {
        this.fieldsState[fieldName] = {
            isValid: result.isValid,
            message: result.message,
            lastChecked: new Date()
        };
    }
    /**
        * 모든 필드 상태 로깅
        */
    /**=
  * @returns {{[key in FieldName]: '✅'|'❌'}}
  */
    logFieldStates() {
        console.log('📊 실시간 필드 상태:', {
            username: this.fieldsState.username.isValid ? '✅' : '❌',
            password: this.fieldsState.password.isValid ? '✅' : '❌',
            passwordConfirm: this.fieldsState.passwordConfirm.isValid ? '✅' : '❌',
            name: this.fieldsState.name.isValid ? '✅' : '❌',
            phone: this.fieldsState.phone.isValid ? '✅' : '❌',
            terms: this.fieldsState.terms.isValid ? '✅' : '❌'
        });
    }



    /**
         * 서브밋 시 전체 검증
         */
    async handleFormSubmit(e) {
        console.log('📋 폼 서브밋 시도 - 전체 필드 상태 체크');

        // 모든 필드 최종 검증
        const isAllValid = this.checkAllFieldsValid();

        if (!isAllValid) {
            e.preventDefault(); // 폼 서브밋 차단

            console.error('❌ 서브밋 실패: 유효하지 않은 필드가 있습니다');
            console.error('필드별 상태:', this.fieldsState);

            // 첫 번째 유효하지 않은 필드로 포커스 이동
            this.focusFirstInvalidField();

            alert('입력 정보를 다시 확인해주세요.');
            return false;
        }

        console.log('✅ 모든 필드 검증 통과 - 서브밋 허용');
        console.log('검증된 필드 상태:', this.fieldsState);
        return true;
    }

    /**
     * 모든 필드 유효성 확인
     */
    checkAllFieldsValid() {
        const fields = Object.keys(this.fieldsState);
        return fields.every(field => this.fieldsState[field].isValid);
    }


    loadStyles() {
        styleManager.loadStyle(this.styleId, registerPageStyles);
    }

    unloadStyles() {
        styleManager.unloadStyle(this.styleId);
    }


    /**
    클릭
     */
    async handlePageClick(event) {
        const target = event.target;
        console.log('🖱️ 클릭 이벤트 발생:',
            {
                className: target.className,
                id: target.id,
                dataset: target.dataset
            });

        if (target.classList.contains('tab-btn')) {
            event.preventDefault();
            this.handleTabClick(target);
        }

        if (target.classList.contains('verify-btn')) {
            event.preventDefault();
            await this.handleIdCheck(); // 중복확인
            return;
        }

        if (target.classList.contains('signup-btn')) {
            event.preventDefault();
            await this.validateAllFields33();
            return;
        }
    }


    async validateAllFields33() {

        const termsResult = this.validateTermsField();

        if (!termsResult.isValid) {
            alert('❌ 이용약관 및 개인정보처리방침에 동의해주세요!');
            return; 
        }

        if (this.checkAllValid()) {
            console.log('✅ 모든 필드 검증 통과 - 회원가입 진행');
        } else {
            console.log('❌ 일부 필드가 유효하지 않음 - 회원가입 차단');
        }
    }

    async checkAllValid() {
        const allValid = Object.values(this.fieldsState).every(field => field.isValid);
        console.log(`전체 필드 유효성: ${allValid ? '✅' : '❌'}`);
        return allValid;
    }
    
    /**
     * 뉴비
     */
    async validateAllFields22() {
        console.log('🔥 회원가입 버튼 클릭 - 전체 검증 시작');
    
        // 전체 필드 검증 실행 및 결과 확인
        const isAllValid = await this.validateAllFields();
        
        console.log('📊 전체 검증 결과:', isAllValid);
        console.log('📊 현재 필드 상태:', this.fieldsState);
        
        if (isAllValid) {
            console.log('✅ 모든 필드 검증 통과 - 회원가입 진행');
            // 실제 회원가입 처리
            // await this.submitRegistration();
        } else {
            console.log('❌ 일부 필드가 유효하지 않음 - 회원가입 차단');
            
            // 유효하지 않은 필드들 찾기
            const invalidFields = this.getInvalidFields();
            console.log('유효하지 않은 필드들:', invalidFields);
            
            // 사용자에게 알림
            alert(`다음 항목을 확인해주세요:\n${invalidFields.join(', ')}`);
            
            // 첫 번째 유효하지 않은 필드로 포커스 이동
            // this.focusFirstInvalidField();
        }
    }

    // ✅ 유효하지 않은 필드 목록 반환 헬퍼 함수
getInvalidFields() {
    const fieldNames = {
        username: '아이디',
        password: '비밀번호',
        passwordConfirm: '비밀번호 확인',
        name: '이름',
        phone: '휴대폰',
        terms: '약관동의'
    };
    
    return Object.keys(this.fieldsState)
        .filter(field => !this.fieldsState[field]?.isValid)
        .map(field => fieldNames[field] || field);
}

    /**
     * 📋 모든 필드 유효성 검사
     */
    async validateAllFields() {
        console.log('📋 회원가입 버튼 클릭 - 전체 검증 시작');

        let isValid = true;
        const errors = [];

        // 1. 아이디 검증
        const username = document.getElementById('username').value.trim();
        if (!username) {
            this.showFieldError('buyer-id-message', '아이디를 입력해주세요.');
            isValid = false;
        } else if (username.length < 3 || username.length > 20 || !/^[a-zA-Z0-9]+$/.test(username)) {
            this.showFieldError('buyer-id-message', 'ID는 3~20자의 영어, 숫자만 가능합니다.');
            isValid = false;
        } else {
            // 아이디 중복확인 (필수)
            const duplicateCheck = await this.checkUsernameDuplicate(username);
            if (!duplicateCheck.success) {
                this.showFieldError('buyer-id-message', duplicateCheck.message);
                isValid = false;
            }
        }

        // 2. 비밀번호 검증
        const password = document.getElementById('password-input').value;
        const passwordValidation = this.validatePassword(password);
        if (!passwordValidation.isValid) {
            this.showFieldError('password-message', passwordValidation.message);
            isValid = false;
        }

        // 3. 비밀번호 확인 검증
        const passwordConfirm = document.getElementById('buyer-password-confirm').value;
        if (!passwordConfirm) {
            this.showFieldError('re-password-message', '비밀번호 확인을 입력해주세요.');
            isValid = false;
        } else if (password !== passwordConfirm) {
            this.showFieldError('re-password-message', '비밀번호가 일치하지 않습니다.');
            isValid = false;
        }

        // 4. 이름 검증
        const name = document.getElementById('buyer-name').value.trim();
        if (!name) {
            this.showFieldError('name-message', '이름을 입력해주세요.');
            isValid = false;
        }

        // 5. 휴대폰 번호 검증
        const phoneResult = this.validatePhoneNumber();
        if (!phoneResult.isValid) {
            this.showFieldError('phone-message', phoneResult.message);
            isValid = false;
        }

        // 6. 약관 동의 검증
        const termsAgree = document.getElementById('termsAgree').checked;
        if (!termsAgree) {
            this.showTermsError('이용약관 및 개인정보처리방침에 동의해주세요.');
            isValid = false;
        }

        console.log(`📋 전체 검증 결과: ${isValid ? '✅ 통과' : '❌ 실패'}`);
        return isValid;
    }

    /**
     * 🔐 비밀번호 검증
     */
    validatePassword(password) {
        if (!password) {
            return {
                isValid: false,
                message: '비밀번호를 입력해주세요.'
            };
        }
    
        const checks = {
            length: password.length >= 8,
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            noSpaces: !/\s/.test(password)
        };
    
        const needed = [];
    
        if (!checks.length) {
            needed.push('8자 이상');
        }
        if (!checks.lowercase) {
            needed.push('영소문자');
        }
        if (!checks.number) {
            needed.push('숫자');
        }
        if (!checks.noSpaces) {
            needed.push('공백 제거');
        }
    
        // ✅ 올바른 반환값
        return {
            isValid: needed.length === 0,
            message: needed.length === 0 ? 
                '✓ 안전한 비밀번호입니다!' : 
                `${needed.join(', ')} 필요`
        };
    }

    /**
     * 📱 휴대폰 번호 검증
     */
    validatePhoneNumber() {
        const phoneSelect = document.querySelector('.phone-select').value;
        const phoneInput = document.querySelector('.phone-input').value.trim();

        if (!phoneInput) {
            return {
                isValid: false,
                message: '휴대폰 번호를 입력해주세요.'
            };
        }

        // 010으로 시작하는 10~11자리 숫자 체크
        const fullPhoneNumber = phoneSelect + phoneInput;

        if (!/^010\d{8}$/.test(fullPhoneNumber) && !/^010\d{7}$/.test(fullPhoneNumber)) {
            return {
                isValid: false,
                message: '010으로 시작하는 10~11자리 숫자를 입력해주세요.'
            };
        }

        return {
            isValid: true,
            phoneNumber: fullPhoneNumber
        };
    }

    /**
     * 🔍 아이디 중복확인
     */
    async checkUsernameDuplicate(username) {
        try {
            console.log('🔍 아이디 중복확인:', username);

            const response = await fetch(`${this.apiBaseUrl}/accounts/validate-username/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username })
            });

            if (response.ok) {
                const data = await response.json();

                if (data.message) {
                    return {
                        success: true,
                        message: '✓ 사용 가능한 아이디입니다.'
                    };
                } else if (data.error) {
                    return {
                        success: false,
                        message: data.error
                    };
                }
            } else {
                return {
                    success: false,
                    message: '아이디 확인 중 오류가 발생했습니다.'
                };
            }

        } catch (error) {
            console.error('❌ 아이디 중복확인 오류:', error);
            return {
                success: false,
                message: '네트워크 오류가 발생했습니다.'
            };
        }
    }

    /**
     * 📤 회원가입 API 요청
     */
    async submitSignup() {
        console.log('📤 회원가입 API 요청 시작');


        // 패스워드가 유효하지 않으면 서브밋 차단
        if (!this.passwordState.isValid) {
            e.preventDefault(); // 폼 서브밋 차단

            // 유효하지 않은 경우 로그 및 알림
            console.error('❌ 서브밋 실패: 패스워드가 유효하지 않습니다');
            console.error('패스워드 상태:', {
                isValid: this.passwordState.isValid,
                message: this.passwordState.message,
                lastChecked: this.passwordState.lastChecked
            });

            // 사용자에게 알림
            alert('패스워드가 유효하지 않습니다. 패스워드 요구사항을 확인해주세요.');

            // 패스워드 입력 필드에 포커스
            const passwordInput = document.getElementById('password-input');
            if (passwordInput) {
                passwordInput.focus();
            }

            return false;
        }

        // 폼 데이터 수집
        // const formData = this.collectFormData();

        // try {
        //     // 로딩 상태 표시
        //     this.setSubmitButtonLoading(true);

        //     const endpoint = this.currentTab === 'buyer' 
        //         ? `${this.apiBaseUrl}/accounts/buyer/signup/`
        //         : `${this.apiBaseUrl}/accounts/seller/signup/`;

        //     console.log('📡 API 요청:', endpoint, formData);

        //     const response = await fetch(endpoint, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(formData)
        //     });

        //     console.log('📡 응답 상태:', response.status);

        //     if (response.ok) {
        //         const data = await response.json();
        //         console.log('✅ 회원가입 성공:', data);

        //         // 성공 메시지
        //         this.showSuccessMessage('회원가입이 완료되었습니다!');

        //         // 2초 후 로그인 페이지로 이동
        //         setTimeout(() => {
        //             window.router.navigateTo('/login');
        //         }, 2000);

        //     } else {
        //         const errorData = await response.json();
        //         console.error('❌ 회원가입 실패:', errorData);

        //         // 서버 에러 처리
        //         this.handleApiErrors(errorData);
        //     }

        // } catch (error) {
        //     console.error('❌ 회원가입 API 오류:', error);
        //     this.showErrorMessage('네트워크 오류가 발생했습니다.');

        // } finally {
        //     this.setSubmitButtonLoading(false);
        // }
    }

    /**
     * 📊 폼 데이터 수집
     */
    collectFormData() {
        const phoneResult = this.validatePhoneNumber();

        return {
            username: document.getElementById('username').value.trim(),
            password: document.getElementById('password-input').value,
            name: document.getElementById('buyer-name').value.trim(),
            phone_number: phoneResult.phoneNumber,
            user_type: this.currentTab.toUpperCase() // BUYER 또는 SELLER
        };
    }

    /**
     * 🚨 API 에러 처리
     */
    handleApiErrors(errorData) {
        console.log('🚨 API 에러 처리:', errorData);

        // 필드별 에러 메시지 표시
        if (errorData.username) {
            this.showFieldError('buyer-id-message', errorData.username[0]);
        }
        if (errorData.password) {
            this.showFieldError('password-message', errorData.password[0]);
        }
        if (errorData.name) {
            this.showNameError('re-password-message', errorData.name[0]);
        }
        if (errorData.phone_number) {
            this.showPhoneError('phone-message', errorData.phone_number[0]);
        }

        // 일반 에러 메시지
        if (errorData.detail) {
            this.showErrorMessage('terms-message', errorData.detail);
        } else if (errorData.non_field_errors) {
            this.showErrorMessage('terms-message', errorData.non_field_errors[0]);
        } else {
            this.showErrorMessage('terms-message', '회원가입 중 오류가 발생했습니다.');
        }
    }

    /**
     * 💡 메시지 표시 함수들
     */
    showFieldError(messageId, message) {
        const messageContainer = document.getElementById(messageId);
        const messageText = messageContainer.querySelector('.message-text');

        messageText.textContent = message;
        messageContainer.classList.remove('hidden');
        messageContainer.classList.add('visible');
        messageContainer.style.color = 'red';

        console.log(`❌ ${messageId}: ${message}`);
    }

    // showNameError(message) {
    //     // 이름 필드에 에러 메시지 표시 (DOM에 메시지 요소 추가 필요)
    //     console.log(`❌ 이름 오류: ${message}`);
    //     alert(`이름 오류: ${message}`); // 임시로 alert 사용
    // }

    // showPhoneError(message) {
    //     // 휴대폰 필드에 에러 메시지 표시 (DOM에 메시지 요소 추가 필요)
    //     console.log(`❌ 휴대폰 오류: ${message}`);
    //     alert(`휴대폰 오류: ${message}`); // 임시로 alert 사용
    // }

    showTermsError(message) {
        const warningElement = document.getElementById('termsAgreeWarning');
        if (warningElement) {
            warningElement.textContent = message;
            warningElement.style.color = 'red';
            warningElement.style.display = 'block';
        }
        console.log(`❌ 약관 오류: ${message}`);
    }

    /**
     * ⏳ 제출 버튼 로딩 상태
     */
    setSubmitButtonLoading(isLoading) {
        const submitBtn = document.querySelector('.signup-btn');

        if (isLoading) {
            submitBtn.disabled = true;
            submitBtn.textContent = '가입 중...';
            submitBtn.style.opacity = '0.7';
        } else {
            submitBtn.disabled = false;
            submitBtn.textContent = '가입하기';
            submitBtn.style.opacity = '1';
        }
    }

    /**
     * 🎉 성공/에러 메시지
     */
    showSuccessMessage(message) {
        alert(`✅ ${message}`); // 실제로는 토스트 메시지로 교체
        console.log(`✅ ${message}`);
    }

    showErrorMessage(message) {
        alert(`❌ ${message}`); // 실제로는 토스트 메시지로 교체
        console.log(`❌ ${message}`);
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
                this.showMessage(errorText, 'error');

                console.log('❌ ID 중복확인 실패:', errorText);
            }

        } catch (error) {
            // 🚨 네트워크 오류
            console.error('❌ ID 중복확인 API 오류:', error);

            this.hideMessage(loadingMessage);
            this.showMessage('네트워크 오류가 발생했습니다.', 'error');

        } finally {
            // 5. 로딩 상태 해제
            this.setButtonLoading(button, false);
        }
    }


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


    // validateAndSubmitForm() {
    //     const buyerSignupForm = document.getElementById('buyerSignupForm');
    //     const sellerSignupForm = document.getElementById('sellerSignupForm');

    //     // 구매자 폼 요소
    //     const buyerInputs = {
    //         username: document.getElementById('userId'),
    //         password: document.getElementById('password'),
    //         passwordConfirm: document.getElementById('passwordConfirm'),
    //         name: document.getElementById('name'),
    //         phonePrefix: document.getElementById('phonePrefix'),
    //         phoneMiddle: document.getElementById('phoneMiddle'),
    //         phoneLast: document.getElementById('phoneLast'),
    //         termsAgree: document.getElementById('termsAgree')
    //     };
    //     const buyerWarnings = {
    //         username: document.getElementById('userIdWarning'),
    //         password: document.getElementById('passwordWarning'),
    //         passwordConfirm: document.getElementById('passwordConfirmWarning'),
    //         name: document.getElementById('nameWarning'),
    //         phoneNumber: document.getElementById('phoneNumberWarning'),
    //         termsAgree: document.getElementById('termsAgreeWarning')
    //     };
    //     const buyerSuccess = {
    //         username: document.getElementById('userIdSuccess')
    //     };
    //     const checkUserIdBtn = document.getElementById('checkUserId');

    //     // 판매자 폼 요소 (판매자 폼이 활성화될 때 가져와야 함)
    //     let sellerInputs = {};
    //     let sellerWarnings = {};
    //     let sellerSuccess = {};
    //     let checkSellerUserIdBtn = null;

    //     let currentActiveForm = 'buyer'; // 현재 활성화된 폼 추적

    //     const baseUrl = 'https://api.wenivops.co.kr';
    //     const buyerSignupEndpoint = `${baseUrl}/accounts/buyer/signup/`;
    //     const sellerSignupEndpoint = `${baseUrl}/accounts/seller/signup/`; // 판매자 회원가입 엔드포인트 (가정)
    //     const checkIdEndpoint = `${baseUrl}/accounts/check-id/`; // ID 중복확인 엔드포인트 (가정)





    //     // --- 구매자 폼 제출 로직 ---
    //     buyerSignupForm.addEventListener('submit', async (event) => {
    //         event.preventDefault();
    //         this.clearWarnings(buyerWarnings); // 구매자 폼 경고만 초기화
    //         this.clearSuccessMessages(buyerSuccess); // 구매자 폼 성공 메시지 초기화

    //         const username = buyerInputs.username.value.trim();
    //         const password = buyerInputs.password.value.trim();
    //         const passwordConfirm = buyerInputs.passwordConfirm.value.trim();
    //         const name = buyerInputs.name.value.trim();
    //         const phoneNumber = buyerInputs.phonePrefix.value + buyerInputs.phoneMiddle.value.trim() + buyerInputs.phoneLast.value.trim();
    //         const termsAgreed = buyerInputs.termsAgree.checked;

    //         let isValid = true;

    //         // 1. 모든 필드는 필수로 작성해야 합니다.
    //         if (!username) { buyerWarnings.username.textContent = '아이디를 입력해주세요.'; isValid = false; }
    //         if (!password) { buyerWarnings.password.textContent = '비밀번호를 입력해주세요.'; isValid = false; }
    //         if (!passwordConfirm) { buyerWarnings.passwordConfirm.textContent = '비밀번호 재확인을 입력해주세요.'; isValid = false; }
    //         if (!name) { buyerWarnings.name.textContent = '이름을 입력해주세요.'; isValid = false; }
    //         if (!phoneNumber.length === 0) { buyerWarnings.phoneNumber.textContent = '휴대폰 번호를 입력해주세요.'; isValid = false; }
    //         if (!termsAgreed) { buyerWarnings.termsAgree.textContent = '이용약관 및 개인정보처리방침에 동의해야 합니다.'; isValid = false; }

    //         // 2. 비밀번호 재확인 일치
    //         if (password && passwordConfirm && password !== passwordConfirm) {
    //             buyerWarnings.passwordConfirm.textContent = '비밀번호가 일치하지 않습니다.';
    //             isValid = false;
    //         }

    //         // 3. 비밀번호 유효성 (8자 이상, 영소문자, 숫자 포함)
    //         if (password) {
    //             if (password.length < 8) {
    //                 buyerWarnings.password.textContent = '비밀번호는 8자 이상이어야 합니다.';
    //                 isValid = false;
    //             } else if (!/[a-z]/.test(password)) {
    //                 buyerWarnings.password.textContent = '비밀번호는 한 개 이상의 영소문자를 포함해야 합니다.';
    //                 isValid = false;
    //             } else if (!/[0-9]/.test(password)) {
    //                 buyerWarnings.password.textContent = '비밀번호는 한 개 이상의 숫자를 포함해야 합니다.';
    //                 isValid = false;
    //             }
    //         }

    //         // 4. 아이디 유효성 (20자 이내, 영문/숫자만)
    //         if (username && (username.length > 20 || !/^[a-zA-Z0-9]+$/.test(username))) {
    //             buyerWarnings.username.textContent = 'ID는 20자 이내의 영어 소문자, 대문자, 숫자만 가능합니다.';
    //             isValid = false;
    //         }

    //         // 5. 휴대폰 번호 유효성 (010으로 시작하는 10~11자리 숫자)
    //         if (phoneNumber && !/^010[0-9]{7,8}$/.test(phoneNumber)) {
    //             buyerWarnings.phoneNumber.textContent = '핸드폰번호는 010으로 시작하는 10~11자리 숫자여야 합니다.';
    //             isValid = false;
    //         }

    //         // 6. ID 중복확인 여부 (API 요청 전에 필수적으로 확인)
    //         // if (!isBuyerIdChecked) {
    //         //     buyerWarnings.username.textContent = '아이디 중복확인을 해주세요.';
    //         //     isValid = false;
    //         // }

    //         if (!isValid) {
    //             console.log('클라이언트 측 유효성 검사 실패');
    //             return;
    //         }

    //         // --- API 요청 전 최종 데이터 확인 ---
    //         console.log('구매자 회원가입 요청 데이터:', { username, password, name, phone_number: phoneNumber, user_type: "BUYER" });

    //         try {
    //             const response = await fetch(buyerSignupEndpoint, {
    //                 method: 'POST',
    //                 headers: { 'Content-Type': 'application/json' },
    //                 body: JSON.stringify({
    //                     username: username,
    //                     password: password,
    //                     name: name,
    //                     phone_number: phoneNumber,
    //                     user_type: "BUYER"
    //                 })
    //             });

    //             if (!response.ok) {
    //                 const errorData = await response.json();
    //                 console.error('구매자 회원가입 API 응답 오류:', errorData);

    //                 this.displayApiErrors(errorData, buyerWarnings, buyerSuccess);
    //                 return;
    //             }

    //             const successData = await response.json();
    //             console.log('구매자 회원가입 성공:', successData);
    //             this.showGlobalSuccessMessage('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');

    //             // 회원가입 성공 후 로그인 페이지로 이동 (라우터 사용 권장)
    //             setTimeout(() => {
    //                 if (this.router) {
    //                     this.router.navigateTo('/login');
    //                 } else {
    //                     window.location.href = '/login';
    //                 }
    //             }, 2000);

    //         } catch (error) {
    //             console.error('구매자 회원가입 API 요청 중 치명적인 오류 발생:', error);
    //             this.showGlobalErrorMessage('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    //         }
    //     });
    // }

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