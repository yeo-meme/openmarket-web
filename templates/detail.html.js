export const productImageTemplate = (product) => `
<!-- 상품 정보 -->
        <div class="product-info">
           <div class="product-image">
        <img src="${product.image}" alt="${product.name}"></div>
</div>
`



export const productInfoTemplate = (product) => `
    <div class="product-info">
        <div class="product-category">${product.info || '딸기곰스토어'}</div>
        <h1 class="product-title">${product.name}</h1>
        <div class="product-price">
            <span class="current-price">${product.price.toLocaleString()}<span class="price-unit">원</span></span>
        </div>
   <div class="shipping-info">
                <div class="shipping-row">
                    <span class="shipping-label">무료배송</span>
                    <span class="shipping-value">/ 무료배송</span>
                </div>
            </div>

            <div class="quantity-section">
                <div class="quantity-label">수량을 선택</div>
                <div class="quantity-selector">
                    <div class="quantity-controls">
                        <button class="quantity-btn" data-action="decrease">-</button>
                        <input type="number" class="quantity-input" value="1" min="1" max="99" id="quantity data-price="${product.price}">
                        <button class="quantity-btn" data-action="increase">+</button>
                    </div>
                </div>
            </div>

            <div class="total-section">
                <div class="total-row">
                    <span class="total-label">총 상품 금액</span>
                    <div>
                        <span style="color: #00a844; font-size: 14px;">총 수량 1개</span>
                        <span class="total-price" id="totalPrice">${product.price.toLocaleString()}원</span>
                    </div>
                </div>
            </div>

            <div class="button-group">
                <button class="btn btn-cart">장바구니</button>
                <button class="btn btn-buy">구매하기</button>
            </div>
        </div>
    </div>
`;

export const tabMenuTemplate = () => `
    <div class="tab-menu">
        <ul class="tab-list">
        <li class="tab-item">
                <button class="tab-button active" onclick="showTab('detail')">배송</button>
            </li>
            <li class="tab-item">
                <button class="tab-button" onclick="showTab('review')">리뷰</button>
            </li>
            <li class="tab-item">
                <button class="tab-button" onclick="showTab('qna')">Q&A</button>
            </li>
            <li class="tab-item">
                <button class="tab-button" onclick="showTab('return')">반품/교환정보</button>
            </li>
        </ul>
    </div>
`;

export const tabContentTemplate = (product) => `
    <div id="detail" class="tab-content active">
        <div class="product-description">
            <h3>상품 상세 정보</h3>
            <p>${product.info || '상품 상세 정보가 없습니다.'}</p>
        </div>
    </div>
    <!-- 다른 탭 콘텐츠들... -->
`;

export const detailPageTemplate = (product) => `
    <div class="product-container">
        ${productImageTemplate(product)}
        ${productInfoTemplate(product)}
    </div>
    ${tabMenuTemplate()}
    ${tabContentTemplate(product)}
`;