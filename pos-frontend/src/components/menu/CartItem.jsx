import React from 'react'
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaNotesMedical } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { addItems } from '../../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { removeItem } from '../../redux/slices/cartSlice';
import { useEffect, useRef } from 'react';


const CartItem = () => {

    const cartData = useSelector((state) => state.cart);
    const scrolLRef = useRef();

    useEffect(() => {
        if(scrolLRef.current) {
            scrolLRef.current.scrollTo ({
                top : scrolLRef.current.scrollHeight,
                behavior : "smooth"
            })
        }
    }, [cartData]);

    const dispatch = useDispatch();
    const handleRemove = (itemId) => {
        dispatch(removeItem(itemId));
    }

    return (
        <div className="px-4 py-2">
            <h1 className="text-lg text-[#ababab] font-semibold tracki-wide">Order Details</h1>
            <div className="mt-4 overflow-y-scroll scrollbar-hide h-[380px]" ref={scrolLRef}>
                {cartData.length === 0 ? (
                    <p className="text-[#ababab] text-sm flex justify-center items-center h-full">Your cart is empty, start adding items!</p>
                ) : cartData.map((item) => {
                    return (
                        <div className="bg-[#1f1f1f] rounded-lg px-4 py-4 mb-2">
                            <div className="flex items-center justify-between">
                                <h1 className="text-[#ababab] font-semibold tracking-wide text-md">{item.name}</h1>
                                <p className="text-[#ababab] font-semibold">x{item.quantity}</p>
                            </div>
                            <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center gap-3">
                                    <RiDeleteBin2Fill onClick={() => handleRemove(item.id)} size={20} className="text-red-500 cursor-pointer hover:text-red-600" />
                                    <FaNotesMedical size={20} className="text-green-500 cursor-pointer hover:text-green-600" />
                                </div>
                                <p className="text-[#f5f5f5] text-md font-bold">${item.price}</p>
                            </div>
                        </div>
                    );
                })}

            </div>
        </div>
    )
}

export default CartItem