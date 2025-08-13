import React from 'react';
import { getUserData } from '../https/index';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setUser, removeUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { logError } from '../utils/debugUtils';

const useLoadData = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // ✅ Kiểm tra localStorage support
                let token = null;
                try {
                    token = localStorage.getItem('token');
                    console.log('🔍 Checking token:', token ? 'exists' : 'not found');
                } catch (e) {
                    console.log('❌ localStorage not available (incognito mode?)');
                    dispatch(removeUser());
                    navigate("/auth");
                    return;
                }
                
                if (!token) {
                    console.log('❌ No token found, redirecting to auth');
                    dispatch(removeUser());
                    navigate("/auth");
                    return;
                }

                // ✅ Thử gọi API với token
                const { data } = await getUserData();
                console.log('✅ User data loaded:', data);
                
                if (data && data.data) {
                    const { _id, name, email, phone, role } = data.data;
                    dispatch(setUser({ _id, name, email, phone, role, token }));
                    console.log('✅ User authenticated successfully');
                } else {
                    throw new Error('Invalid user data');
                }

            } catch (error) {
                console.log('❌ Failed to load user data:', error);
                logError(error, 'useLoadData');
                
                // ✅ Clear invalid token và redirect
                try {
                    localStorage.removeItem('token');
                } catch (e) {
                    console.log('❌ Cannot clear localStorage');
                }
                
                dispatch(removeUser());
                navigate("/auth");
            } finally {
                setIsLoading(false);
            }
        }

        fetchUser();
    }, [dispatch, navigate]);

    return isLoading;
};

export default useLoadData;