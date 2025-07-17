// frontend/src/components/NavigationBar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavigationBar.css'; // 내비게이션 바를 위한 CSS 파일

function NavigationBar() {
    const location = useLocation();

    return (
        <nav className="navigation-bar">
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>홈</Link>
            <Link to="/calendar" className={location.pathname === '/calendar' ? 'active' : ''}>캘린더</Link>
            <Link to="/graph" className={location.pathname === '/graph' ? 'active' : ''}>그래프</Link>
            <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>프로필</Link>
        </nav>
    );
}

export default NavigationBar;