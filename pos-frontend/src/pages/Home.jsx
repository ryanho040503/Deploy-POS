import React from 'react';
import BottomNav from '../components/shared/BottomNav';
import Greetings from '../components/home/Greetings';
import { BsCashCoin } from 'react-icons/bs';
import { GrInProgress } from 'react-icons/gr';
import MiniCard from '../components/home/MiniCard';
import RecentOrder from '../components/home/RecentOrder';
import PopularDishes from '../components/home/PopularDishes';

const Home = () => {
    return (
        <section className="bg-[#1f1f1f] min-h-screen pb-20 flex gap-3">
            {/* Left Div */}
            <div className="flex-[3] overflow-y-auto custom-scrollbar">
                <Greetings />
                <div className="flex items-center w-full gap-3 px-8 mt-8">
                    <MiniCard title="Total Earnings" icon={<BsCashCoin />} number={512} footerNum={1.6}/>
                    <MiniCard title="In Progress" icon={<GrInProgress />} number={16} footerNum={3.6}/>
                </div>
                <RecentOrder />
            </div>

            {/* Right Div */}
            <div className="flex-[2] overflow-y-auto custom-scrollbar">
                <PopularDishes />
            </div>
            <BottomNav />
        </section>
    )
}

export default Home