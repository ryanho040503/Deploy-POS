import React, { useState, useEffect } from 'react';

const IncognitoTest = () => {
    const [localStorageAvailable, setLocalStorageAvailable] = useState(true);
    const [sessionStorageAvailable, setSessionStorageAvailable] = useState(true);
    const [cookiesAvailable, setCookiesAvailable] = useState(true);

    useEffect(() => {
        // Test localStorage
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            setLocalStorageAvailable(true);
        } catch (e) {
            setLocalStorageAvailable(false);
            console.log('❌ localStorage not available');
        }

        // Test sessionStorage
        try {
            sessionStorage.setItem('test', 'test');
            sessionStorage.removeItem('test');
            setSessionStorageAvailable(true);
        } catch (e) {
            setSessionStorageAvailable(false);
            console.log('❌ sessionStorage not available');
        }

        // Test cookies
        try {
            document.cookie = 'test=test';
            const hasCookie = document.cookie.includes('test');
            document.cookie = 'test=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            setCookiesAvailable(hasCookie);
        } catch (e) {
            setCookiesAvailable(false);
            console.log('❌ cookies not available');
        }
    }, []);

    return (
        <div className="fixed top-32 left-4 bg-orange-500 text-white p-2 rounded z-50 text-xs">
            <div>localStorage: {localStorageAvailable ? '✅' : '❌'}</div>
            <div>sessionStorage: {sessionStorageAvailable ? '✅' : '❌'}</div>
            <div>Cookies: {cookiesAvailable ? '✅' : '❌'}</div>
            <div>Mode: {!localStorageAvailable ? 'Incognito' : 'Normal'}</div>
        </div>
    );
};

export default IncognitoTest; 