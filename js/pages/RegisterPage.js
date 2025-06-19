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
            username: { isValid: false, message: '', value: '' },
            password: { isValid: false, message: '', value: '' },
            passwordConfirm: { isValid: false, message: '', value: '' },
            name: { isValid: false, message: '', value: '' },
            phone: { isValid: false, message: '', value: '' },
            terms: { isValid: false, message: '', value: false },
            idDupl: { isValid: false, message: '', value: '' },
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


    // ✅ updateFieldState 함수 수정 (value 저장 추가)
    updateFieldState(fieldName, result, inputValue = null) {
        this.fieldsState[fieldName] = {
            isValid: result.isValid,
            message: result.message,
            value: inputValue !== null ? inputValue : (this.fieldsState[fieldName]?.value || '')
        };

        console.log(`📝 ${fieldName} 상태 업데이트:`, this.fieldsState[fieldName]);
    }

    /**
   *  입력 필드 변경 시 실시간 검증
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
   * 아이디 필드 실시간 검증 (중복확인 제외)
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

        this.updateFieldState('username', result, username);
        this.showFieldMessage('buyer-id-message', result);

        if (this.fieldsState.idDupl) {
            this.fieldsState.idDupl = {
                isValid: false,
                message: '중복확인이 필요합니다.',
                lastChecked: null
            };
            console.log('🔄 아이디 변경으로 인한 중복확인 상태 초기화');
        }

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
    *  이름 필드 실시간 검증
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

        this.updateFieldState('name', result, name);
        this.showFieldMessage('name-message', result);
    }

    /**
     *  휴대폰 번호 실시간 검증
     */
    validatePhoneField() {
        const phoneResult = this.validatePhoneNumber33();

        this.updateFieldState('phone', phoneResult, phoneResult.value || '');
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

        this.updateFieldState('passwordConfirm', result, passwordConfirm);
        this.showFieldMessage('re-password-message', result);
    }



    // 패스워드 상세 체크 -- 전필드를 상시체크하고 플래그 값을 받아서 서브밋때 안된건 리젝 포스트전송도 
    passwordInputChange() {

        const passwordInput = document.getElementById('password-input');
        const messageDiv = document.getElementById('password-message');

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

        this.updateFieldState('password', result, password);
        this.showFieldMessage(messageDiv.id, result);
    }



    /**=
  *  전체 밸류 로그 
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

        console.log('🔥 실시간 필드 값들:', {
            username: this.fieldsState.username.value || '(빈값)',
            password: this.fieldsState.password.value ? '***' : '(빈값)',
            passwordConfirm: this.fieldsState.passwordConfirm.value ? '***' : '(빈값)',
            name: this.fieldsState.name.value || '(빈값)',
            phone: this.fieldsState.phone.value || '(빈값)',
            terms: this.fieldsState.terms.value
        });
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
            await this.checkIdDuplicate(); // 중복확인
            return;
        }

        if (target.classList.contains('signup-btn')) {
            event.preventDefault();
            await this.validateAllFields33();
            return;
        }
    }

    /**
     *  api 요청시작 -회원가입 
     * @returns 
     */
    async submitRegistration() {
        console.log('🚀 회원가입 API 요청 시작');

        try {
            // 저장된 값들로 API 요청 데이터 구성
            const requestData = {
                username: this.fieldsState.username.value,
                password: this.fieldsState.password.value,
                name: this.fieldsState.name.value,
                phone_number: this.fieldsState.phone.value,
            };

            console.log('📤 전송할 데이터:', requestData);

            // 필수 값 검증
            if (!requestData.username || !requestData.password || !requestData.name || !requestData.phone_number) {
                console.error('❌ 필수 값 누락:', {
                    username: !!requestData.username,
                    password: !!requestData.password,
                    name: !!requestData.name,
                    phone_number: !!requestData.phone_number
                });

                alert('❌ 필수 입력 정보가 누락되었습니다.');
                return { success: false, error: '필수 값 누락' };
            }

            const headers = {
                'Content-Type': 'application/json',
            };

            // API 요청
            const response = await fetch(`${this.apiBaseUrl}/accounts/buyer/signup/`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestData)
            });

            console.log('📡 API 응답 상태:', response.status);

            if (response.ok) {
                // ✅ 성공
                const responseData = await response.json();
                console.log('✅ 회원가입 성공:', responseData);

                alert('🎉 회원가입이 완료되었습니다!');

                // 성공 후 처리 (예: 로그인 페이지로 이동)
                // window.location.href = '/login';
                // 또는 router 사용
                window.router.navigateTo('/login');

                return { success: true, data: responseData };

            } else {
                // ❌ 실패
                const errorData = await response.json();
                console.error('❌ 회원가입 실패:', errorData);

                let errorMessage = '회원가입 중 오류가 발생했습니다.';

                // 서버 에러 메시지 처리
                if (errorData.username) {
                    errorMessage = `아이디: ${errorData.username[0]}`;
                } else if (errorData.password) {
                    errorMessage = `비밀번호: ${errorData.password[0]}`;
                } else if (errorData.name) {
                    errorMessage = `이름: ${errorData.name[0]}`;
                } else if (errorData.phone_number) {
                    errorMessage = `전화번호: ${errorData.phone_number[0]}`;
                } else if (errorData.detail) {
                    errorMessage = errorData.detail;
                }

                alert(`❌ ${errorMessage}`);

                return { success: false, error: errorData };
            }

        } catch (error) {
            // 🚨 네트워크 오류
            console.error('❌ 회원가입 API 네트워크 오류:', error);
            alert('❌ 네트워크 오류가 발생했습니다. 다시 시도해주세요.');

            return { success: false, error: error.message };
        }
    }

    /**
     *   서브밋 버튼 이벤트 이후 서버전송전 유효성검사
     * @returns 
     */
    async validateAllFields33() {
        if (!this.fieldsState.idDupl.isValid) {
            alert('❌ 아이디 중복확인을 완료해주세요!');
            return;
        }

        const duplicateResult = await this.checkIdDuplicate();
        if (!duplicateResult.isValid) {
            alert('❌ 아이디 중복확인을 완료해주세요!');
            return;
        }
        const termsResult = this.validateTermsField();

        if (!termsResult.isValid) {
            alert('❌ 이용약관 및 개인정보처리방침에 동의해주세요!');
            return;
        }
        // if (this.showInvalidFieldMessages()) {
        //     console.log('✅ 모든 필드 검증 통과 - 회원가입 진행');
        // } else {
        //     console.log('❌ 일부 필드가 유효하지 않음 - 회원가입 차단');
        // }

        // 3. 전체 필드 검증
        if (this.showInvalidFieldMessages()) {
            console.log('✅ 모든 필드 검증 통과 - 회원가입 API 호출');

            // 🔥 회원가입 API 요청 실행
            const result = await this.submitRegistration();

            if (result.success) {
                console.log('🎉 회원가입 완료!');
            } else {
                console.log('❌ 회원가입 실패');
            }

        } else {
            console.log('❌ 일부 필드가 유효하지 않음 - 회원가입 차단');
            alert('❌ 입력 정보를 확인해주세요!');
        }
    }

    /**
     *  유효성 검사후 유효하지 않은 필드 로그 체크
     * @returns 
     */
    showInvalidFieldMessages() {
        console.log('🔍 유효하지 않은 필드 메시지 출력 시작');

        const invalidFields = Object.entries(this.fieldsState)
            .filter(([fieldName, fieldState]) => !fieldState.isValid)
            .map(([fieldName, fieldState]) => {
                console.log(`❌ ${fieldName} 필드 무효:`, fieldState.message);

                const messageElementId = this.getMessageElementId(fieldName);

                if (messageElementId) {
                    this.showFieldMessage(messageElementId, {
                        isValid: false,
                        message: fieldState.message || '입력을 확인해주세요.'
                    });
                }

                return fieldName; // 무효한 필드명 반환
            });

        // 전체 유효성 체크
        const allValid = Object.values(this.fieldsState).every(field => field.isValid);
        console.log(`전체 필드 유효성: ${allValid ? '✅' : '❌'}`);
        console.log(`무효한 필드 수: ${invalidFields.length}`);

        return allValid;
    }


    /**
     *   showMsg 출력을 위한 HTML엘레먼트겟
     * @param {*} fieldName 
     * @returns 
     */
    getMessageElementId(fieldName) {
        switch (fieldName) {
            case 'password':
                return 'password-message';
            case 'passwordConfirm':
                return 're-password-message';
            case 'name':
                return 'name-message';
            case 'phone':
                return 'phone-message';
            case 'username':
                return 'buyer-id-message';
            case 'terms':
                return 'terms-error-message';
            default:
                console.warn(`알 수 없는 필드: ${fieldName}`);
                return null;
        }
    }


    /**
     *  🔐 비밀번호 검증
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
     *   휴대폰 검증
     * @returns 
     */
    validatePhoneNumber33() {
        const phoneSelect = document.querySelector('.phone-select');
        const phoneInput = document.querySelector('.phone-input');

        if (!phoneInput || !phoneSelect) {
            return {
                isValid: false,
                message: '전화번호 입력 필드를 찾을 수 없습니다.',
                value: ''
            };
        }

        const phonePrefix = phoneSelect.value; // "010"
        const phoneNumber = phoneInput.value.trim(); // "12345678"

        console.log('📱 전화번호 검증:', { phonePrefix, phoneNumber });

        if (!phoneNumber) {
            return {
                isValid: false,
                message: '휴대폰 번호를 입력해주세요.',
                value: ''
            };
        }

        // 🔍 숫자만 입력되었는지 확인
        if (!/^\d+$/.test(phoneNumber)) {
            return {
                isValid: false,
                message: '숫자만 입력해주세요.',
                value: phonePrefix + phoneNumber
            };
        }

        // 🔍 길이 확인 (7자리 또는 8자리)
        if (phoneNumber.length < 7 || phoneNumber.length > 8) {
            return {
                isValid: false,
                message: '7~8자리 숫자를 입력해주세요.',
                value: phonePrefix + phoneNumber
            };
        }

        const fullPhoneNumber = phonePrefix + phoneNumber; // "01012345678"

        // 🔍 최종 전화번호 형식 확인
        if (!/^01[0-9]\d{7,8}$/.test(fullPhoneNumber)) {
            return {
                isValid: false,
                message: '올바른 휴대폰 번호 형식이 아닙니다.',
                value: fullPhoneNumber
            };
        }

        console.log('📱 검증 성공:', fullPhoneNumber);

        return {
            isValid: true,
            message: '✓ 올바른 휴대폰 번호입니다.',
            value: fullPhoneNumber
        };
    }

  

  /**
   * 🔍   ID 중복확인 버튼
   * @returns 
   */
    async checkIdDuplicate() {
        console.log('🔍 ID 중복확인 시작');

        // 현재 입력된 아이디 가져오기
        const usernameInput = document.querySelector('#username');
        const username = usernameInput.value.trim();


        // this.hideMessage(messageEl);


        // 1. 입력값 검증
        if (!username) {

            const result = {
                isValid: false,
                message: '아이디를 입력해주세요.'
            };

            // 🔥 전역 상태 업데이트
            this.updateFieldState('username', result);
            this.showFieldMessage('buyer-id-message', result);


            usernameInput.focus();
            return result;
        }

        if (username.length > 20 || !/^[a-zA-Z0-9]+$/.test(username)) {
            const result = {
                isValid: false,
                message: 'ID는 20자 이내의 영어, 숫자만 가능합니다.'
            };

            // 🔥 전역 상태 업데이트
            this.updateFieldState('username', result);
            this.showFieldMessage('buyer-id-message', result);

            return result;
        }

        // 로딩 상태 표시
        const loadingResult = {
            isValid: false,
            message: '확인 중...'
        };
        this.updateFieldState('username', loadingResult);
        this.showFieldMessage('buyer-id-message', loadingResult);

        // if (button) {
        //     this.setButtonLoading(button, true);
        // }
        let result;


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
                result = {
                    isValid: true,
                    message: '✓ 사용 가능한 아이디입니다!'
                };

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
                result = {
                    isValid: false,
                    message: errorText
                };

                console.log('❌ ID 중복확인 실패:', errorText);
            }

            // 🔥 전역 상태 업데이트
            this.updateFieldState('idDupl', result);
            this.showFieldMessage('buyer-id-message', result);

        } catch (error) {
            // 🚨 네트워크 오류
            console.error('❌ ID 중복확인 API 오류:', error);
            const errorResult = {
                isValid: false,
                message: '네트워크 오류가 발생했습니다.'
            };

            // 🔥 전역 상태 업데이트
            this.updateFieldState('idDupl', errorResult);
            this.showFieldMessage('buyer-id-message', errorResult);

        } finally {
            // 5. 로딩 상태 해제
            // this.setButtonLoading(button, false);
        }

        // 전역 상태 업데이트
        this.updateFieldState('idDupl', result);
        this.showFieldMessage('buyer-id-message', result);


        // 4. 전역 상태 업데이트
        if (result) {
            this.updateFieldState('username', result);
            this.showFieldMessage('buyer-id-message', result);

            // console.log('📊 username 상태 업데이트:', this.fieldsState.username);
            // console.log('📊 전체 유효성:', this.checkAllValid());
        }

        return result;
    }




    /**
     *   🔄 탭 클릭 처리 (UI만 변경)
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

 

}

export default RegisterPage; 