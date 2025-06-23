export const detailPageStyles = `
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #fff;
}

.product-image {
position: relative;
width: 600px;
height: 600px;
overflow: hidden;
border-radius: 8px;
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.product-image img {
width: 600px;
height: 600px;
object-fit: cover;
border-radius: 8px;
transition: none; /* 크기 변화 방지 */
display: block;
}

.product-detail {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.product-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin-bottom: 40px;
}

/* 상품 이미지 */
.product-image {
    position: relative;
}

.product-image img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* 상품 정보 */
.product-info {
    padding: 20px 0;
}

.product-category {
    color: #888;
    font-size: 14px;
    margin-bottom: 8px;
}

.product-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 16px;
    line-height: 1.3;
}

.product-price {
    margin-bottom: 24px;
}

.original-price {
    color: #888;
    text-decoration: line-through;
    font-size: 16px;
    margin-right: 8px;
}

.current-price {
    font-size: 28px;
    font-weight: 700;
    color: #333;
}

.price-unit {
    font-size: 18px;
    font-weight: 400;
}

/* 배송 정보 */
.shipping-info {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    padding: 16px 0;
    margin-bottom: 24px;
}

.shipping-row {
    display: flex;
    margin-bottom: 8px;
}

.shipping-row:last-child {
    margin-bottom: 0;
}

.shipping-label {
    color: #666;
    width: 80px;
    font-size: 14px;
}

.shipping-value {
    font-size: 14px;
    color: #333;
}

/* 수량 선택 */
.quantity-section {
    margin-bottom: 24px;
}

.quantity-label {
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
}

.quantity-selector {
    display: flex;
    align-items: center;
    gap: 12px;
}

.quantity-controls {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
}

.quantity-btn {
    background: #f8f9fa;
    border: none;
    width: 32px;
    height: 32px;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
}

.quantity-btn:hover {
    background: #e9ecef;
}

.quantity-btn:disabled {
    background: #f8f9fa;
    color: #ccc;
    cursor: not-allowed;
}

.quantity-input {
    border: none;
    width: 50px;
    height: 32px;
    text-align: center;
    font-size: 14px;
    background: white;
}

.quantity-input:focus {
    outline: none;
}

/* 총 금액 */
.total-section {
    background: #f8f9fa;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 24px;
}

.total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.total-label {
    font-size: 16px;
    color: #666;
}

.total-price {
    font-size: 20px;
    font-weight: 700;
    color: #00a844;
}

/* 버튼들 */
.button-group {
    display: flex;
    gap: 12px;
    margin-bottom: 40px;
}

.btn {
    flex: 1;
    padding: 16px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-cart {
    background: white;
    color: #333;
    border: 1px solid #ddd;
}

.btn-cart:hover {
    background: #f8f9fa;
    border-color: #bbb;
}

.btn-buy {
    background: #00a844;
    color: white;
}

.btn-buy:hover {
    background: #008a3a;
}

/* 탭 메뉴 */
.tab-menu {
    border-bottom: 2px solid #f0f0f0;
    margin-bottom: 30px;
}

.tab-list {
    display: flex;
    list-style: none;
}

.tab-item {
    flex: 1;
}

.tab-button {
    width: 100%;
    padding: 16px 20px;
    background: none;
    border: none;
    font-size: 16px;
    color: #888;
    cursor: pointer;
    transition: all 0.2s;
    border-bottom: 2px solid transparent;
}

.tab-button.active {
    color: #00a844;
    border-bottom-color: #00a844;
    font-weight: 600;
}

.tab-button:hover {
    color: #00a844;
}

/* 탭 콘텐츠 */
.tab-content {
    display: none;
    padding: 20px 0;
}

.tab-content.active {
    display: block;
}

.product-description {
    line-height: 1.8;
    color: #555;
}

/* 반응형 */
@media (max-width: 768px) {
    .product-container {
        grid-template-columns: 1fr;
        gap: 20px;
    }

    .product-detail {
        padding: 15px;
    }

    .button-group {
        flex-direction: column;
    }

    .tab-list {
        overflow-x: auto;
    }

    .tab-button {
        white-space: nowrap;
        min-width: 100px;
    }
}
`