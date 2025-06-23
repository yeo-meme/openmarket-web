

 export const loginPageStyles = `
.auth-page {
    min-height: 100vh;
    background: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    font-family: 'Spoqa Han Sans Neo', sans-serif;
}

.auth-container {
    width: 100%;
    max-width: 440px;
    background: white;
    padding: 0;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    overflow: hidden;
}

.logo-section {
    background: white;
    padding: 3rem 0 2rem 0;
    text-align: center;
}

.logo {
    font-size: 3rem;
    font-weight: 900;
    color: #21BF48;
    margin: 0;
    letter-spacing: 2px;
}

.auth-form-container {
    padding: 0;
}

.tab-container {
    display: flex;
    border-bottom: 1px solid #e9ecef;
}

.tab-btn {
      background: #f8f8f8;
    color: #666;
    flex: 1;
    padding: 1.2rem;
    border: none;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    border-bottom: 2px solid transparent;
}

.tab-btn.active {
       background: white;
    color: #333;
    border-bottom-color: #21BF48;
}

.tab-btn:hover:not(.active) {
    background: #e9ecef;
    color: #495057;
}

.auth-form {
    padding: 2rem;
}

.form-group {
    margin-bottom: 1rem;
}

.form-input {
    width: 100%;
    padding: 1rem;
    border: 1px solid #e9ecef;
    border-radius: 5px;
    font-size: 1rem;
    background: #f8f9fa;
    transition: all 0.3s ease;
    box-sizing: border-box;
}

.form-input:focus {
    outline: none;
    border-color: #21BF48;
    background: white;
    box-shadow: 0 0 0 2px rgba(33, 191, 72, 0.1);
}

.form-input::placeholder {
    color: #adb5bd;
}

.login-btn {
    width: 100%;
    padding: 1rem;
    background: #21BF48;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;
}

.login-btn:hover {
    background: #1ea63c;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(33, 191, 72, 0.3);
}

.login-btn:active {
    transform: translateY(0);
}

.auth-links {
    text-align: center;
    padding: 1.5rem 2rem 2rem 2rem;
    background: #f8f9fa;
    border-top: 1px solid #e9ecef;
}

.link {
    color: #6c757d;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease;
}

.link:hover {
    color: #21BF48;
    text-decoration: underline;
}

.divider {
    margin: 0 1rem;
    color: #dee2e6;
}

/* 로딩 상태 */
.login-btn.loading {
    background: #95a5a6;
    cursor: not-allowed;
    position: relative;
    overflow: hidden;
}

.login-btn.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    border: 2px solid transparent;
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    transform: translate(-50%, -50%);
}

@keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
}

/* 에러 상태 */
.form-input.error {
    border-color: #dc3545;
    background: #fff5f5;
}

.error-message {
    color: #dc3545;
    font-size: 0.85rem;
    margin-top: 0.5rem;
    display: none;
}

.error-message.show {
    display: block;
}

/* 성공 상태 */
.form-input.success {
    border-color: #28a745;
    background: #f8fff9;
}

/* 반응형 디자인 */
@media (max-width: 480px) {
    .auth-page {
        padding: 1rem;
    }

    .auth-container {
        max-width: 100%;
        margin: 0;
    }

    .logo {
        font-size: 2.5rem;
    }

    .logo-section {
        padding: 2rem 0 1.5rem 0;
    }

    .tab-btn {
        font-size: 0.9rem;
        padding: 1rem 0.5rem;
    }

    .auth-form {
        padding: 1.5rem;
    }

    .form-input {
        padding: 0.9rem;
    }

    .login-btn {
        padding: 0.9rem;
        font-size: 1rem;
    }
}

/* 접근성 개선 */
.tab-btn:focus,
.form-input:focus,
.login-btn:focus,
.link:focus {
    outline: 2px solid #21BF48;
    outline-offset: 2px;
}

/* 다크모드 대응 */
@media (prefers-color-scheme: dark) {
    .auth-page {
        background: #1a1a1a;
    }

    .auth-container {
        background: #2d3748;
        box-shadow: 0 0 20px rgba(0,0,0,0.3);
    }

    .logo-section {
        background: #2d3748;
    }

    .tab-btn {
        background: #4a5568;
        color: #a0aec0;
    }

    .tab-btn.active {
        background: #2d3748;
        color: #e2e8f0;
    }

    .form-input {
        background: #4a5568;
        border-color: #718096;
        color: #e2e8f0;
    }

    .form-input::placeholder {
        color: #a0aec0;
    }

    .auth-links {
        background: #4a5568;
        border-top-color: #718096;
    }

    .link {
        color: #a0aec0;
    }
}

/* 페이지 진입 애니메이션 */
.auth-page {
    animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.auth-container {
    animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(40px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}
`;