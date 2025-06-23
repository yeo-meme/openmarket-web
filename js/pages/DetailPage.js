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
              <button class="btn-back" onclick="history.back()">← 뒤로가기</button>
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

    this.contentContainer = document.createElement('div');
    this.contentContainer.className = 'detail-content-wrapper';
    this.element.appendChild(this.contentContainer);
    this.contentContainer.innerHTML = detailPageTemplate(this.product);
    this.loadStyles();

    this.bindEvents();
  }

  bindEvents() {
    const cartBtn = this.element.querySelector('.btn-cart');
    const buyBtn = this.element.querySelector('.btn-buy');

    cartBtn?.addEventListener('click', () => {
      console.log('🛒 장바구니에 추가:', this.product.name);
      alert(`${this.product.name}을 장바구니에 추가했습니다!`);
    });

    buyBtn?.addEventListener('click', () => {
      console.log('💰 바로 구매:', this.product.name);
      alert(`${this.product.name} 구매 페이지로 이동합니다!`);
    });
  }
}
