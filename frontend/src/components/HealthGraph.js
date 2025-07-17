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
                label: '몸무게 (kg)',
                data: weights,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
            {
                label: '식사 횟수',
                data: meals,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1,
            },
            {
                label: '배변 횟수',
                data: poops,
                borderColor: 'rgb(53, 162, 235)',
                tension: 0.1,
            },
            {
                label: '놀이 시간(분)',
                data: plays,
                borderColor: 'rgb(255, 206, 86)',
                tension: 0.1,
            },
            {
                label: '수면 시간(분)',
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
                text: '고양이 건강 기록 변화',
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
