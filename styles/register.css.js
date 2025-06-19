export const registerPageStyles = `  
    * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            background-color: #f5f5f5;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }

        .signup-container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
            overflow: hidden;
        }

        .logo {
            text-align: center;
            padding: 30px 0 20px 0;
            background: white;
        }

        .logo h1 {
            font-size: 36px;
            font-weight: bold;
            color: #21BF48;
            letter-spacing: 2px;
        }
  
            .tab-btn {
                flex: 1;
                padding: 18px 24px;
                border: none;
                background: transparent;
                color: #767676;
                font-size: 16px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.3s ease;
                border-radius: 10px;
                border: 1px solid transparent;
            }
            
            /* ✅ 활성화된 탭 - 흰색 배경 */
            .tab-btn.active {
                background: white;
                color: #21bf48;
                border: 1px solid #c4c4c4;
                font-weight: 600;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            
            /* 🖱️ 비활성 탭 hover 효과 */
            .tab-btn:not(.active):hover {
                background: rgba(255,255,255,0.5);
                color: #555;
            }
            
            /* 첫 번째 탭 */
            .tab-btn:first-child {
                margin-right: 2px;
            }
            
            /* 두 번째 탭 */
            .tab-btn:last-child {
                margin-left: 2px;
            }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-size: 14px;
            color: #333;
            font-weight: 500;
        }

        .form-group input, .form-group select {
            width: 100%;
            padding: 12px 15px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 14px;
            transition: border-color 0.3s ease;
        }

        .form-group input:focus, .form-group select:focus {
            outline: none;
            border-color: #21BF48;
        }

        .phone-group {
            display: flex;
            flex-wrap: wrap; 
            align-items: center; 
            gap: 8px; 
        }

    .phone-group #phone-message {
            width: 100%; 
            margin-top: 5px; 
        }

        .phone-select {
            flex: 0 0 80px;
        }

        .phone-input {
            flex: 1;
        }

        .verify-btn {
            flex: 0 0 80px;
            padding: 12px 8px;
            background: #21BF48;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
            font-weight: 500;
            transition: background-color 0.3s ease;
        }

        .verify-btn:hover {
            background: #1da83e;
        }

        .signup-btn {
            width: 100%;
            padding: 15px;
            background: #21BF48;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            margin-top: 20px;
            transition: background-color 0.3s ease;
        }

        .signup-btn:hover {
            background: #1da83e;
        }

        .terms {
            font-size: 12px;
            color: #888;
            line-height: 1.4;
            margin-top: 15px;
        }

        .terms a {
            color: #21BF48;
            text-decoration: none;
        }

        .terms a:hover {
            text-decoration: underline;
        }

        /* 애니메이션 효과 */
        .tab-content {
            animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        ;`