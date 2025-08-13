import React, { useState, useRef, useEffect } from 'react';
import { IoEllipsisVertical, IoNotifications, IoSettings, IoMoon, IoSunny, IoLanguage, IoHelpCircle, IoInformationCircle } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';

const MoreMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState('en');
    const menuRef = useRef(null);
    const userData = useSelector(state => state.user);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleNotifications = () => {
        setNotificationsEnabled(!notificationsEnabled);
        // TODO: Implement notification toggle logic
        console.log('🔔 Notifications:', !notificationsEnabled ? 'enabled' : 'disabled');
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        // TODO: Implement dark mode toggle logic
        console.log('🌙 Dark mode:', !darkMode ? 'enabled' : 'disabled');
    };

    const changeLanguage = (lang) => {
        setLanguage(lang);
        // TODO: Implement language change logic
        console.log('🌐 Language changed to:', lang);
    };

    const menuItems = [
        {
            id: 'notifications',
            icon: <IoNotifications className="text-lg" />,
            label: 'Notifications',
            action: toggleNotifications,
            toggle: notificationsEnabled,
            description: 'Enable or disable push notifications'
        },
        {
            id: 'darkMode',
            icon: darkMode ? <IoSunny className="text-lg" /> : <IoMoon className="text-lg" />,
            label: 'Dark Mode',
            action: toggleDarkMode,
            toggle: darkMode,
            description: 'Switch between light and dark themes'
        },
        {
            id: 'language',
            icon: <IoLanguage className="text-lg" />,
            label: 'Language',
            action: null,
            description: 'Select your preferred language',
            submenu: [
                { code: 'en', name: 'English', flag: '🇺🇸' },
                { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
                { code: 'zh', name: '中文', flag: '🇨🇳' }
            ]
        },
        {
            id: 'settings',
            icon: <IoSettings className="text-lg" />,
            label: 'Settings',
            action: () => console.log('⚙️ Settings clicked'),
            description: 'Manage app preferences'
        },
        {
            id: 'help',
            icon: <IoHelpCircle className="text-lg" />,
            label: 'Help & Support',
            action: () => console.log('❓ Help clicked'),
            description: 'Get help and contact support'
        },
        {
            id: 'about',
            icon: <IoInformationCircle className="text-lg" />,
            label: 'About',
            action: () => console.log('ℹ️ About clicked'),
            description: 'App version and information'
        }
    ];

    return (
        <div className="relative" ref={menuRef}>
            {/* More Button */}
            <button
                onClick={toggleMenu}
                className="bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer hover:bg-[#2a2a2a] transition-colors duration-200"
                title="More Options"
            >
                <IoEllipsisVertical className="text-[#f5f5f5] text-2xl" />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 top-14 w-80 bg-[#1a1a1a] rounded-lg shadow-2xl border border-[#333] z-50">
                    {/* Header */}
                    <div className="p-4 border-b border-[#333]">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#333] rounded-full flex items-center justify-center">
                                <IoEllipsisVertical className="text-[#f5f5f5] text-xl" />
                            </div>
                            <div>
                                <h3 className="text-[#f5f5f5] font-semibold">More Options</h3>
                                <p className="text-[#ababab] text-sm">Manage your preferences</p>
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="max-h-96 overflow-y-auto">
                        {menuItems.map((item) => (
                            <div key={item.id} className="border-b border-[#333] last:border-b-0">
                                {item.id === 'language' ? (
                                    // Language submenu
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                {item.icon}
                                                <div>
                                                    <span className="text-[#f5f5f5] font-medium">{item.label}</span>
                                                    <p className="text-[#ababab] text-xs">{item.description}</p>
                                                </div>
                                            </div>
                                            <span className="text-[#f5f5f5] text-sm">
                                                {item.submenu.find(lang => lang.code === language)?.flag} {item.submenu.find(lang => lang.code === language)?.name}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            {item.submenu.map((lang) => (
                                                <button
                                                    key={lang.code}
                                                    onClick={() => changeLanguage(lang.code)}
                                                    className={`px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                                                        language === lang.code
                                                            ? 'bg-blue-600 text-white'
                                                            : 'bg-[#333] text-[#f5f5f5] hover:bg-[#444]'
                                                    }`}
                                                >
                                                    {lang.flag} {lang.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    // Regular menu item
                                    <button
                                        onClick={item.action}
                                        className="w-full p-4 text-left hover:bg-[#2a2a2a] transition-colors duration-200"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                {item.icon}
                                                <div>
                                                    <span className="text-[#f5f5f5] font-medium">{item.label}</span>
                                                    <p className="text-[#ababab] text-xs">{item.description}</p>
                                                </div>
                                            </div>
                                            {item.toggle !== undefined && (
                                                <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                                                    item.toggle ? 'bg-blue-600' : 'bg-[#333]'
                                                }`}>
                                                    <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 transform ${
                                                        item.toggle ? 'translate-x-6' : 'translate-x-1'
                                                    }`} />
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-[#333] bg-[#1f1f1f] rounded-b-lg">
                        <div className="text-center text-[#ababab] text-sm">
                            <p>Cloud Kitchen v1.0.0</p>
                            <p className="text-xs mt-1">User: {userData.name || 'Unknown'}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MoreMenu; 