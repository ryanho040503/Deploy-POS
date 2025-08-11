import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest' // ✅ Thêm header này cho mobile compatibility
    },
    timeout: 10000, // ✅ Thêm timeout
    validateStatus: function (status) {
        return status >= 200 && status < 500; // ✅ Chấp nhận status codes từ 200-499
    }
})

// ✅ Thêm request interceptor để log requests
api.interceptors.request.use(
    (config) => {
        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

// ✅ Thêm response interceptor để log responses
api.interceptors.response.use(
    (response) => {
        console.log(`✅ API Response: ${response.status} ${response.config.url}`);
        return response;
    },
    (error) => {
        console.error('❌ Response Error:', error.response?.status, error.response?.data);
        return Promise.reject(error);
    }
);

// API Endpoints
export const login = (data) => api.post('/api/user/login', data);
export const register = (data) => api.post('/api/user/register', data);
export const getUserData = () => api.get('/api/user');
export const logout = () => api.post('/api/user/logout');

export const addTable = (data) => api.post ("/api/table/",data); 
export const getTables = (data) => api.get("/api/table");