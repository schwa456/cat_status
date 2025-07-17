import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Verify() {
    const [message, setMessage] = useState('Verifying your email...');
    const location = useLocation();

    useEffect(() => {
        const token = new URLSearchParams(location.search).get('token');
        if (token) {
            const verifyEmail = async () => {
                const response = await fetch(`http://localhost:8000/verify?token=${token}`);
                const data = await response.json();
                setMessage(data.message);
            };
            verifyEmail();
        }
    }, [location]);

    return (
        <div>
            <h2>Email Verification</h2>
            <p>{message}</p>
        </div>
    );
}

export default Verify;
