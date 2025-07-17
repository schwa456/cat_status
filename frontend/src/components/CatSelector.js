import React, { useState, useEffect } from 'react';

function CatSelector({ userId, onCatSelect }) {
    const [cats, setCats] = useState([]);
    const [newCatName, setNewCatName] = useState('');

    useEffect(() => {
        if (userId) {
            const fetchCats = async () => {
                const response = await fetch(`http://localhost:8000/cats/?owner_id=${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setCats(data);
                }
            };
            fetchCats();
        }
    }, [userId]);

    const handleAddCat = async (e) => {
        e.preventDefault();
        if (!newCatName) return;

        const response = await fetch('http://localhost:8000/cats/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newCatName, owner_id: userId }),
        });

        if (response.ok) {
            const newCat = await response.json();
            setCats([...cats, newCat]);
            setNewCatName('');
        } else {
            alert('Failed to add cat');
        }
    };

    return (
        <div>
            <h2>Select a Cat</h2>
            <select onChange={(e) => onCatSelect(e.target.value)}>
                <option value="">--Select a Cat--</option>
                {cats.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>
            <form onSubmit={handleAddCat}>
                <input
                    type="text"
                    placeholder="New Cat Name"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    required
                />
                <button type="submit">Add Cat</button>
            </form>
        </div>
    );
}

export default CatSelector;
