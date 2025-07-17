import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function HealthCalendar({ records }) {
    const [value, onChange] = useState(new Date());
    const [selectedDateRecords, setSelectedDateRecords] = useState([]);

    const handleDateChange = (date) => {
        onChange(date);
        const dateString = date.toISOString().split('T')[0];
        const recordsForSelectedDate = records.filter(record => record.date === dateString);
        setSelectedDateRecords(recordsForSelectedDate);
    };

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const dateString = date.toISOString().split('T')[0];
            const dayRecords = records.filter(record => record.date === dateString);
            if (dayRecords.length > 0) {
                return <p style={{ fontSize: '0.8em', color: 'green' }}>•</p>;
            }
        }
        return null;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
            <Calendar
                onChange={handleDateChange}
                value={value}
                tileContent={tileContent}
            />
            {selectedDateRecords.length > 0 && (
                <div style={{ marginTop: '20px', width: '80%' }}>
                    <h4>Records for {value.toDateString()}</h4>
                    <ul>
                        {selectedDateRecords.map((record, index) => (
                            <li key={record.id || index}>
                                Weight: {record.weight}, Meals: {record.meals}, Poops: {record.poops}, Plays: {record.plays}, Sleeps: {record.sleeps}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default HealthCalendar;
