// components/ProductGrid.js
export default class ProductGrid {
    constructor() {
      this.element = null;
      this.products = [
        { 
          id: 1, 
          name: 'KODU 프리미엄 헤드폰', 
          price: '₩199,000', 
          originalPrice: '₩299,000',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
          badge: 'BEST',
          rating: 4.8
        },
        { 
          id: 2, 
          name: 'KODU 스마트 워치', 
          price: '₩329,000', 
          originalPrice: '₩399,000',
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
          badge: 'NEW',
          rating: 4.6
        },
        { 
          id: 3, 
          name: 'KODU 무선 이어버드', 
          price: '₩129,000', 
          originalPrice: '₩179,000',
          image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=300&fit=crop',
          badge: 'HOT',
          rating: 4.9
        },
        { 
          id: 4, 
          name: 'KODU 블루투스 스피커', 
          price: '₩89,000', 
          originalPrice: '₩129,000',
          image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
          badge: 'SALE',
          rating: 4.5
        },
        { 
          id: 5, 
          name: 'KODU 게이밍 키보드', 
          price: '₩159,000', 
          originalPrice: '₩219,000',
          image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop',
          badge: '',
          rating: 4.7
        },
        { 
          id: 6, 
          name: 'KODU 웹캠 4K', 
          price: '₩79,000', 
          originalPrice: '₩99,000',
          image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=300&fit=crop',
          badge: 'NEW',
          rating: 4.4
        }
      ];
  
      console.log('🛍️ ProductGrid 인스턴스 생성됨');
    }
  
    render() {
      console.log('🎨 ProductGrid 렌더링 시작');
      
      this.element = document.createElement('section');
      this.element.className = 'product-grid';
      this.element.innerHTML = `
        <div class="container">
          <div class="section-header">
            <h2>인기 상품</h2>
            <p>KODU의 베스트셀러 제품을 만나보세요</p>
          </div>
          
          <div class="filter-tabs">
            <button class="filter-btn active" data-filter="all">전체</button>
            <button class="filter-btn" data-filter="audio">오디오</button>
            <button class="filter-btn" data-filter="wearable">웨어러블</button>
            <button class="filter-btn" data-filter="accessory">액세서리</button>
          </div>
          
          <div class="products-grid">
            ${this.products.map(product => this.createProductCard(product)).join('')}
          </div>
          
          <div class="load-more-section">
            <button class="load-more-btn">더 많은 상품 보기</button>
          </div>
        </div>
      `;
  
      this.addStyles();
      this.bindEvents();
  
      console.log('✅ ProductGrid 렌더링 완료');
      return this.element;
    }
  
    createProductCard(product) {
      const discountRate = product.originalPrice ? 
        Math.round((1 - parseInt(product.price.replace(/[^0-9]/g, '')) / parseInt(product.originalPrice.replace(/[^0-9]/g, ''))) * 100) : 0;
  
      return `
        <div class="product-card" data-id="${product.id}" data-category="${this.getProductCategory(product.id)}">
          ${product.badge ? `<div class="product-badge ${product.badge.toLowerCase()}">${product.badge}</div>` : ''}
          
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="product-overlay">
              <button class="quick-view-btn" data-id="${product.id}">빠른 보기</button>
              <button class="wishlist-btn" data-id="${product.id}">♡</button>
            </div>
          </div>
          
          <div class="product-info">
            <div class="product-rating">
              ${this.createStarRating(product.rating)}
              <span class="rating-text">(${product.rating})</span>
            </div>
            
            <h3 class="product-name">${product.name}</h3>
            
            <div class="product-price">
              <span class="current-price">${product.price}</span>
              ${product.originalPrice ? `
                <span class="original-price">${product.originalPrice}</span>
                <span class="discount-rate">${discountRate}%</span>
              ` : ''}
            </div>
            
            <div class="product-actions">
              <button class="add-to-cart-btn" data-id="${product.id}">
                <span class="btn-text">장바구니 담기</span>
                <span class="btn-icon">🛒</span>
              </button>
              <button class="buy-now-btn" data-id="${product.id}">바로 구매</button>
            </div>
          </div>
        </div>
      `;
    }
  
    createStarRating(rating) {
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 !== 0;
      const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
      
      return `
        <div class="stars">
          ${'★'.repeat(fullStars)}
          ${hasHalfStar ? '☆' : ''}
          ${'☆'.repeat(emptyStars)}
        </div>
      `;
    }
  
    getProductCategory(productId) {
      const categories = {
        1: 'audio', 2: 'wearable', 3: 'audio', 
        4: 'audio', 5: 'accessory', 6: 'accessory'
      };
      return categories[productId] || 'accessory';
    }
  
    addStyles() {
      if (!document.getElementById('product-grid-styles')) {
        const style = document.createElement('style');
        style.id = 'product-grid-styles';
        style.textContent = `
          .product-grid {
            padding: 5rem 0;
            background: linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%);
          }
  
          .product-grid .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem;
          }
  
          .section-header {
            text-align: center;
            margin-bottom: 3rem;
          }
  
          .section-header h2 {
            font-size: 2.5rem;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 1rem;
          }
  
          .section-header p {
            font-size: 1.2rem;
            color: #7f8c8d;
            max-width: 600px;
            margin: 0 auto;
          }
  
          .filter-tabs {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 3rem;
            flex-wrap: wrap;
          }
  
          .filter-btn {
            padding: 0.8rem 1.5rem;
            border: 2px solid #e9ecef;
            background: white;
            color: #6c757d;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
            font-size: 0.95rem;
          }
  
          .filter-btn:hover {
            border-color: #3498db;
            color: #3498db;
          }
  
          .filter-btn.active {
            background: #3498db;
            border-color: #3498db;
            color: white;
          }
  
          .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 2rem;
            margin-bottom: 4rem;
          }
  
          .product-card {
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            cursor: pointer;
          }
  
          .product-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 40px rgba(0,0,0,0.15);
          }
  
          .product-badge {
            position: absolute;
            top: 1rem;
            left: 1rem;
            padding: 0.4rem 0.8rem;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 700;
            color: white;
            z-index: 2;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
  
          .product-badge.best { background: linear-gradient(45deg, #ff6b6b, #ee5a24); }
          .product-badge.new { background: linear-gradient(45deg, #00d2d3, #54a0ff); }
          .product-badge.hot { background: linear-gradient(45deg, #ff9ff3, #f368e0); }
          .product-badge.sale { background: linear-gradient(45deg, #ffa726, #ff7043); }
  
          .product-image {
            position: relative;
            overflow: hidden;
            height: 240px;
          }
  
          .product-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
          }
  
          .product-card:hover .product-image img {
            transform: scale(1.1);
          }
  
          .product-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            opacity: 0;
            transition: opacity 0.3s ease;
          }
  
          .product-card:hover .product-overlay {
            opacity: 1;
          }
  
          .quick-view-btn, .wishlist-btn {
            background: white;
            border: none;
            padding: 0.8rem 1.2rem;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            color: #2c3e50;
          }
  
          .wishlist-btn {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
  
          .quick-view-btn:hover, .wishlist-btn:hover {
            background: #3498db;
            color: white;
            transform: translateY(-2px);
          }
  
          .product-info {
            padding: 1.5rem;
          }
  
          .product-rating {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.8rem;
          }
  
          .stars {
            color: #ffc107;
            font-size: 0.9rem;
          }
  
          .rating-text {
            font-size: 0.85rem;
            color: #6c757d;
            font-weight: 500;
          }
  
          .product-name {
            font-size: 1.1rem;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 1rem;
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
  
          .product-price {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
          }
  
          .current-price {
            font-size: 1.3rem;
            font-weight: 700;
            color: #2c3e50;
          }
  
          .original-price {
            font-size: 1rem;
            color: #95a5a6;
            text-decoration: line-through;
          }
  
          .discount-rate {
            background: linear-gradient(45deg, #e74c3c, #c0392b);
            color: white;
            padding: 0.3rem 0.6rem;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 700;
          }
  
          .product-actions {
            display: flex;
            gap: 0.8rem;
          }
  
          .add-to-cart-btn {
            flex: 1;
            background: linear-gradient(45deg, #3498db, #2980b9);
            color: white;
            border: none;
            padding: 0.9rem;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
          }
  
          .add-to-cart-btn:hover {
            background: linear-gradient(45deg, #2980b9, #21618c);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(52, 152, 219, 0.3);
          }
  
          .buy-now-btn {
            background: transparent;
            color: #3498db;
            border: 2px solid #3498db;
            padding: 0.9rem 1.2rem;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            white-space: nowrap;
          }
  
          .buy-now-btn:hover {
            background: #3498db;
            color: white;
            transform: translateY(-2px);
          }
  
          .load-more-section {
            text-align: center;
            margin-top: 3rem;
          }
  
          .load-more-btn {
            background: linear-gradient(45deg, #95a5a6, #7f8c8d);
            color: white;
            border: none;
            padding: 1rem 2.5rem;
            border-radius: 25px;
            cursor: pointer;
            font-size: 1.1rem;
            font-weight: 600;
            transition: all 0.3s ease;
          }
  
          .load-more-btn:hover {
            background: linear-gradient(45deg, #7f8c8d, #6c7b7d);
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(149, 165, 166, 0.3);
          }
  
          /* 반응형 디자인 */
          @media (max-width: 768px) {
            .product-grid .container {
              padding: 0 1rem;
            }
  
            .section-header h2 {
              font-size: 2rem;
            }
  
            .products-grid {
              grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
              gap: 1.5rem;
            }
  
            .filter-tabs {
              gap: 0.5rem;
            }
  
            .filter-btn {
              padding: 0.6rem 1.2rem;
              font-size: 0.9rem;
            }
  
            .product-actions {
              flex-direction: column;
            }
  
            .buy-now-btn {
              text-align: center;
            }
          }
  
          @media (max-width: 480px) {
            .products-grid {
              grid-template-columns: 1fr;
            }
  
            .product-price {
              flex-direction: column;
              align-items: flex-start;
              gap: 0.5rem;
            }
          }
  
          /* 애니메이션 */
          .product-card {
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
  
          /* 로딩 상태 */
          .loading-skeleton {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
          }
  
          @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `;
        document.head.appendChild(style);
      }
    }
  
    bindEvents() {
      if (!this.element) return;
  
      // 필터 버튼 이벤트
      const filterBtns = this.element.querySelectorAll('.filter-btn');
      filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const filter = e.target.dataset.filter;
          this.filterProducts(filter);
          
          // 활성 버튼 변경
          filterBtns.forEach(b => b.classList.remove('active'));
          e.target.classList.add('active');
        });
      });
  
      // 장바구니 버튼 이벤트
      const addToCartBtns = this.element.querySelectorAll('.add-to-cart-btn');
      addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const productId = parseInt(e.currentTarget.dataset.id);
          this.addToCart(productId);
        });
      });
  
      // 바로 구매 버튼 이벤트
      const buyNowBtns = this.element.querySelectorAll('.buy-now-btn');
      buyNowBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const productId = parseInt(e.currentTarget.dataset.id);
          this.buyNow(productId);
        });
      });
  
      // 빠른 보기 버튼 이벤트
      const quickViewBtns = this.element.querySelectorAll('.quick-view-btn');
      quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const productId = parseInt(e.currentTarget.dataset.id);
          this.quickView(productId);
        });
      });
  
      // 위시리스트 버튼 이벤트
      const wishlistBtns = this.element.querySelectorAll('.wishlist-btn');
      wishlistBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const productId = parseInt(e.currentTarget.dataset.id);
          this.toggleWishlist(productId, e.currentTarget);
        });
      });
  
      // 더 보기 버튼 이벤트
      const loadMoreBtn = this.element.querySelector('.load-more-btn');
      loadMoreBtn?.addEventListener('click', () => {
        this.loadMoreProducts();
      });
  
      // 제품 카드 클릭 이벤트
      const productCards = this.element.querySelectorAll('.product-card');
      productCards.forEach(card => {
        card.addEventListener('click', (e) => {
          if (!e.target.closest('button')) {
            const productId = parseInt(card.dataset.id);
            this.viewProduct(productId);
          }
        });
      });
  
      console.log('🔗 ProductGrid 이벤트 바인딩 완료');
    }
  
    filterProducts(filter) {
      const productCards = this.element.querySelectorAll('.product-card');
      
      productCards.forEach(card => {
        const category = card.dataset.category;
        const shouldShow = filter === 'all' || category === filter;
        
        if (shouldShow) {
          card.style.display = 'block';
          card.style.animation = 'fadeInUp 0.5s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
  
      console.log(`🔍 제품 필터링 완료: ${filter}`);
    }
  
    addToCart(productId) {
      const product = this.products.find(p => p.id === productId);
      if (product) {
        // 실제 장바구니 로직 구현
        this.showNotification(`${product.name}이(가) 장바구니에 추가되었습니다!`, 'success');
        
        // 애니메이션 효과
        const btn = this.element.querySelector(`[data-id="${productId}"].add-to-cart-btn`);
        if (btn) {
          btn.style.background = 'linear-gradient(45deg, #27ae60, #229954)';
          btn.innerHTML = '<span class="btn-text">추가됨!</span><span class="btn-icon">✓</span>';
          
          setTimeout(() => {
            btn.style.background = 'linear-gradient(45deg, #3498db, #2980b9)';
            btn.innerHTML = '<span class="btn-text">장바구니 담기</span><span class="btn-icon">🛒</span>';
          }, 2000);
        }
        
        console.log(`🛒 장바구니 추가: ${product.name}`);
      }
    }
  
    buyNow(productId) {
      const product = this.products.find(p => p.id === productId);
      if (product) {
        this.showNotification(`${product.name} 구매 페이지로 이동합니다.`, 'info');
        // 실제 구매 페이지로 이동 로직
        console.log(`💳 바로 구매: ${product.name}`);
      }
    }
  
    quickView(productId) {
      const product = this.products.find(p => p.id === productId);
      if (product) {
        // 모달 창으로 제품 상세 정보 표시
        this.showQuickViewModal(product);
        console.log(`👁️ 빠른 보기: ${product.name}`);
      }
    }
  
    toggleWishlist(productId, btn) {
      const isWishlisted = btn.textContent === '❤️';
      
      if (isWishlisted) {
        btn.textContent = '♡';
        btn.style.color = '#6c757d';
        this.showNotification('위시리스트에서 제거되었습니다.', 'info');
      } else {
        btn.textContent = '❤️';
        btn.style.color = '#e74c3c';
        this.showNotification('위시리스트에 추가되었습니다!', 'success');
      }
      
      console.log(`💝 위시리스트 토글: ${productId}, 상태: ${!isWishlisted}`);
    }
  
    viewProduct(productId) {
      const product = this.products.find(p => p.id === productId);
      if (product) {
        console.log(`📄 제품 상세 보기: ${product.name}`);
        // 실제로는 제품 상세 페이지로 라우팅
        this.showNotification(`${product.name} 상세 페이지로 이동합니다.`, 'info');
      }
    }
  
    loadMoreProducts() {
      // 실제로는 API에서 추가 제품을 로드
      this.showNotification('추가 제품을 불러오는 중...', 'info');
      console.log('📦 추가 제품 로딩...');
    }
  
    showQuickViewModal(product) {
      // 간단한 모달 구현
      const modal = document.createElement('div');
      modal.className = 'quick-view-modal';
      modal.innerHTML = `
        <div class="modal-backdrop">
          <div class="modal-content">
            <button class="modal-close">×</button>
            <div class="modal-body">
              <img src="${product.image}" alt="${product.name}">
              <div class="modal-info">
                <h3>${product.name}</h3>
                <div class="modal-rating">${this.createStarRating(product.rating)}</div>
                <div class="modal-price">
                  <span class="current-price">${product.price}</span>
                  ${product.originalPrice ? `<span class="original-price">${product.originalPrice}</span>` : ''}
                </div>
                <p>이 제품의 상세 정보를 여기에 표시합니다...</p>
                <div class="modal-actions">
                  <button class="modal-cart-btn" data-id="${product.id}">장바구니 담기</button>
                  <button class="modal-buy-btn" data-id="${product.id}">바로 구매</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
  
      // 모달 스타일 추가
      if (!document.getElementById('modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
          .quick-view-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10000;
          }
          .modal-backdrop {
            background: rgba(0,0,0,0.8);
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
          }
          .modal-content {
            background: white;
            border-radius: 16px;
            max-width: 600px;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
          }
          .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            z-index: 1;
          }
          .modal-body {
            padding: 2rem;
            display: flex;
            gap: 2rem;
          }
          .modal-body img {
            width: 200px;
            height: 200px;
            object-fit: cover;
            border-radius: 8px;
          }
          .modal-info {
            flex: 1;
          }
          .modal-actions {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
          }
          .modal-cart-btn, .modal-buy-btn {
            flex: 1;
            padding: 0.8rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
          }
          .modal-cart-btn {
            background: #3498db;
            color: white;
          }
          .modal-buy-btn {
            background: #e74c3c;
            color: white;
          }
          @media (max-width: 768px) {
            .modal-body {
              flex-direction: column;
              text-align: center;
            }
            .modal-body img {
              width: 100%;
              max-width: 300px;
              margin: 0 auto;
            }
          }
        `;
        document.head.appendChild(style);
      }
  
      document.body.appendChild(modal);
  
      // 모달 이벤트
      const closeBtn = modal.querySelector('.modal-close');
      const backdrop = modal.querySelector('.modal-backdrop');
      
      const closeModal = () => {
        document.body.removeChild(modal);
      };
  
      closeBtn.addEventListener('click', closeModal);
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeModal();
      });
  
      // 모달 내 버튼 이벤트
      const modalCartBtn = modal.querySelector('.modal-cart-btn');
      const modalBuyBtn = modal.querySelector('.modal-buy-btn');
  
      modalCartBtn.addEventListener('click', () => {
        this.addToCart(product.id);
        closeModal();
      });
  
      modalBuyBtn.addEventListener('click', () => {
        this.buyNow(product.id);
        closeModal();
      });
    }
  
    showNotification(message, type = 'info') {
      const notification = document.createElement('div');
      notification.className = `notification notification-${type}`;
      notification.textContent = message;
  
      // 알림 스타일 추가
      if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
          .notification {
            position: fixed;
            top: 2rem;
            right: 2rem;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 10001;
            animation: slideInRight 0.3s ease;
          }
          .notification-success { background: #27ae60; }
          .notification-info { background: #3498db; }
          .notification-warning { background: #f39c12; }
          .notification-error { background: #e74c3c; }
          @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `;
        document.head.appendChild(style);
      }
  
      document.body.appendChild(notification);
  
      // 3초 후 제거
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
  
    destroy() {
      console.log('🧹 ProductGrid 정리 시작');
      
      // 모든 이벤트 리스너는 element가 DOM에서 제거될 때 자동으로 정리됨
      this.element = null;
      
      console.log('✅ ProductGrid 정리 완료');
    }
  }