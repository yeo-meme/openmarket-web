

export class TokenManager {
    constructor() {
        this.apiBaseUrl = 'https://api.wenivops.co.kr/services/open-market';
        this.ACCESS_TOKEN_DURATION = 5 * 60 * 1000; // 5분
        this.REFRESH_TOKEN_DURATION = 24 * 60 * 60 * 1000; // 1일
        
        // 자동 갱신 타이머
        this.refreshTimer = null;
        this.initAutoRefresh();
    }

    /**
     * 토큰 저장 (발급 시간 포함)
     */
    saveTokens(accessToken, refreshToken) {
        const now = Date.now();
        
        const tokenData = {
            accessToken,
            refreshToken,
            accessTokenIssuedAt: now,
            refreshTokenIssuedAt: now,
            accessTokenExpiresAt: now + this.ACCESS_TOKEN_DURATION,
            refreshTokenExpiresAt: now + this.REFRESH_TOKEN_DURATION
        };

        localStorage.setItem('tokenData', JSON.stringify(tokenData));
        
        console.log('💾 토큰 저장 완료:', {
            accessToken: accessToken.substring(0, 20) + '...',
            refreshToken: refreshToken.substring(0, 20) + '...',
            accessTokenExpiresAt: new Date(tokenData.accessTokenExpiresAt).toLocaleString(),
            refreshTokenExpiresAt: new Date(tokenData.refreshTokenExpiresAt).toLocaleString()
        });

        this.setupAutoRefresh();
    }

    /**
     * 토큰 데이터 가져오기
     */
    getTokenData() {
        try {
            const tokenData = localStorage.getItem('tokenData');
            return tokenData ? JSON.parse(tokenData) : null;
        } catch (error) {
            console.error('❌ 토큰 데이터 파싱 오류:', error);
            return null;
        }
    }

    /**
     * 유효한 액세스 토큰 가져오기 (자동 갱신 포함)
     */
    async getValidAccessToken() {
        const tokenData = this.getTokenData();
        
        if (!tokenData) {
            console.log('❌ 토큰 데이터 없음');
            return null;
        }

        const now = Date.now();
        
        // 액세스 토큰이 유효한 경우
        if (now < tokenData.accessTokenExpiresAt) {
            console.log('✅ 유효한 액세스 토큰 사용');
            return tokenData.accessToken;
        }

        // 리프레시 토큰도 만료된 경우
        if (now >= tokenData.refreshTokenExpiresAt) {
            console.log('❌ 리프레시 토큰 만료 - 재로그인 필요');
            this.clearTokens();
            return null;
        }

        // 액세스 토큰 갱신 시도
        console.log('🔄 액세스 토큰 갱신 시도');
        return await this.refreshAccessToken();
    }

    /**
     * 액세스 토큰 갱신
     */
    async refreshAccessToken() {
        const tokenData = this.getTokenData();
        
        if (!tokenData || !tokenData.refreshToken) {
            console.log('❌ 리프레시 토큰 없음');
            return null;
        }

        try {
            console.log('📡 리프레시 토큰으로 액세스 토큰 갱신 요청');
            
            const response = await fetch(`${this.apiBaseUrl}/accounts/token/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    refresh: tokenData.refreshToken
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('✅ 토큰 갱신 성공:', data);
                
                // 새 액세스 토큰 저장 (리프레시 토큰은 그대로 유지)
                this.saveTokens(data.access, tokenData.refreshToken);
                
                return data.access;
            } else {
                const errorData = await response.json();
                console.log('❌ 토큰 갱신 실패:', errorData);
                
                // 리프레시 토큰도 무효한 경우 모든 토큰 삭제
                this.clearTokens();
                return null;
            }
            
        } catch (error) {
            console.error('❌ 토큰 갱신 네트워크 오류:', error);
            return null;
        }
    }

    /**
     * 토큰 상태 확인
     */
    getTokenStatus() {
        const tokenData = this.getTokenData();
        
        if (!tokenData) {
            return {
                hasTokens: false,
                accessTokenValid: false,
                refreshTokenValid: false,
                needsRefresh: false
            };
        }

        const now = Date.now();
        const accessTokenValid = now < tokenData.accessTokenExpiresAt;
        const refreshTokenValid = now < tokenData.refreshTokenExpiresAt;
        const needsRefresh = !accessTokenValid && refreshTokenValid;

        return {
            hasTokens: true,
            accessTokenValid,
            refreshTokenValid,
            needsRefresh,
            accessTokenExpiresAt: tokenData.accessTokenExpiresAt,
            refreshTokenExpiresAt: tokenData.refreshTokenExpiresAt
        };
    }

    /**
     * 자동 갱신 타이머 설정
     */
    setupAutoRefresh() {

        // 기존 타이머 클리어
        if (this.refreshTimer) {
            clearTimeout(this.refreshTimer);
        }

        const tokenData = this.getTokenData();
        if (!tokenData) return;

        const now = Date.now();
        const timeUntilExpiry = tokenData.accessTokenExpiresAt - now;
        
        // 만료 1분 전에 갱신 시도
        const refreshTime = Math.max(0, timeUntilExpiry - 60000);

        console.log('⏰ 자동 갱신 타이머 설정:', {
            현재시간: new Date(now).toLocaleString(),
            만료시간: new Date(tokenData.accessTokenExpiresAt).toLocaleString(),
            갱신예정시간: new Date(now + refreshTime).toLocaleString()
        });

        this.refreshTimer = setTimeout(async () => {
            console.log('🔄 자동 토큰 갱신 실행');
            await this.refreshAccessToken();
        }, refreshTime);
    }

    /**
     * 초기화 시 자동 갱신 설정
     */
    initAutoRefresh() {
        const status = this.getTokenStatus();
        
        if (status.needsRefresh) {
            console.log('🔄 초기화 시 토큰 갱신 필요');
            this.refreshAccessToken();
        } else if (status.accessTokenValid) {
            this.setupAutoRefresh();
        }
    }

    /**
     * 모든 토큰 삭제
     */
    clearTokens() {
        localStorage.removeItem('tokenData');
        localStorage.removeItem('userInfo');
        
        // 타이머 클리어
        if (this.refreshTimer) {
            clearTimeout(this.refreshTimer);
            this.refreshTimer = null;
        }
        
        console.log('🧹 모든 토큰 삭제 완료');
    }

    /**
     * 로그아웃
     */
    logout() {
        this.clearTokens();
        console.log('🚪 로그아웃 완료');
        console.log('🚪 로그아웃 시작');

        // 삭제 전 현재 저장된 값들 확인
        console.log('📋 삭제 전 로컬스토리지 상태:');
        console.log('  - accessToken:', localStorage.getItem('accessToken'));
        console.log('  - refreshToken:', localStorage.getItem('refreshToken'));
        console.log('  - userInfo:', localStorage.getItem('userInfo'));

        // 로컬스토리지 토큰 및 사용자 정보 삭제
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userInfo');

        // 삭제 후 확인
        console.log('🧹 삭제 후 로컬스토리지 상태:');
        console.log('  - accessToken:', localStorage.getItem('accessToken'));
        console.log('  - refreshToken:', localStorage.getItem('refreshToken'));
        console.log('  - userInfo:', localStorage.getItem('userInfo'));

        console.log('✅ 로그아웃 완료 - 모든 토큰 삭제됨');
        
        // 로그인 페이지로 리다이렉트
        if (window.router) {
            window.router.navigateTo('/login');
        }
    }

    /**
     * 토큰 갱신 시간 모니터링 시작
     */
    startTokenMonitoring() {
        // 기존 모니터링이 있으면 중지
        if (this.monitoringInterval) {
            clearInterval(this.monitoringInterval);
        }
        
        this.monitoringInterval = setInterval(() => {
            const tokenData = this.getTokenData();
            
            if (!tokenData) {
                console.log('⏰ 토큰 없음 - 로그인 필요');
                return;
            }
            
            const now = Date.now();
            const accessTimeLeft = tokenData.accessTokenExpiresAt - now;
            const refreshTimeLeft = tokenData.refreshTokenExpiresAt - now;
            
            // 액세스 토큰 남은 시간
            const accessMinutes = Math.floor(accessTimeLeft / (1000 * 60));
            const accessSeconds = Math.floor((accessTimeLeft % (1000 * 60)) / 1000);
            
            // 리프레시 토큰 남은 시간
            const refreshHours = Math.floor(refreshTimeLeft / (1000 * 60 * 60));
            const refreshMinutes = Math.floor((refreshTimeLeft % (1000 * 60 * 60)) / (1000 * 60));
            
            if (accessTimeLeft > 0) {
                console.log(`⏰ 액세스 토큰 갱신까지: ${accessMinutes}분 ${accessSeconds}초 남음 | 리프레시 토큰: ${refreshHours}시간 ${refreshMinutes}분 남음`);
            } else {
                console.log('🔄 액세스 토큰 만료됨 - 갱신 필요');
            }
            
            // 갱신 타이머 상태
            const timerStatus = this.refreshTimer ? '활성' : '비활성';
            console.log(`🤖 자동갱신 타이머: ${timerStatus} | 현재시간: ${new Date().toLocaleTimeString()}`);
            
        }, 1000); // 1초마다 확인
        
        console.log('🎯 토큰 모니터링 시작됨 (1초마다 출력)');
    }

}

// 전역 토큰 매니저 인스턴스
export const tokenManager = new TokenManager();
