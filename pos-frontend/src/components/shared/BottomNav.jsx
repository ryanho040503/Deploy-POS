import React, { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { MdOutlineReorder, MdTableBar } from 'react-icons/md';
import { CiCircleMore } from 'react-icons/ci';
import { BiSolidDish } from 'react-icons/bi';
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from './Modal';
import { useDispatch } from 'react-redux';
import { setCustomer } from '../../redux/slices/customerSlice';
import { updateTable } from '../../redux/slices/customerSlice'; // Import the updateTable action


const BottomNav = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [guestCount, setGuestCount] = useState(1);
    const [name,setName] = useState();
    const [phone,setPhone] = useState();

    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }

    // const increment = () => setGuestCount(prevCount => prevCount + 1);
    const increment = () =>
        setGuestCount(prev => (prev < 10 ? prev + 1 : prev));

    const decrement = () => {
        setGuestCount(prevCount => {
            if (prevCount > 0) {
                return prevCount - 1;
            }
            return 0; // Prevent negative guest count
        });
    }

    const isActive = (path) => location.pathname === path;

    const handleCreateOrder = () => {

        // Send data to the store
        dispatch(setCustomer({name, phone, guests : guestCount}));
        navigate("/tables");
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-[#262626] p-2 h-16 flex justify-around">
            { /* Home buttons */ }
            <button 
                onClick={() => navigate("/")}
                className={`flex items-center justify-center font-bold ${isActive("/") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"} w-[300px] rounded-[20px]`}
            >
                <FaHome className="inline mr-2" size={20} /><p>Home</p>
            </button>

            { /* Orders buttons */ }
            <button onClick={() => navigate("/orders")} 
                    className={`flex items-center justify-center font-bold ${isActive("/orders") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"} w-[300px] rounded-[20px]`}
            >
                <MdOutlineReorder className="inline mr-2 " size={20} /><p>Orders</p>
            </button>

            { /* Tables buttons */ }
            <button onClick={() => navigate("/tables")} 
                    className={`flex items-center justify-center font-bold ${isActive("/tables") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"} w-[300px] rounded-[20px]`}
            >
                <MdTableBar className="inline mr-2 " size={20} /><p>Tables</p>
            </button>

            <button className="flex items-center justify-center text-[#ababab] w-[200px]"><CiCircleMore className="inline mr-2 " size={20} /><p>More</p></button>

            <button 
                    disabled={isActive("/tables") || isActive("/menu")}
                    onClick={openModal} 
                    className="absolute bottom-6 bg-[#F6B100] text-[#f5f5f5] rounded-full p-3 item-center">
                        <BiSolidDish size={30} />
            </button>

            <Modal isOpen={isModalOpen} onClose={closeModal} title="Create Order">

                <div>
                    <label className="block text-[#ababab] mb-2 text-sm font-medium">Customer Name</label>
                    <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="" placeholder="Enter customer name" id="" className="bg-transparent flex-1 text-white focus:outline-none" />
                    </div>
                </div>

                <div>
                    {/* CSS for preventing the arrow of input type number */}
                    <style>
                        {`
                            input[type=number]::-webkit-inner-spin-button,
                            input[type=number]::-webkit-outer-spin-button {
                                -webkit-appearance: none;
                                margin: 0;
                            }
                            input[type=number] {
                                -moz-appearance: textfield;
                            }
                        `}
                    </style>
                    <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">Phone Number</label>
                    <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} type="number" name="" placeholder="(+1) 999999999" id="" className="bg-transparent flex-1 text-white focus:outline-none" />
                    </div>
                </div>

                {/* <div>
                    <label className="block mb-2 mt-3 text-sm font-medium text-[#ababab]">Guest</label>
                    <div className="flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-lg">
                        <span className="text-white">{guestCount} Person</span>
                        <button onClick={increment} className="text-yellow-500 text-2xl">&#43;</button>
                    </div>
                </div> */}

                <div>
                    <label className="block mb-2 mt-3 text-sm font-medium text-[#ababab]">Guest</label>
                    <div className="flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-lg">
                        <button
                            onClick={decrement}
                            className="text-yellow-500 text-2xl px-3 rounded hover:bg-[#333] transition">&#8722;
                        </button>
                        <span className="text-white text-lg font-semibold">{guestCount} {guestCount === 1 ? "Person" : "People"}</span>
                            <button
                                onClick={increment}
                                className="text-yellow-500 text-2xl px-3 rounded hover:bg-[#333] transition"
                            >&#43;
                            </button>
                    </div>
                </div>

                <button onClick={handleCreateOrder} className="w-full bg-[#F6B100] text-[#f5f5f5] rounded-lg p-3 mt-8 hover:bg-yellow-700  duration-300">
                    Create Order
                </button>

            </Modal>
        </div>
    )
}

export default BottomNav
