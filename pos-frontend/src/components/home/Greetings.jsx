// import React, { useState, useEffect} from 'react';

// const Greetings = () => {

//     const[dateTime,setDateTime] = useState(new Date());


//     useEffect (() => {
//         const timer = setInterval(() => setDateTime (new Date()), 1000);
//         return () => clearInterval(timer);
//     }, []);

//     const formatDate = (date) => {
//         const months = [
//             'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
//         ];
//         return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')},${date.getFullYear ()}`;
//     };

//     const formatTime = (date) =>
//         `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")})`;


//     return (
//         <div className="flex justify-between items-center px-8 mt-5">
//             <div>
//                 <h1 className="text-[#f5f5f5] text-2x1 font-semibold">Good Morning, Ryan</h1>
//                 <p className="text-[#ababab] text-sm">Give your best services for customers</p>
//             </div>
//             <div>
//                 <h1>Time</h1>
//                 <p>Date</p>
//             </div>
//         </div>
//     )
// }

// export default Greetings


import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Greetings = () => {

    const userData = useSelector(state => state.user)
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setDateTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}, ${date.getFullYear()}`;
    };

    const formatTime = (date) =>
        `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

    return (
        <div className="flex justify-between items-center px-8 mt-5">
            <div>
                <h1 className="text-[#f5f5f5] text-2xl font-semibold tracking-wide">Good Morning, {userData.name || "TEST USER"}</h1>
                <p className="text-[#ababab] text-sm">Give your best services for customers</p>
            </div>
            <div className="text-right text-[#f5f5f5] text-3xl font-bold tracking-wide w-[130px]">
                <h1 className="text-xl font-bold">{formatTime(dateTime)}</h1>
                <p className="text-[#ababab] text-sm">{formatDate(dateTime)}</p>
            </div>
        </div>
    );
};

export default Greetings;
