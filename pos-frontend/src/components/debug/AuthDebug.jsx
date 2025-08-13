import React from 'react';
import { useSelector } from 'react-redux';

const AuthDebug = () => {
    const userState = useSelector(state => state.user);
    
    // ✅ Kiểm tra token an toàn cho incognito mode
    let token = null;
    try {
        token = localStorage.getItem('token');
    } catch (e) {
        console.log('❌ Cannot access localStorage in AuthDebug');
    }

    return (
        <div className="fixed top-16 left-4 bg-blue-500 text-white p-2 rounded z-50 text-xs">
            <div>Auth: {userState.isAuth ? '✅' : '❌'}</div>
            <div>Token: {token ? '✅' : '❌'}</div>
            <div>User: {userState.name || 'None'}</div>
            <div>Mode: {token ? 'Normal' : 'Incognito?'}</div>
        </div>
    );
};

export default AuthDebug; 