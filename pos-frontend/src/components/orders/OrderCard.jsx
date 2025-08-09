import React from 'react';
import { FaCheckDouble } from 'react-icons/fa';
import { FaCircle } from 'react-icons/fa'

const OrderCard = () => {
    return (
        // <div className="w-full max-w-[500px] bg-[#262626] p-4 rounded-lg mb-4">
        <div className="w-full max-w-[500px] bg-[#262626] p-4 rounded-lg mb-4 transition-transform transform hover:scale-[1.02] hover:bg-[#2c2c2c] cursor-pointer">

            <div className="flex items-center gap-5">
                <button className="bg-[#f6b100] p-4 text-xl font-bold rounded-lg">AM</button>
                <div className="flex items-center justify-between w-[100%]">
                    <div className="flex flex-col items-start gap-1">
                        <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">Ryan Ho</h1>
                        <p className="text-[#ababab] text-sm">#101/Dine in</p>
                    </div>

                    <div className="flex flex-col items-end gap-2 ">
                        <p className="text-green-600 bg-[#2e4a40] px-2 py-1 rounded-lg"><FaCheckDouble className="inline mr-2" />Ready</p>
                        <p className="text-[#ababab] text-sm"><FaCircle className="inline mr-2 text-green-600 " />Ready to serve</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mt-4 text-[#ababab]">
                <p>January 18, 2025 08:32 PM</p>
                <p>8 Items</p>
            </div>

            <hr className="w-full mt-4 border-t-1 border-gray-500" />
            <div className="flex items-center justify-between mt-4">
                <h1 className="text-[#f5f5f5] text-lg font-semibold">Total</h1>
                <p className="text-[#f5f5f5] text-lg font-semibold">$250.00 </p>
            </div>
            
        </div>
    )
}

export default OrderCard