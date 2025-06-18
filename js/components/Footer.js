// components/Footer.js
export default class Footer {
    constructor() {
      this.element = null;
      console.log('📄 Footer 인스턴스 생성됨');
    }
  
    render() {
      console.log('🎨 Footer 렌더링 시작');
      
      this.element = document.createElement('footer');
      this.element.className = 'site-footer';
      this.element.innerHTML = `
        <div class="footer-container">
          <div class="footer-content">
            <div class="footer-links">
              <a href="/about" data-link>호두소개</a>
              <span class="divider">|</span>
              <a href="/terms" data-link>이용약관</a>
              <span class="divider">|</span>
              <a href="/privacy" data-link>개인정보처리방침</a>
              <span class="divider">|</span>
              <a href="/rules" data-link>판매자광고정보</a>
              <span class="divider">|</span>
              <a href="/youth" data-link>청소년보호정책</a>
              <span class="divider">|</span>
              <a href="/help" data-link>자주묻는질문</a>
            </div>
            
            <div class="social-links">
              <a href="https://instagram.com" target="_blank" rel="noopener" class="social-link instagram" aria-label="인스타그램">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener" class="social-link facebook" aria-label="페이스북">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener" class="social-link youtube" aria-label="유튜브">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div class="company-info">
            <div class="company-name">(주)HODU SHOP</div>
            <div class="company-details">
              <span>제주특별자치도 제주시 동광고 137 제주코딩베이스캠프</span>
            </div>
            <div class="company-details">
              <span>사업자 번호 : 000-0000-0000 | 통신판매업</span>
            </div>
            <div class="company-details">
              <span>대표 : 김호두</span>
            </div>
          </div>
        </div>
      `;
  
      this.addStyles();
      this.bindEvents();
  
      console.log('✅ Footer 렌더링 완료');
      return this.element;
    }
  
    addStyles() {
      if (!document.getElementById('footer-styles')) {
        const style = document.createElement('style');
        style.id = 'footer-styles';
        style.textContent = `
          .site-footer {
            background-color: #f8f9fa;
            border-top: 1px solid #e9ecef;
            padding: 3rem 0 2rem 0;
            margin-top: auto;
            color: #6c757d;
            font-size: 0.9rem;
          }
  
          .footer-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
          }
  
          .footer-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid #e9ecef;
          }
  
          .footer-links {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.5rem;
          }
  
          .footer-links a {
            color: #6c757d;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s ease;
            padding: 0.25rem 0;
          }
  
          .footer-links a:hover {
            color: #495057;
            text-decoration: underline;
          }
  
          .divider {
            color: #dee2e6;
            margin: 0 0.25rem;
            user-select: none;
          }
  
          .social-links {
            display: flex;
            gap: 1rem;
            align-items: center;
          }
  
          .social-link {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            color: #6c757d;
            border: 1px solid #dee2e6;
            border-radius: 50%;
            text-decoration: none;
            transition: all 0.3s ease;
            background: white;
          }
  
          .social-link:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
  
          .social-link.instagram:hover {
            color: #e4405f;
            border-color: #e4405f;
          }
  
          .social-link.facebook:hover {
            color: #1877f2;
            border-color: #1877f2;
          }
  
          .social-link.youtube:hover {
            color: #ff0000;
            border-color: #ff0000;
          }
  
          .company-info {
            line-height: 1.6;
          }
  
          .company-name {
            font-weight: 700;
            font-size: 1rem;
            color: #495057;
            margin-bottom: 0.5rem;
          }
  
          .company-details {
            margin-bottom: 0.25rem;
            color: #6c757d;
          }
  
          .company-details span {
            margin-right: 1rem;
          }
  
          /* 반응형 디자인 */
          @media (max-width: 768px) {
            .site-footer {
              padding: 2rem 0 1.5rem 0;
            }
  
            .footer-container {
              padding: 0 1rem;
            }
  
            .footer-content {
              flex-direction: column;
              gap: 1.5rem;
              text-align: center;
            }
  
            .footer-links {
              justify-content: center;
              font-size: 0.85rem;
            }
  
            .footer-links a {
              padding: 0.5rem 0.25rem;
            }
  
            .social-links {
              justify-content: center;
            }
  
            .company-info {
              text-align: center;
              font-size: 0.85rem;
            }
  
            .company-details span {
              display: block;
              margin-right: 0;
              margin-bottom: 0.25rem;
            }
          }
  
          @media (max-width: 480px) {
            .footer-links {
              flex-direction: column;
              gap: 0.75rem;
            }
  
            .divider {
              display: none;
            }
  
            .social-link {
              width: 36px;
              height: 36px;
            }
  
            .company-details {
              font-size: 0.8rem;
            }
          }
  
          /* 애니메이션 */
          .site-footer {
            animation: fadeInUp 0.6s ease-out;
          }
  
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
  
          /* 다크모드 대응 */
          @media (prefers-color-scheme: dark) {
            .site-footer {
              background-color: #2c3e50;
              border-top-color: #34495e;
              color: #bdc3c7;
            }
  
            .footer-content {
              border-bottom-color: #34495e;
            }
  
            .footer-links a {
              color: #bdc3c7;
            }
  
            .footer-links a:hover {
              color: #ecf0f1;
            }
  
            .divider {
              color: #7f8c8d;
            }
  
            .social-link {
              background: #34495e;
              border-color: #7f8c8d;
              color: #bdc3c7;
            }
  
            .company-name {
              color: #ecf0f1;
            }
  
            .company-details {
              color: #95a5a6;
            }
          }
        `;
        document.head.appendChild(style);
      }
    }
  
    bindEvents() {
      if (!this.element) return;
  
      // 소셜 링크 클릭 이벤트
      const socialLinks = this.element.querySelectorAll('.social-link');
      socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          const platform = e.currentTarget.classList.contains('instagram') ? 'Instagram' :
                          e.currentTarget.classList.contains('facebook') ? 'Facebook' : 'YouTube';
          console.log(`🔗 ${platform} 링크 클릭됨`);
        });
      });
  
      // 푸터 링크 클릭 이벤트 (SPA 라우팅)
      const footerLinks = this.element.querySelectorAll('a[data-link]');
      footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const href = e.target.getAttribute('href');
          console.log(`📄 푸터 링크 클릭: ${href}`);
          
          // SPA 라우팅
          if (window.router) {
            window.router.navigateTo(href);
          } else {
            console.warn('라우터를 찾을 수 없습니다.');
          }
        });
      });
  
      console.log('🔗 Footer 이벤트 바인딩 완료');
    }
  
    destroy() {
      console.log('🧹 Footer 정리 시작');
      this.element = null;
      console.log('✅ Footer 정리 완료');
    }
  }