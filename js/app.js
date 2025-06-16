class HoduSPA {
    constructor() {
        this.currentTab = '구매회원가입';
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupFormValidation();
    }

    bindEvents() {
        // 탭 전환 이벤트
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // 아이디 중복확인
        document.getElementById('checkUserId').addEventListener('click', () => {
            this.checkUserIdDuplicate();
        });

        // 폼 제출 이벤트
        document.getElementById('signupForm').addEventListener('submit', (e) => {
            this.handleSubmit(e, 'buyer');
        });

        document.getElementById('sellerSignupForm').addEventListener('submit', (e) => {
            this.handleSubmit(e, 'seller');
        });

        // 실시간 유효성 검사
        document.getElementById('passwordConfirm').addEventListener('input', () => {
            this.validatePasswordMatch();
        });

        // 약관 동의 체크
        document.getElementById('termsAgree').addEventListener('change', () => {
            this.updateSubmitButton();
        });
    }

    switchTab(tabName) {
        // 탭 UI 업데이트
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // 폼 전환
        if (tabName === '구매회원가입') {
            document.getElementById('signupForm').classList.remove('hidden');
            document.getElementById('sellerSignupForm').classList.add('hidden');
        } else {
            document.getElementById('signupForm').classList.add('hidden');
            document.getElementById('sellerSignupForm').classList.remove('hidden');
        }

        this.currentTab = tabName;
    }

    checkUserIdDuplicate() {
        const userId = document.getElementById('userId').value;
        
        if (!userId) {
            alert('아이디를 입력해주세요.');
            return;
        }

        // 실제로는 서버에 요청을 보내야 합니다
        setTimeout(() => {
            // 임시로 랜덤하게 성공/실패 처리
            const isAvailable = Math.random() > 0.3;
            
            if (isAvailable) {
                document.getElementById('userIdSuccess').classList.remove('hidden');
            } else {
                alert('이미 사용중인 아이디입니다.');
            }
        }, 500);
    }

    validatePasswordMatch() {
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;
        const errorElement = document.getElementById('passwordError');

        if (passwordConfirm && password !== passwordConfirm) {
            errorElement.classList.remove('hidden');
        } else {
            errorElement.classList.add('hidden');
        }

        this.updateSubmitButton();
    }

    updateSubmitButton() {
        const termsChecked = document.getElementById('termsAgree').checked;
        const submitBtn = document.getElementById('submitBtn');
        
        if (termsChecked) {
            submitBtn.classList.add('active');
            submitBtn.style.cursor = 'pointer';
            submitBtn.disabled = false;
        } else {
            submitBtn.classList.remove('active');
            submitBtn.style.cursor = 'not-allowed';
            submitBtn.disabled = true;
        }
    }

    setupFormValidation() {
        // 숫자만 입력 가능하도록 설정
        document.getElementById('phoneMiddle').addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
        
        document.getElementById('phoneLast').addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    }

    handleSubmit(e, type) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        console.log(`${type} 회원가입 데이터:`, data);
        
        // 실제로는 서버에 데이터를 전송
        this.submitToServer(data, type);
    }

    submitToServer(data, type) {
        // 로딩 상태 표시
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '가입 중...';
        submitBtn.disabled = true;

        // 임시로 2초 후 성공 처리
        setTimeout(() => {
            alert(`${type === 'buyer' ? '구매' : '판매'}회원 가입이 완료되었습니다!`);
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // 폼 초기화
            document.getElementById(type === 'buyer' ? 'signupForm' : 'sellerSignupForm').reset();
            this.updateSubmitButton();
        }, 2000);
    }
}

// SPA 초기화
document.addEventListener('DOMContentLoaded', () => {
    new HoduSPA();
});