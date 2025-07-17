import React, { useState, useEffect } from 'react';
import HealthGraph from './HealthGraph';
import HealthCalendar from './HealthCalendar';

function HealthTracker({ catId }) {
    const [healthRecords, setHealthRecords] = useState([]);
    const [newRecord, setNewRecord] = useState({
        weight: '',
        meals: '',
        poops: '',
        plays: '',
        sleeps: '',
    });
    const [currentView, setCurrentView] = useState('list'); // 'list', 'graph', 'calendar'

    useEffect(() => {
        if (catId) {
            const fetchHealthRecords = async () => {
                const response = await fetch(`http://localhost:8000/health/records/${catId}`);
                if (response.ok) {
                    const data = await response.json();
                    setHealthRecords(data);

                    // Pre-fill form if record for today exists
                    const today = new Date().toISOString().split('T')[0];
                    const recordForToday = data.find(record => record.date === today);
                    if (recordForToday) {
                        setNewRecord({
                            weight: recordForToday.weight,
                            meals: recordForToday.meals,
                            poops: recordForToday.poops,
                            plays: recordForToday.plays,
                            sleeps: recordForToday.sleeps,
                        });
                    }
                }
            };
            fetchHealthRecords();
        }
    }, [catId]);

    const handleChange = (e) => {
        setNewRecord({ ...newRecord, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/health/records', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cat_id: catId, date: new Date().toISOString().split('T')[0], ...newRecord }),
        });
        if (response.ok) {
            const savedRecord = await response.json();
            setHealthRecords(prevRecords => {
                const existingIndex = prevRecords.findIndex(rec => rec.id === savedRecord.id);
                if (existingIndex > -1) {
                    const updatedRecords = [...prevRecords];
                    updatedRecords[existingIndex] = savedRecord;
                    return updatedRecords;
                } else {
                    return [...prevRecords, savedRecord];
                }
            });
            // Clear form after submission or keep pre-filled if it was an update
            setNewRecord({
                weight: '',
                meals: '',
                poops: '',
                plays: '',
                sleeps: '',
            });
        } else {
            alert('Failed to save record');
        }
    };

    return (
        <div>
            <h3>Health Records</h3>
            <form onSubmit={handleSubmit}>
                <input type="number" name="weight" placeholder="Weight" onChange={handleChange} step="any" value={newRecord.weight} required />
                <input type="number" name="meals" placeholder="Meals" onChange={handleChange} value={newRecord.meals} required />
                <input type="number" name="poops" placeholder="Poops" onChange={handleChange} value={newRecord.poops} required />
                <input type="number" name="plays" placeholder="Plays" onChange={handleChange} value={newRecord.plays} required />
                <input type="number" name="sleeps" placeholder="Sleeps" onChange={handleChange} value={newRecord.sleeps} required />
                <button type="submit">Add/Update Record</button>
            </form>

            <div>
                <button onClick={() => setCurrentView('list')}>List View</button>
                <button onClick={() => setCurrentView('graph')}>Graph View</button>
                <button onClick={() => setCurrentView('calendar')}>Calendar View</button>
            </div>

            {currentView === 'list' && (
                <ul>
                    {healthRecords.map((record, index) => (
                        <li key={record.id || index}>
                            {record.date}: Weight: {record.weight}, Meals: {record.meals}, Poops: {record.poops}, Plays: {record.plays}, Sleeps: {record.sleeps}
                        </li>
                    ))}
                </ul>
            )}

            {currentView === 'graph' && <HealthGraph records={healthRecords} />}
            {currentView === 'calendar' && <HealthCalendar records={healthRecords} />}
        </div>
    );
}

export default HealthTracker;
