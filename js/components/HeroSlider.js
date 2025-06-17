// components/HeroSlider.js
export default class HeroSlider {
    constructor() {
      this.element = null;
      this.currentSlide = 0;
      this.autoSlideInterval = null;
      this.slides = [
        { 
          title: 'KODU와 함께하는 새로운 시작', 
          content: '혁신적인 제품으로 여러분의 라이프스타일을 변화시키세요',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        { 
          title: '프리미엄 품질의 제품', 
          content: '최고의 품질과 디자인으로 만족을 드립니다',
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        { 
          title: '특별한 할인 혜택', 
          content: '지금 주문하시면 특별 가격으로 만나보실 수 있습니다',
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        }
      ];
  
      console.log('🎠 HeroSlider 인스턴스 생성됨');
    }
  
    render() {
      console.log('🎨 HeroSlider 렌더링 시작');
      
      this.element = document.createElement('section');
      this.element.className = 'hero-slider';
      this.element.innerHTML = `
        <div class="slides-wrapper">
          <div class="slides-container">
            ${this.slides.map((slide, index) => `
              <div class="slide ${index === 0 ? 'active' : ''}" data-bg="${slide.background}">
                <div class="slide-content">
                  <h2>${slide.title}</h2>
                  <p>${slide.content}</p>
                  <button class="cta-button">자세히 보기</button>
                </div>
              </div>
            `).join('')}
          </div>
          
          <div class="slider-controls">
            <button class="control-btn prev" aria-label="이전 슬라이드">❮</button>
            <button class="control-btn next" aria-label="다음 슬라이드">❯</button>
          </div>
          
          <div class="slider-indicators">
            ${this.slides.map((_, index) => `
              <button class="indicator ${index === 0 ? 'active' : ''}" 
                      data-slide="${index}" 
                      aria-label="슬라이드 ${index + 1}로 이동"></button>
            `).join('')}
          </div>
        </div>
      `;
  
      this.addStyles();
      this.bindEvents();
      this.startAutoSlide();
  
      console.log('✅ HeroSlider 렌더링 완료');
      return this.element;
    }
  
    addStyles() {
      if (!document.getElementById('hero-slider-styles')) {
        const style = document.createElement('style');
        style.id = 'hero-slider-styles';
        style.textContent = `
          .hero-slider {
            position: relative;
            height: 70vh;
            min-height: 500px;
            overflow: hidden;
            margin: 0;
          }
  
          .slides-wrapper {
            position: relative;
            width: 100%;
            height: 100%;
          }
  
          .slides-container {
            position: relative;
            width: 100%;
            height: 100%;
          }
  
          .slide {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
  
          .slide.active {
            opacity: 1;
            transform: translateX(0);
          }
  
          .slide.prev {
            transform: translateX(-100%);
          }
  
          .slide-content {
            text-align: center;
            max-width: 800px;
            padding: 0 2rem;
            z-index: 2;
          }
  
          .slide-content h2 {
            font-size: clamp(2rem, 5vw, 4rem);
            margin-bottom: 1.5rem;
            font-weight: 700;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            line-height: 1.2;
          }
  
          .slide-content p {
            font-size: clamp(1.1rem, 2.5vw, 1.4rem);
            margin-bottom: 2.5rem;
            opacity: 0.95;
            line-height: 1.6;
          }
  
          .cta-button {
            background: rgba(255,255,255,0.9);
            color: #333;
            border: none;
            padding: 1rem 2.5rem;
            font-size: 1.1rem;
            font-weight: 600;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
  
          .cta-button:hover {
            background: white;
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          }
  
          .slider-controls {
            position: absolute;
            top: 50%;
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 2rem;
            transform: translateY(-50%);
            z-index: 3;
          }
  
          .control-btn {
            background: rgba(255,255,255,0.2);
            border: 2px solid rgba(255,255,255,0.3);
            color: white;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.5rem;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
          }
  
          .control-btn:hover {
            background: rgba(255,255,255,0.3);
            border-color: rgba(255,255,255,0.5);
            transform: scale(1.1);
          }
  
          .slider-indicators {
            position: absolute;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 1rem;
            z-index: 3;
          }
  
          .indicator {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: rgba(255,255,255,0.4);
            border: 2px solid rgba(255,255,255,0.6);
            cursor: pointer;
            transition: all 0.3s ease;
          }
  
          .indicator.active {
            background: white;
            transform: scale(1.2);
          }
  
          .indicator:hover:not(.active) {
            background: rgba(255,255,255,0.7);
          }
  
          /* 반응형 디자인 */
          @media (max-width: 768px) {
            .hero-slider {
              height: 60vh;
              min-height: 400px;
            }
  
            .slider-controls {
              padding: 0 1rem;
            }
  
            .control-btn {
              width: 50px;
              height: 50px;
              font-size: 1.2rem;
            }
  
            .slide-content {
              padding: 0 1rem;
            }
  
            .cta-button {
              padding: 0.8rem 2rem;
              font-size: 1rem;
            }
          }
        `;
        document.head.appendChild(style);
      }
    }
  
    bindEvents() {
      if (!this.element) return;
  
      const prevBtn = this.element.querySelector('.prev');
      const nextBtn = this.element.querySelector('.next');
      const indicators = this.element.querySelectorAll('.indicator');
  
      prevBtn?.addEventListener('click', () => this.prevSlide());
      nextBtn?.addEventListener('click', () => this.nextSlide());
      
      indicators.forEach(indicator => {
        indicator.addEventListener('click', (e) => {
          const slideIndex = parseInt(e.target.dataset.slide);
          this.goToSlide(slideIndex);
        });
      });
  
      // 키보드 네비게이션
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') this.prevSlide();
        if (e.key === 'ArrowRight') this.nextSlide();
      });
  
      console.log('🔗 HeroSlider 이벤트 바인딩 완료');
    }
  
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      this.updateSlide();
      this.resetAutoSlide();
    }
  
    prevSlide() {
      this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
      this.updateSlide();
      this.resetAutoSlide();
    }
  
    goToSlide(index) {
      if (index !== this.currentSlide) {
        this.currentSlide = index;
        this.updateSlide();
        this.resetAutoSlide();
      }
    }
  
    updateSlide() {
      if (!this.element) return;
  
      const slides = this.element.querySelectorAll('.slide');
      const indicators = this.element.querySelectorAll('.indicator');
  
      slides.forEach((slide, index) => {
        slide.classList.remove('active', 'prev');
        
        if (index === this.currentSlide) {
          slide.classList.add('active');
          // 배경 변경
          slide.style.background = this.slides[index].background;
        } else if (index < this.currentSlide) {
          slide.classList.add('prev');
        }
      });
  
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === this.currentSlide);
      });
    }
  
    startAutoSlide() {
      this.autoSlideInterval = setInterval(() => {
        this.nextSlide();
      }, 5000); // 5초마다 자동 슬라이드
    }
  
    resetAutoSlide() {
      if (this.autoSlideInterval) {
        clearInterval(this.autoSlideInterval);
        this.startAutoSlide();
      }
    }
  
    destroy() {
      console.log('🧹 HeroSlider 정리 시작');
      
      if (this.autoSlideInterval) {
        clearInterval(this.autoSlideInterval);
        this.autoSlideInterval = null;
      }
  
      // 이벤트 리스너 제거는 element가 DOM에서 제거될 때 자동으로 처리됨
      this.element = null;
      
      console.log('✅ HeroSlider 정리 완료');
    }
  }