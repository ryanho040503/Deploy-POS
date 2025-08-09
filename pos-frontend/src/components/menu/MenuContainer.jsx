// import React, { useState } from 'react'
// import { menus } from '../../constants';
// import { GrRadialSelected } from 'react-icons/gr';
// import { getBgColor } from '../../utils';



// const MenuContainer = () => {

//     const [selected, setSelected] = useState(menus[0]);
//     const [itemCounts, setItemCounts] = useState({});

//     const increment = (id) => {
//         setItemCounts(prev => ({
//             ...prev,
//             [id]: Math.min((prev[id] || 0) + 1, 1000)
//         }));
//     };

//     const decrement = (id) => {
//         setItemCounts(prev => ({
//             ...prev,
//             [id]: Math.max((prev[id] || 0) - 1, 0)
//         }));
//     };

//     return (
//         <>
//             <div className="grid grid-cols-4 gap-4 px-10 py-4 w-[100%]">
//                 {
//                     menus.map((menu) => {
//                         return (
//                             <div key={menu.id} className="flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer" style={{ backgroundColor: menu.bgColor }} onClick={() => setSelected(menu)}>
//                                 <div className="flex items-center justify-between w-full">
//                                     <h1 className="text-[#f5f5f5] text-lg font-semibold">{menu.icon} {menu.name}</h1>
//                                     {selected.id === menu.id && <GrRadialSelected className="text-white" size={20} />}
//                                 </div>
//                                 <p className="text-[#ababab] text-sm font-semibold">{menu.items.length} Items</p>
//                             </div>
//                         )
//                     })
//                 }
//             </div>

//             <hr className="border-[#2a2a2a] border-t-2 mt-4" />
//             <div className="grid grid-cols-4 gap-4 px-10 py-4 w-[100%]">
//                 {
//                     selected?.items.map((menu) => {
//                         return (
//                             <div key={menu.id} className="flex flex-col items-start justify-between p-4 rounded-lg h-[150px] cursor-pointer hover:bg-[#2a2a2a] bg-[#1a1a1a] duration-100">
//                                 <h1 className="text-[#f5f5f5] text-lg font-semibold">{menu.name}</h1>
//                                 <div className="flex items-center justify-between w-full">
//                                     <p className="text-[#f5f5f5] text-sm font-semibold">${menu.price}</p>
//                                     <div className="flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-lg gap-6">
//                                         <button onClick={() => decrement(menu.id)} className="text-yellow-500 text-2xl">&minus;</button>
//                                         <span className="text-white">{itemCounts[menu.id] || 0}</span>
//                                         <button onClick={() => increment(menu.id)} className="text-yellow-500 text-2xl">&#43;</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         )
//                     })
//                 }
//             </div>
//         </>
//     )
// }

// export default MenuContainer

import React, { useState } from 'react';
import { menus } from '../../constants';
import { GrRadialSelected } from 'react-icons/gr';
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { addItems } from '../../redux/slices/cartSlice';


const MenuContainer = () => {
  const [selected, setSelected] = useState(menus[0]);
  const [itemCounts, setItemCounts] = useState({});
  const dispatch = useDispatch();

  const increment = (id) => {
    setItemCounts(prev => ({
      ...prev,
      [id]: Math.min((prev[id] || 0) + 1, 1000),
    }));
  };

  const decrement = (id) => {
    setItemCounts(prev => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  const handleChange = (id, value) => {
    const number = parseInt(value);
    if (!isNaN(number) && number >= 0 && number <= 1000) {
      setItemCounts(prev => ({ ...prev, [id]: number }));
    } else if (value === '') {
      setItemCounts(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleAddToCart = (item) => {

    const itemCount = itemCounts[item.id] || 0;
    if (itemCount === 0) return;


    const {name, price} = item;
    const newObj = { id: Date.now(), name, pricePerQuantity : price, quantity: itemCount, price: price * itemCount };
    
    dispatch(addItems(newObj));
    setItemCounts((prev) => ({ ...prev, [item.id]: 0 }));
  }

  return (
    <div className="overflow-y-auto h-full">
      {/* Danh sách menu */}
      <div
        className="grid gap-4 px-4 md:px-10 py-4 w-full"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          display: 'grid',
        }}
      >
        {menus.map(item => (
          <div
            key={item.id}
            className="flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer"
            style={{ backgroundColor: item.bgColor }}
            onClick={() => setSelected(item)}
          >
            <div className="flex items-center justify-between w-full">
              <h1 className="text-[#f5f5f5] text-lg font-semibold truncate">
                {item.icon} {item.name}
              </h1>
              {selected.id === item.id && (
                <GrRadialSelected className="text-white min-w-[20px]" size={20} />
              )}
            </div>
            <p className="text-[#ababab] text-sm font-semibold">
              {item.items.length} Items
            </p>
          </div>
        ))}
      </div>

      <hr className="border-[#2a2a2a] border-t-2 mt-4" />

      {/* Danh sách món */}
      <div
        className="grid gap-4 px-4 md:px-10 py-4 w-full cursor-pointer"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          display: 'grid',
        }}
      >
        {selected?.items.map(item => (
          <div
            key={item.id}
            className="flex flex-col items-start justify-between p-4 rounded-lg bg-[#1a1a1a] hover:bg-[#2a2a2a] duration-100"
          >
            <div className="flex items-start justify-between w-full">
              <h1 className="text-[#f5f5f5] text-lg font-semibold">{item.name}</h1>
              <button onClick={() => handleAddToCart(item)} className="bg-[#2e4a40] text-[#02ca3a] p-2 rounded-lg"><FaShoppingCart size={20} /></button>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full mt-2 gap-2 sm:gap-0">
              <p className="text-[#f5f5f5] text-sm font-semibold">${item.price}</p>
              <div className="flex items-center justify-between bg-[#1f1f1f] px-3 py-2 rounded-lg gap-2 w-full max-w-[120px]">
                <button
                  onClick={() => decrement(item.id)}
                  className="text-yellow-500 text-xl px-2"
                >
                  &minus;
                </button>

                <input
                  type="text"
                  inputMode="numeric"
                  value={itemCounts[item.id] ?? 0}
                  onChange={(e) => handleChange(item.id, e.target.value)}
                  className="w-10 text-center text-white bg-transparent focus:outline-none"
                  style={{ border: 'none' }}
                />

                <button
                  onClick={() => increment(item.id)}
                  className="text-yellow-500 text-xl px-2"
                >
                  &#43;
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuContainer;