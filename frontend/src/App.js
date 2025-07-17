// frontend/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Verify from './components/Verify';
import Home from './components/Home'; // Home 컴포넌트 임포트
import HealthTracker from './components/HealthTracker';
import BloodTest from './components/BloodTest';
import NavigationBar from './components/NavigationBar'; // NavigationBar 컴포넌트 임포트
import './App.css';

function App() {
    const [userId, setUserId] = useState(sessionStorage.getItem('token')); // 세션에서 userId 초기화

    const handleLogin = (id) => {
        setUserId(id);
    };

    // 로그아웃 핸들러 추가
    const handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('username');
        setUserId(null);
    };

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>Cat Health Tracker</h1>
                    {/* 로그인 상태일 때만 로그아웃 버튼 표시 */}
                    {userId && <button onClick={handleLogout} className="logout-button">Logout</button>}
                </header>
                <main>
                    <Routes>
                        <Route path="/login" element={!userId ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
                        <Route path="/register" element={!userId ? <Register /> : <Navigate to="/" />} />
                        <Route path="/verify" element={<Verify />} />

                        {/* 로그인된 사용자를 위한 라우트 */}
                        <Route path="/" element={userId ? <Home userId={userId} /> : <Navigate to="/login" />} />
                        <Route path="/tracker/:catId" element={userId ? <HealthTracker /> : <Navigate to="/login" />} />
                        <Route path="/blood-test/:catId" element={userId ? <BloodTest /> : <Navigate to="/login" />} />

                        {/* 예시: 캘린더, 그래프, 프로필 페이지 라우트 */}
                        <Route path="/calendar" element={userId ? <div>Calendar Page</div> : <Navigate to="/login" />} />
                        <Route path="/graph" element={userId ? <div>Graph Page</div> : <Navigate to="/login" />} />
                        <Route path="/profile" element={userId ? <div>Profile Page</div> : <Navigate to="/login" />} />

                        {/* 새 고양이 등록 페이지 라우트 (추후 구현) */}
                        <Route path="/add-cat" element={userId ? <div>Add Cat Page</div> : <Navigate to="/login" />} />
                    </Routes>
                </main>
                {/* 로그인 상태일 때만 내비게이션 바 표시 */}
                {userId && <NavigationBar />}
            </div>
        </Router>
    );
}

export default App;