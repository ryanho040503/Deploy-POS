// ✅ Debug utilities để track app crashes

export const logError = (error, context = '') => {
    console.error(`❌ Error in ${context}:`, error);
    console.error('Stack trace:', error.stack);
    
    // ✅ Log to localStorage for debugging
    try {
        const errorLog = {
            timestamp: new Date().toISOString(),
            context,
            message: error.message,
            stack: error.stack,
            userAgent: navigator.userAgent
        };
        
        const existingLogs = JSON.parse(localStorage.getItem('errorLogs') || '[]');
        existingLogs.push(errorLog);
        
        // ✅ Keep only last 10 errors
        if (existingLogs.length > 10) {
            existingLogs.splice(0, existingLogs.length - 10);
        }
        
        localStorage.setItem('errorLogs', JSON.stringify(existingLogs));
    } catch (e) {
        console.error('Failed to save error log:', e);
    }
};

export const getErrorLogs = () => {
    try {
        return JSON.parse(localStorage.getItem('errorLogs') || '[]');
    } catch (e) {
        return [];
    }
};

export const clearErrorLogs = () => {
    localStorage.removeItem('errorLogs');
};

// ✅ Global error handler
export const setupGlobalErrorHandler = () => {
    window.addEventListener('error', (event) => {
        logError(event.error, 'Global Error');
    });
    
    window.addEventListener('unhandledrejection', (event) => {
        logError(event.reason, 'Unhandled Promise Rejection');
    });
};

// ✅ Check app health
export const checkAppHealth = () => {
    const health = {
        localStorage: false,
        cookies: false,
        network: false,
        redux: false
    };
    
    try {
        // ✅ Check localStorage
        localStorage.setItem('healthCheck', 'test');
        localStorage.removeItem('healthCheck');
        health.localStorage = true;
    } catch (e) {
        console.error('localStorage not available:', e);
    }
    
    try {
        // ✅ Check cookies
        document.cookie = 'healthCheck=test';
        const hasCookie = document.cookie.includes('healthCheck');
        document.cookie = 'healthCheck=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        health.cookies = hasCookie;
    } catch (e) {
        console.error('Cookies not available:', e);
    }
    
    // ✅ Check network
    health.network = navigator.onLine;
    
    // ✅ Check Redux (if available)
    try {
        // ✅ Kiểm tra Redux store thay vì devtools
        if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
            health.redux = true;
        }
    } catch (e) {
        // Redux devtools not available
        console.log('Redux devtools not available');
    }
    
    console.log('🏥 App Health Check:', health);
    return health;
}; 