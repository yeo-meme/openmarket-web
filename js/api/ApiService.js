import { tokenManager } from '../utils/TokenManager.js';

// 간단한 API 서비스
export default class ApiService {
    constructor() {
        this.baseUrl = 'https://api.wenivops.co.kr/services/open-market';
        this.requestId = 0;
        this.tokenManager = tokenManager;
    }

    /**
     * 상품 목록 조회 (메인 메서드)
     */
    async getProducts() {
        console.log('📦 상품 목록 조회 시작');

        try {
            
            const url = `${this.baseUrl}/products/`;
            console.log('📡 요청 URL:', url);

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('📡 응답 상태:', {
                status: response.status,
                statusText: response.statusText,
                ok: response.ok
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('✅ 상품 목록 조회 성공:', data);
            return data;
        } catch (error) {
            console.error('❌ 상품 목록 조회 실패:', error);
            throw error;
        }
    }

    /**
     * 범용 GET 요청 메서드
     */
    async get(endpoint, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const url = `${this.baseUrl}${endpoint}${queryString ? `?${queryString}` : ''}`;
        
        console.log('📡 범용 GET 요청:', url);

        try {
            // 토큰이 필요한 요청
            const jwt = this.tokenManager.getAccessToken();
            
            const headers = {
                'Content-Type': 'application/json'
            };

            if (jwt) {
                headers['Authorization'] = `Bearer ${jwt}`;
            }

            const response = await fetch(url, {
                method: 'GET',
                headers: headers
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('✅ 범용 GET 응답 성공:', data);
            return data;

        } catch (error) {
            console.error('❌ 범용 GET 요청 실패:', error);
            throw error;
        }
    }
}

export const apiManager = new ApiService();

// const apiManager = new ApiService();

// export { ApiService, apiManager };

// window.ApiService = ApiService;
// window.apiManager = apiManager;  // ✅ 이제 정의된 apiManager 사용

console.log('✅ API 서비스 및 인스턴스 생성 완료');