import React, { useState, useEffect } from 'react';

function BloodTest({ catId }) {
    const [bloodTests, setBloodTests] = useState([]);
    const [newTest, setNewTest] = useState({ results: '' });

    useEffect(() => {
        if (catId) {
            const fetchBloodTests = async () => {
                const response = await fetch(`http://localhost:8000/health/blood-tests/${catId}`);
                if (response.ok) {
                    const data = await response.json();
                    setBloodTests(data);
                }
            };
            fetchBloodTests();
        }
    }, [catId]);

    const handleChange = (e) => {
        setNewTest({ ...newTest, results: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/health/blood-tests', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cat_id: catId, date: new Date().toISOString().split('T')[0], results: JSON.parse(newTest.results) }),
        });
        if (response.ok) {
            const savedTest = await response.json();
            setBloodTests([...bloodTests, savedTest]);
        } else {
            alert('Failed to save blood test');
        }
    };

    return (
        <div>
            <h3>Blood Tests</h3>
            <form onSubmit={handleSubmit}>
                <textarea name="results" placeholder='Enter JSON results: e.g. { "RBC": 6.5, "WBC": 7.2 }' onChange={handleChange} required />
                <button type="submit">Add Blood Test</button>
            </form>
            <ul>
                {bloodTests.map((test, index) => (
                    <li key={index}>
                        {test.date}: {JSON.stringify(test.results)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BloodTest;
