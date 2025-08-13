import React from 'react'
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import { useSelector } from 'react-redux';
import { IoLogOut } from 'react-icons/io5'
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { logout } from '../../https';
import { removeUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';
import { clearAuthData } from '../../utils/authUtils';
import MoreMenu from './MoreMenu';

const Header = () => {

    const userData = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutMutation = useMutation({
        mutationFn: () => {
            console.log('🚀 Calling logout API...');
            return logout();
        },
        onSuccess: (data) => {
            console.log('✅ Logout successful:', data);
            
            // ✅ Sử dụng utility function để clear tất cả auth data
            clearAuthData();
            
            // ✅ Xóa user khỏi Redux state
            dispatch(removeUser());
            console.log('👤 User removed from Redux state');
            
            // ✅ Navigate về auth page
            navigate('/auth');
            console.log('🚀 Redirected to auth page');
        },
        onError: (error) => {
            console.error('❌ Logout failed:', error);
            
            // ✅ Vẫn xóa local data ngay cả khi API fail
            clearAuthData();
            dispatch(removeUser());
            navigate('/auth');
        }
    })

    const handleLogout = () => {
        console.log('🖱️ Logout button clicked!');
        console.log('👤 Current user data:', userData);
        console.log('🔑 Starting logout process...');
        logoutMutation.mutate();
    }

    return (
        <header className="flex justify-between items-center py-4 px-8 bg-[#1a1a1a]">
            {/* LOGO */}
            <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer">
                <img src={logo} className="h-8 w-8" alt="restro logo"></img>
                <h1 className="text-lg font-semibold text-[#f5f5f5]">Cloud Kitchen</h1>
            </div>

            {/* SEARCH */}
            <div className="flex item-center gap-4 bg-[#1f1f1f] rounded-[20px] px-5 py-2 w-[500px]">
                <FaSearch className="text-[#f5f5f5]" />
                <input
                    type="text"
                    placeholder="Search"
                    className="bg-[#1f1f1f] outline-none text-[#f5f5f5] rounded-md"
                />
            </div>

            {/* LOGGED USER DETAILS */}
            <div className="flex items-center gap-4">
                {
                    (userData.role === 'admin' || userData.role === 'Admin') && (
                        <div onClick={() => navigate('/dashboard')} className="bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer">
                            <MdDashboard className="text-[#f5f5f5] text-2x1" />
                        </div>
                    )
                }
                <MoreMenu />
                <div className="flex items-center gap-3 cursor-pointer">
                    <FaUserCircle className="text-[#f5f5f5] text-4x1" />
                    <div className="flex flex-col items-start">
                        <h1 className="text-md text-[#f5f5f5] font-semibold">{userData.name || "TEST USER"}</h1>
                        <p className="text-xs text-[#ababab] font-medium">{userData.role || "N/A Role"}</p>
                    </div>
                    <IoLogOut 
                        onClick={handleLogout} 
                        className={`ml-2 hover:text-red-400 hover:scale-110 transition-all duration-200 cursor-pointer ${
                            logoutMutation.isPending ? 'text-yellow-400 animate-pulse' : 'text-[#f5f5f5]'
                        }`}
                        size={40} 
                        title={logoutMutation.isPending ? "Logging out..." : "Logout"}
                        disabled={logoutMutation.isPending}
                    />
                </div>
            </div>

        </header>
    )
}

export default Header