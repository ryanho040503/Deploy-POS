import React from 'react';
import { MdTableBar, MdCategory } from 'react-icons/md';
import { BiSolidDish } from 'react-icons/bi';
import { useState } from 'react';
import Metric from '../../dashboard/Metric';
import RecentOrders from '../../dashboard/RecentOrders';
import Modal from '../../dashboard/Modal'
import BottomNav from '../components/shared/BottomNav';

const buttons = [
    { label: "Add Table", icon: <MdTableBar />, action: "table" },
    { label: "Add Category", icon: <MdCategory />, action: "category" },
    { label: "Add Dishes", icon: <BiSolidDish />, action: "dishes" },
];

const tabs = ['Metrics', 'Orders', 'Payment'];

const Dashboard = () => {

    const [isTableModalOpen, setIsTableModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Metrics");

    const handleOpenModal = (action) => {
        console.log("Clicked action:", action);
        if (action === "table") setIsTableModalOpen(true);
    }

    return (
        <div className='bg-[#1f1f1f] h-[calc(100vh-5rem)]'>
            <div className='container mx-auto flex items-center justify-between py-14 px-6 md:px-4'>
                <div className='flex items-center gap-3'>
                    {
                        buttons.map(({ label, icon, action }) => {
                            return (
                                <button
                                    onClick={() => handleOpenModal(action)}
                                    key={action}
                                    className='bg-[#1a1a1a] hover:bg-[#262626] px-8 py-3 rounded-lg text-[#f5f5f5] font-semibold text-md flex items-center gap-2'>
                                    {label} {icon}
                                </button>
                            )
                        })
                    }
                </div>

                <div className='flex items-center gap-3'>
                    {
                        tabs.map((tab) => {
                            return (
                                <button
                                    key={tab}
                                    className={`px-8 py-3 rounded-lg text-[#f5f5f5] font-semibold text-md flex items-center gap-2 ${activeTab === tab ? "bg-[#262626]" : "bg-[#1a1a1a] hover:bg-[#262626]"}`}
                                    onClick={() => setActiveTab(tab)}>
                                    {tab}
                                </button>
                            )
                        })
                    }
                </div>
            </div>

            {console.log("Modal open?", isTableModalOpen)}

            {activeTab === "Metrics" && <Metric />}
            {activeTab === "Orders" && <RecentOrders />}
            {/* {isTableModalOpen && <Modal setIsTableModalOpen={setIsTableModalOpen} />} */}

            {isTableModalOpen && (console.log("Rendering Modal"), <Modal setIsTableModalOpen={setIsTableModalOpen} />)}


           <BottomNav />
        </div>
    )
}

export default Dashboard