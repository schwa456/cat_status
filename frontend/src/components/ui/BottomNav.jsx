import React from "react";
import { NavLink } from "react-router-dom";
import AppIcon from "../AppIcon";

const navItems = [
    { path: '/dashboard-overview', icon: 'user', label: 'Profile' },
    { path: '/health-records-test-results', icon: 'file-text', label: 'Report' },
    { path: 'activity-logging', icon: 'home', label: 'Home' },
    { path: 'activity-reports-analytics', icon: 'bar-chart', label: 'Chart'},
    { path: 'settings-preferences', icon: 'settings', label: 'Settings' },
]

const BottomNav = () => {
    return (
        <nav className="w-full bg-white shadow-t-md">
            <div className="flex justify-around">
                {navItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center w-full pt-2 pb-1 text-sm }
                            ${isActive ? 'text-blue-600' : 'text-gray-500' }`
                        }
                    >
                        <AppIcon icon={item.icon} size={24}/>
                        <span className="label">{item.label}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default BottomNav;