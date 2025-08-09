import React from 'react'
import BottomNav from '../components/shared/BottomNav'
import BackButton from '../components/shared/BackButton'
import { MdRestaurantMenu } from "react-icons/md";
import MenuContainer from '../components/menu/MenuContainer';
import CustomerInfo from '../components/menu/CustomerInfo';
import CartItem from '../components/menu/CartItem';
import { useSelector } from 'react-redux';
import Bill from '../components/menu/Bill';

const Menu = () => {

  const customerData = useSelector( state => state.customer); 

  return (
    <>
      <div className="h-screen flex flex-col overflow-hidden">
        <section className="bg-[#1f1f1f] flex-1 flex gap-3 overflow-hidden">

          {/* Left Div */}
          <div className="flex-[3] h-full overflow-y-auto">
            <div className="flex items-center justify-between px-10 py-4">
              <div className="flex items-center gap-4">
                <BackButton />
                <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">Menu</h1>
              </div>
              <div className="flex items-center justify-around gap-4">
                <div className="flex items-center gap-3 cursor-pointer">
                  <MdRestaurantMenu className="text-[#f5f5f5] text-4xl" />
                  <div className="flex flex-col items-start">
                    <h1 className="text-md text-[#f5f5f5] font-semibold">{customerData.customerName || "Customer Name"}</h1>
                    <p className="text-xs text-[#ababab] font-medium">{customerData.tableNo || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>



            <MenuContainer />
          </div>



          {/* Right Div */}
          <div className="flex-[1] h-full bg-[#1a1a1a] mt-4 mr-3 rounded-lg pt-2">
            {/* Customer Info */}
            <CustomerInfo />
            <hr className="border-[#2a2a2a] border-t-2" />
            {/* Cart Items */}
            <CartItem />
            {/* Bills */}
            <hr className="border-[#2a2a2a] border-t-2" />
            <Bill />
            
          </div>
        </section>
        <BottomNav />
      </div>
    </>
  )
}

export default Menu