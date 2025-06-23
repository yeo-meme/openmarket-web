import { apiManager } from '../api/ApiService.js';
import Header from '../components/Header.js';
import { detailPageTemplate } from '../../templates/detail.html.js'
import { detailPageStyles } from '../../styles/detail.css.js';
import { styleManager } from '../utils/CSSManager.js';


export default class DetailPage {
  constructor(productId, productData = null) {
    this.productId = productId;
    this.product = productData;
    this.element = null;
    this.apiManager = apiManager;
    this.contentContainer = null;

    this.header = new Header();
    this.maxStock = 0;
  }

  async render() {
    this.element = document.createElement('div');
    this.element.className = 'detail-page';


    const headerSection = this.header.render();
    this.element.appendChild(headerSection);


    console.log('🎨 Header 렌더링 결과:', headerSection);
    console.log('🎨 Header HTML:', headerSection.outerHTML);


    if (this.product) {
      // ✅ 이미 데이터가 있으면 즉시 렌더링
      console.log('⚡ 캐시된 데이터로 즉시 렌더링');
      this.updateDetailUI();
    } else {
      // ✅ 데이터가 없으면 로딩 화면 표시 후 API 호출
      console.log('🔄 디테일 없음 API에서 데이터 로딩');
      this.element.innerHTML = this.getLoadingHTML();
      // this.loadProductData();
    }

    return this.element;
  }


  loadStyles() {
    styleManager.loadStyle(this.styleId, detailPageStyles);
  }

  async loadProductData() {
    try {
      this.product = await this.apiManager.getProduct(this.productId);
      this.updateDetailUI();
    } catch (error) {
      console.error('❌ 상품 로딩 실패:', error);
      this.showError();
      this.showLoading();
    }
  }

  showLoading() {
    this.contentContainer.innerHTML = this.getLoadingHTML();
  }

  getLoadingHTML() {
    return `
      <div class="detail-container">
          <div class="detail-header">
             
          </div>
          <div class="detail-loading">
              <div class="loading-spinner"></div>
              <p>상품 정보를 불러오는 중...</p>
          </div>
      </div>
  `;
  }

  updateDetailUI() {

    if (!this.product) {
      this.showError();
      return;
    }

    this.maxStock = this.product.stock || 0;
    console.log('📦 상품 재고량:', this.product.stock);


    this.contentContainer = document.createElement('div');
    this.contentContainer.className = 'detail-content-wrapper';
    this.element.appendChild(this.contentContainer);
    this.contentContainer.innerHTML = detailPageTemplate(this.product);
   
   
    this.loadStyles();
    this.bindEvents();
    this.simpleStockCheck(); // 간단한 체크로 대체
  }



    // ✅ 수량 증가
    increaseQuantity() {
      const quantityInput = this.contentContainer.querySelector('.quantity-input');
      const currentValue = parseInt(quantityInput.value) || 1;
      
      if (currentValue < this.maxStock) {
        quantityInput.value = currentValue + 1;
        this.updateTotalPrice();
        console.log(`➕ 수량 증가: ${currentValue + 1}/${this.maxStock}`);
    } else {
        console.log(`⚠️ 재고 부족: 최대 ${this.maxStock}개`);
        this.showStockAlert();
    }
  }

  showStockAlert() {
    const stockWarning = this.contentContainer.querySelector('#stockWarning');
    const warningText = stockWarning.querySelector('.warning-text');
    
    warningText.textContent = `⚠️ 재고가 ${this.maxStock}개 밖에 없습니다`;
    stockWarning.style.display = 'block';
    
    // 3초 후 자동 숨김
    setTimeout(() => {
        stockWarning.style.display = 'none';
    }, 3000);
}


  simpleStockCheck() {
    const quantityInput = this.contentContainer.querySelector('.quantity-input');
    if (quantityInput && this.maxStock > 0) {
        quantityInput.max = this.maxStock;
        console.log(`📊 수량 제한 설정: 최대 ${this.maxStock}개`);
    }
}

  // ✅ 수량 감소
  decreaseQuantity() {
      const quantityInput = this.contentContainer.querySelector('.quantity-input');
      const currentValue = parseInt(quantityInput.value) || 1;
      
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
        this.updateTotalPrice();
        // this.checkStock();
        console.log(`➖ 수량 감소: ${currentValue - 1}`);
    }
  }

  // ✅ 현재 수량 가져오기
  getQuantity() {
      const quantityInput = this.contentContainer.querySelector('.quantity-input');
      return parseInt(quantityInput.value) || 1;
  }

  // ✅ 총 금액 업데이트
  updateTotalPrice() {
      const quantityInput = this.contentContainer.querySelector('.quantity-input');
      const totalPriceElement = this.contentContainer.querySelector('.total-price');
      // const totalQuantityElement = this.contentContainer.querySelector('.total-quantity');
      
      const quantity = parseInt(quantityInput.value) || 1;
      const basePrice = this.product.price;
      const totalPrice = basePrice * quantity;
      
      // ✅ UI 업데이트
      totalPriceElement.textContent = totalPrice.toLocaleString() + '원';
      // totalQuantityElement.textContent = `총 수량 ${quantity}개`;
      
      console.log(`💰 총 금액 업데이트: ${quantity}개 × ${basePrice.toLocaleString()}원 = ${totalPrice.toLocaleString()}원`);
  }

  // ✅ 수량 입력 유효성 검사
  validateQuantity() {
      const quantityInput = this.contentContainer.querySelector('.quantity-input');
      let value = parseInt(quantityInput.value);
      
      if (isNaN(value) || value < 1) {
          quantityInput.value = 1;
      } else if (value > 99) {
          quantityInput.value = 99;
      }
      
      this.updateTotalPrice();
  }

  bindEvents() {
    console.log('🔗 이벤트 바인딩 시작');

    // ✅ 이벤트 위임으로 처리
    this.contentContainer.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        
        if (action === 'decrease') {
            console.log('➖ 감소 버튼 클릭');
            this.decreaseQuantity();
        } 
        else if (action === 'increase') {
            console.log('➕ 증가 버튼 클릭');
            this.increaseQuantity();
        }
        else if (e.target.classList.contains('btn-cart')) {
            console.log('🛒 장바구니 버튼 클릭');
            const quantity = this.getQuantity();
            alert(`${this.product.name}을 ${quantity}개 장바구니에 추가했습니다!`);
        }
        else if (e.target.classList.contains('btn-buy')) {
            console.log('💰 구매 버튼 클릭');
            const quantity = this.getQuantity();
            alert(`${this.product.name} ${quantity}개 구매 페이지로 이동합니다!`);
        }
    });

    // 입력 이벤트는 별도 처리
    const quantityInput = this.contentContainer.querySelector('.quantity-input');
    quantityInput?.addEventListener('change', () => {
        console.log('🔢 수량 변경');
        this.validateQuantity();
    });

    quantityInput?.addEventListener('input', () => {
        console.log('⌨️ 수량 입력');
        this.updateTotalPrice();
    });

    console.log('✅ 이벤트 바인딩 완료');
}
}
