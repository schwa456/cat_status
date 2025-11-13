import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './ui/Header';
import BottomNav from './ui/BottomNav';

const MainLayout = () => {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <main className="flex-grow overflow-y-auto bg-gray-100 p-4">
                <Outlet />
            </main>
            <BottomNav />
        </div>
    );
};

export default MainLayout;