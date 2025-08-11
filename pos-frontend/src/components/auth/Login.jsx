import React, { useState, useEffect}  from 'react';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../https/index';
import { enqueueSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { logDeviceInfo, checkCookieSupport, checkLocalStorageSupport } from '../../utils/mobileUtils';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    // ✅ Log device info khi component mount
    useEffect(() => {
        const deviceInfo = logDeviceInfo();
        console.log('🍪 Cookie support:', checkCookieSupport());
        console.log('💾 localStorage support:', checkLocalStorageSupport());
        
        // ✅ Show device info cho user nếu là mobile
        if (deviceInfo.isMobile) {
            enqueueSnackbar(`Mobile device detected: ${deviceInfo.platform}`, { variant: "info" });
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle registration logic here
        loginMutation.mutate(formData);
    }

    const loginMutation = useMutation({
        mutationFn: (reqData) => login(reqData),
        onSuccess: (res ) => {
            const { data } = res;

            if (data.token) {
                localStorage.setItem('token', data.token);
                console.log('✅ Token saved to localStorage');
            }

            console.log('✅ Login successful:', data);

            const { _id, name, email, phone, role} = data.data;
            dispatch(setUser({ _id, name, email, phone, role, token: data.token}));
            
            // ✅ Thêm delay nhỏ cho mobile devices
            setTimeout(() => {
                navigate('/');
            }, 100);
        },

        onError: (error) => {
            console.error('❌ Login failed:', error);
            
            // ✅ Better error handling cho mobile
            let errorMessage = 'Login failed. Please try again.';
            
            if (error.response) {
                errorMessage = error.response.data?.message || errorMessage;
                console.log('❌ Server error:', error.response.status, error.response.data);
            } else if (error.request) {
                errorMessage = 'Network error. Please check your connection.';
                console.log('❌ Network error:', error.request);
            } else {
                console.log('❌ Other error:', error.message);
            }
            
            enqueueSnackbar(errorMessage, { variant: "error" });
        }
    })

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <div>
                    <label className='block text-[#ababab] mb-2 mt-3 text-sm font-medium'>
                        Employee Email
                    </label>
                    <div className='flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]'>
                        <input
                            type="email"
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter employee email"
                            className="bg-transparent flex-1 text-white focus:outline-none"
                            required
                            autoComplete="username"
                        />
                    </div>
                </div>

                <div>
                    <label className='block text-[#ababab] mb-2 mt-3 text-sm font-medium'>
                        Password
                    </label>
                    <div className='flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]'>
                        <input
                            type="password"
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            className="bg-transparent flex-1 text-white focus:outline-none"
                            required
                            autoComplete="current-password"
                        />
                    </div>
                </div>

                <button type="submit" className='w-full rounded-lg mt-6 py-3 text-lg bg-yellow-400 text-gray-900'>
                    Sign in
                </button>
            </form>
        </div>
    )
}

export default Login