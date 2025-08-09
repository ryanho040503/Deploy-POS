import React from 'react'
import { getRandomBG } from '../../utils'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateTable } from '../../redux/slices/customerSlice';
import { getAvatarName } from '../../utils';


const TableCard = ({name, status, initials, seats}) => {

    const dispatch = useDispatch();
    const bgColor = getRandomBG();
    const navigate = useNavigate();
    const handleClick = (name) => {
        if (status === "Booked") return;
        dispatch(updateTable({tableNo: name}));
        navigate("/menu");
    }

    return (
        <div onClick={() => handleClick(name)} className="w-full max-w-[335px] bg-[#262626] p-4 rounded-lg mb-4 transition-transform transform hover:scale-[1.02] hover:bg-[#2c2c2c] cursor-pointer">
            <div className="flex items-center justify-between px-1">
                <h1 className="text-[#f5f5f5] text-xl font-semibold">Table {name}</h1>
                <p className={`${status === "Booked" ? "text-green-600 bg-[#2e4a40]" : "text-white bg-[#a6781d] "} px-2 py-1 rounded-lg`}>{status}</p>
            </div>
            <div className="flex items-center justify-center mt-5 mb-9">
                <h1 style={{ backgroundColor: initials ? bgColor : "#1f1f1f"}}  className={`text-white rounded-full p-5 text-xl`}>{getAvatarName(initials) || "N/A"}</h1>
            </div>
            <p className="text-[#ababab] text-xs">Seats: <span className="text-[#f5f5f5]">{seats}</span></p>
        </div>
    )
}

export default TableCard