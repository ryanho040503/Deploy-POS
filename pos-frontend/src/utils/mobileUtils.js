// ✅ Utility functions cho mobile compatibility

export const isMobileDevice = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
};

export const isSafari = () => {
    const userAgent = navigator.userAgent;
    return /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
};

export const isIOS = () => {
    const userAgent = navigator.userAgent;
    return /iPad|iPhone|iPod/.test(userAgent);
};

export const getDeviceInfo = () => {
    return {
        isMobile: isMobileDevice(),
        isSafari: isSafari(),
        isIOS: isIOS(),
        userAgent: navigator.userAgent,
        platform: navigator.userAgentData?.platform || 'unknown' // ✅ Sử dụng userAgentData thay vì platform
    };
};

export const logDeviceInfo = () => {
    const deviceInfo = getDeviceInfo();
    console.log('📱 Device Info:', deviceInfo);
    return deviceInfo;
};

// ✅ Function để check cookie support
export const checkCookieSupport = () => {
    try {
        document.cookie = "testCookie=1";
        const hasCookie = document.cookie.indexOf("testCookie=") !== -1;
        document.cookie = "testCookie=1; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        return hasCookie;
    } catch (e) {
        console.log('❌ Cookie not supported:', e);
        return false;
    }
};

// ✅ Function để check localStorage support
export const checkLocalStorageSupport = () => {
    try {
        const test = 'test';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        console.log('❌ localStorage not supported:', e);
        return false;
    }
}; 