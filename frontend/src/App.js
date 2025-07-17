import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Verify from './components/Verify';
import CatSelector from './components/CatSelector';
import HealthTracker from './components/HealthTracker';
import BloodTest from './components/BloodTest';
import './App.css';

function App() {
    const [userId, setUserId] = useState(null);
    const [catId, setCatId] = useState(null);

    const handleLogin = (id) => {
        setUserId(id);
    };

    const handleCatSelect = (selectedCatId) => {
        setCatId(selectedCatId);
    };

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>Cat Health Tracker</h1>
                </header>
                <main>
                    <Routes>
                        <Route path="/login" element={!userId ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
                        <Route path="/register" element={!userId ? <Register /> : <Navigate to="/" />} />
                        <Route path="/verify" element={<Verify />} />
                        <Route path="/" element={userId ? (
                            <>
                                <CatSelector userId={userId} onCatSelect={handleCatSelect} />
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