// frontend/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Verify from './components/Verify';
import HealthTracker from './components/HealthTracker';
import BloodTest from './components/BloodTest';
import CatSelector from "./components/CatSelector";
import './App.css';

function App() {
    // userId 대신 token을 상태로 관리합니다.
    const [token, setToken] = useState(sessionStorage.getItem('token'))
    const [catId, setCatId] = useState(null);

    const handleLogin = (newToken) => {
        sessionStorage.setItem('token', newToken);
        setToken(newToken)
    };

    // 로그아웃 핸들러 추가
    const handleLogout = () => {
        sessionStorage.removeItem('token');
        setToken(null);
        setCatId(null);
    };

    // userId 대신 실제 토큰 유무로 로그인 상태를 판단합니다.
    // 백엔드에서 사용자 정보를 가져오려면 이 token을 API 요청 헤더에 담아 보내야 합니다.
    // 지금은 임시로 userId를 1로 설정하여 다른 컴포넌트가 동작하도록 합니다.
    const tempUserId = token ? 1 : null;

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>고양이 건강 기록장</h1>
                    {/* 로그인 상태일 때만 로그아웃 버튼 표시 */}
                    {token && <button onClick={handleLogout} className="logout-button">로그아웃</button>}
                </header>
                <main>
                    <Routes>
                        <Route path="/login" element={!token ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
                        <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
                        <Route path="/verify" element={<Verify />} />
                        <Route path="/" element={token ? (
                            <>
                                {/* CatSelector에 실제 사용자 ID를 전달해야 합니다. */}
                                {/* 우선 임시 ID로 기능 구현 후, /users/me 같은 API를 만들어 토큰으로 사용자 정보를 가져오는 로직이 필요합니다. */}
                                <CatSelector userId={tempUserId} onCatSelect={setCatId} />
                                {catId && (
                                    <>
                                        <HealthTracker catId={catId} />
                                        <BloodTest catId={catId} />
                                    </>
                                )}
                            </>
                        ) : <Navigate to="/login" />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;