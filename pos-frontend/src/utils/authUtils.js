// ✅ Authentication utilities để debug

export const checkAuthState = () => {
    const token = localStorage.getItem('token');
    const userState = JSON.parse(localStorage.getItem('reduxState') || '{}');
    
    console.log('🔍 Auth State Check:', {
        hasToken: !!token,
        tokenLength: token?.length || 0,
        userState: userState.user || 'No user state',
        timestamp: new Date().toISOString()
    });
    
    return { token, userState };
};

export const clearAuthData = () => {
    console.log('🧹 Clearing all authentication data...');
    
    // ✅ Clear localStorage
    try {
        localStorage.removeItem('token');
        localStorage.removeItem('reduxState');
        console.log('🗑️ localStorage cleared');
    } catch (e) {
        console.log('⚠️ Cannot access localStorage:', e.message);
    }
    
    // ✅ Clear sessionStorage
    try {
        sessionStorage.clear();
        console.log('🗑️ sessionStorage cleared');
    } catch (e) {
        console.log('⚠️ Cannot access sessionStorage:', e.message);
    }
    
    // ✅ Clear cookies
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.onrender.com;';
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.netlify.app;';
    console.log('🍪 Cookies cleared');
    
    // ✅ Clear Redux state (nếu có)
    try {
        if (window.__REDUX_DEVTOOLS_EXTENSION__) {
            window.__REDUX_DEVTOOLS_EXTENSION__.connect().dispatch({
                type: 'RESET_STATE'
            });
            console.log('🔄 Redux DevTools reset');
        }
    } catch (e) {
        console.log('⚠️ Cannot reset Redux DevTools:', e.message);
    }
    
    console.log('✅ All authentication data cleared');
};

export const forceLogout = (dispatch, navigate) => {
    console.log('🚪 Force logout initiated');
    
    // Clear all auth data
    clearAuthData();
    
    // Remove user from Redux
    if (dispatch) {
        dispatch(removeUser());
        console.log('👤 User removed from Redux state');
    }
    
    // Navigate to auth page
    if (navigate) {
        navigate('/auth');
        console.log('🚀 Redirected to auth page');
    }
};

export const testAuthFlow = async () => {
    try {
        const token = localStorage.getItem('token');
        console.log('🧪 Testing auth flow with token:', token ? 'exists' : 'not found');
        
        if (!token) {
            console.log('❌ No token found');
            return false;
        }
        
        // Test API call
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
        console.log('🧪 API Response:', response.status, response.ok);
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Auth test successful:', data);
            return true;
        } else {
            console.log('❌ Auth test failed:', response.status);
            return false;
        }
    } catch (error) {
        console.log('❌ Auth test error:', error);
        return false;
    }
}; 