import React, { useState, useEffect } from 'react';

const IPadTest = () => {
    const [deviceInfo, setDeviceInfo] = useState({});
    const [storageTest, setStorageTest] = useState({});
    const [networkTest, setNetworkTest] = useState({});
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Device detection
        const info = {
            userAgent: navigator.userAgent,
            platform: navigator.userAgentData?.platform || navigator.platform || 'unknown',
            isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
            isSafari: /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent),
            isIPad: /iPad/.test(navigator.userAgent),
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,
            pixelRatio: window.devicePixelRatio,
            orientation: window.screen.orientation?.type || 'unknown',
            cookiesEnabled: navigator.cookieEnabled,
            language: navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
        setDeviceInfo(info);

        // Storage test
        const storage = {
            localStorage: false,
            sessionStorage: false,
            cookies: false,
            indexedDB: false
        };

        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            storage.localStorage = true;
        } catch (e) {
            console.log('❌ localStorage not available:', e.message);
        }

        try {
            sessionStorage.setItem('test', 'test');
            sessionStorage.removeItem('test');
            storage.sessionStorage = true;
        } catch (e) {
            console.log('❌ sessionStorage not available:', e.message);
        }

        storage.cookies = navigator.cookieEnabled;

        try {
            if ('indexedDB' in window) {
                storage.indexedDB = true;
            }
        } catch (e) {
            console.log('❌ indexedDB not available:', e.message);
        }

        setStorageTest(storage);

        // Network test
        const network = {
            online: navigator.onLine,
            connection: navigator.connection ? {
                effectiveType: navigator.connection.effectiveType,
                downlink: navigator.connection.downlink,
                rtt: navigator.connection.rtt
            } : null
        };
        setNetworkTest(network);

        // Listen for online/offline events
        const handleOnline = () => setNetworkTest(prev => ({ ...prev, online: true }));
        const handleOffline = () => setNetworkTest(prev => ({ ...prev, online: false }));

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const runAPITest = async () => {
        try {
            console.log('🧪 Testing API connection...');
            const response = await fetch('https://deploy-pos-qo3n.onrender.com/api/user', {
                method: 'GET',
                credentials: 'include'
            });
            console.log('✅ API Test Response:', response.status, response.statusText);
        } catch (error) {
            console.error('❌ API Test Failed:', error.message);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed top-4 right-4 bg-purple-600 text-white p-3 rounded-lg shadow-lg z-50 max-w-xs">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold">🍎 iPad Test</span>
                <button
                    onClick={() => setIsVisible(false)}
                    className="text-xs bg-purple-700 px-2 py-1 rounded"
                >
                    ✕
                </button>
            </div>

            {/* Device Info */}
            <div className="text-xs mb-2">
                <div>📱 Platform: {deviceInfo.platform}</div>
                <div>🌐 Safari: {deviceInfo.isSafari ? '✅' : '❌'}</div>
                <div>🍎 iPad: {deviceInfo.isIPad ? '✅' : '❌'}</div>
                <div>📐 Screen: {deviceInfo.screenWidth}x{deviceInfo.screenHeight}</div>
                <div>🔍 Viewport: {deviceInfo.viewportWidth}x{deviceInfo.viewportHeight}</div>
                <div>📊 Pixel Ratio: {deviceInfo.pixelRatio}</div>
                <div>🔄 Orientation: {deviceInfo.orientation}</div>
            </div>

            {/* Storage Test */}
            <div className="text-xs mb-2">
                <div>💾 Storage:</div>
                <div>  localStorage: {storageTest.localStorage ? '✅' : '❌'}</div>
                <div>  sessionStorage: {storageTest.sessionStorage ? '✅' : '❌'}</div>
                <div>  Cookies: {storageTest.cookies ? '✅' : '❌'}</div>
                <div>  IndexedDB: {storageTest.indexedDB ? '✅' : '❌'}</div>
            </div>

            {/* Network Test */}
            <div className="text-xs mb-2">
                <div>🌐 Network:</div>
                <div>  Online: {networkTest.online ? '✅' : '❌'}</div>
                {networkTest.connection && (
                    <>
                        <div>  Type: {networkTest.connection.effectiveType}</div>
                        <div>  Speed: {networkTest.connection.downlink} Mbps</div>
                    </>
                )}
            </div>

            {/* Test Button */}
            <button
                onClick={runAPITest}
                className="w-full bg-purple-700 text-white text-xs py-1 rounded hover:bg-purple-800"
            >
                🧪 Test API Connection
            </button>
        </div>
    );
};

export default IPadTest; 