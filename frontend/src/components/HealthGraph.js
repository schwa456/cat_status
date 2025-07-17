import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function HealthGraph({ records }) {
    // Sort records by date to ensure the graph is chronological
    const sortedRecords = [...records].sort((a, b) => new Date(a.date) - new Date(b.date));

    const dates = sortedRecords.map(record => record.date);
    const weights = sortedRecords.map(record => record.weight);
    const meals = sortedRecords.map(record => record.meals);
    const poops = sortedRecords.map(record => record.poops);
    const plays = sortedRecords.map(record => record.plays);
    const sleeps = sortedRecords.map(record => record.sleeps);

    const data = {
        labels: dates,
        datasets: [
            {
                label: 'Weight (kg)',
                data: weights,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
            {
                label: 'Meals',
                data: meals,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1,
            },
            {
                label: 'Poops',
                data: poops,
                borderColor: 'rgb(53, 162, 235)',
                tension: 0.1,
            },
            {
                label: 'Plays',
                data: plays,
                borderColor: 'rgb(255, 206, 86)',
                tension: 0.1,
            },
            {
                label: 'Sleeps',
                data: sleeps,
                borderColor: 'rgb(153, 102, 255)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Cat Health Trends',
            },
        },
    };

    return (
        <div style={{ width: '80%', margin: 'auto' }}>
            <Line data={data} options={options} />
        </div>
    );
}

export default HealthGraph;
