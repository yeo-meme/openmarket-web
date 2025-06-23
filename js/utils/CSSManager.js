class StyleManager {
    constructor() {
        this.loadedStyles = new Set();
    }

    loadStyle(styleId, cssContent) {
        if (this.loadedStyles.has(styleId)) {
            return;
        }

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = cssContent;
        document.head.appendChild(style);
        
        this.loadedStyles.add(styleId);
        console.log(`✅ 스타일 로드됨: ${styleId}`);
    }

    unloadStyle(styleId) {
        const style = document.getElementById(styleId);
        if (style) {
            style.remove();
            this.loadedStyles.delete(styleId);
            console.log(`🗑️ 스타일 제거됨: ${styleId}`);
        }
    }

    unloadAllStyles() {
        this.loadedStyles.forEach(styleId => {
            this.unloadStyle(styleId);
        });
    }
}

export const styleManager = new StyleManager();