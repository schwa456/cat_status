// frontend/src/components/Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // 홈 화면을 위한 CSS 파일

function Home({ userId }) {
    const [cats, setCats] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:8000/cats/?owner_id=${userId}`)
                .then(response => response.json())
                .then(data => {
                    // 최대 3마리의 고양이만 표시
                    setCats(data.slice(0, 3));
                })
                .catch(error => console.error('Error fetching cats:', error));
        }
    }, [userId]);

    const handleCardClick = (catId) => {
        navigate(`/tracker/${catId}`);
    };

    // 새 고양이 등록 페이지로 이동하는 함수
    const handleAddCatClick = () => {
        navigate('/add-cat'); // 새 고양이 등록 페이지 라우트
    };

    return (
        <div className="home-container">
            <h2>내 고양이들</h2>
            <div className="cat-card-container">
                {cats.map(cat => (
                    <div key={cat.id} className="cat-card" onClick={() => handleCardClick(cat.id)}>
                        <img src="https://via.placeholder.com/150" alt={cat.name} className="cat-photo" />
                        <h3>{cat.name}</h3>
                        <p>나이: {cat.age || '정보 없음'}</p>
                        <p>성별: {cat.gender || '정보 없음'} ({cat.neutered ? '중성화 O' : '중성화 X'})</p>
                        <div className="cat-summary">
                            <h4>최근 요약</h4>
                            <p>최근 기록이 여기에 표시됩니다.</p>
                        </div>
                    </div>
                ))}
                {/* 고양이 추가 카드 */}
                {cats.length < 3 && (
                     <div className="cat-card add-cat-card" onClick={handleAddCatClick}>
                        <div className="add-cat-icon">+</div>
                        <p>고양이 추가</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;