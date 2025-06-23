class ProductApiService extends ApiService {
    /**
     * 상품 목록 조회
     */
    async getProducts(params = {}) {
        const defaultParams = {
            page: 1,
            page_size: 12
        };

        const queryParams = { ...defaultParams, ...params };
        
        console.log('📦 상품 목록 조회 요청:', queryParams);
        
        try {
            const response = await this.get('/products', queryParams);
            
            console.log('📦 상품 목록 조회 성공:', {
                총개수: response.count,
                현재페이지상품수: response.results?.length || 0,
                다음페이지: response.next ? '있음' : '없음'
            });

            return response;
        } catch (error) {
            console.error('❌ 상품 목록 조회 실패:', error);
            throw new Error('상품을 불러오는데 실패했습니다.');
        }
    }

    /**
     * 특정 상품 상세 조회
     */
    async getProduct(productId) {
        console.log(`📋 상품 상세 조회: ID ${productId}`);
        
        try {
            const product = await this.get(`/products/${productId}`);
            
            console.log('📋 상품 상세 조회 성공:', {
                상품명: product.name,
                가격: product.price
            });

            return product;
        } catch (error) {
            console.error(`❌ 상품 상세 조회 실패 (ID: ${productId}):`, error);
            throw new Error('상품 정보를 불러오는데 실패했습니다.');
        }
    }

    /**
     * 상품 검색
     */
    async searchProducts(query, params = {}) {
        const searchParams = {
            search: query,
            page: 1,
            page_size: 12,
            ...params
        };

        console.log('🔍 상품 검색 요청:', { 검색어: query });

        try {
            const response = await this.get('/products', searchParams);
            
            console.log('🔍 상품 검색 성공:', {
                검색어: query,
                결과수: response.count
            });

            return response;
        } catch (error) {
            console.error(`❌ 상품 검색 실패 (검색어: ${query}):`, error);
            throw new Error('검색 중 오류가 발생했습니다.');
        }
    }
}

// 내보내기
window.ApiService = ApiService;
window.ProductApiService = ProductApiService;