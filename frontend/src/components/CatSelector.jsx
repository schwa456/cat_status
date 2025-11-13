import React, { useState, useContext, useEffect } from "react";
import { CatContext } from "../contexts/CatContext";

const CatSelector = () => {
    const { selectedCat, setSelectedCat, catsList, setCatsList } = useContext(CatContext);
    const [isOpen, setIsOpen] = useState(false);

    // TODO: Fetch cats from API if not already fetched
    useEffect(() => {
        const dummyCats = [
        { id: 'cat1', name: '나비', image: 'https://via.placeholder.com/32/FFC0CB/FFFFFF?text=N' },
        { id: 'cat2', name: '모카', image: 'https://via.placeholder.com/32/8B4513/FFFFFF?text=M' },
        { id: 'cat3', name: '초코', image: 'https://via.placeholder.com/32/000000/FFFFFF?text=C' },
        ];
        setCatsList(dummyCats);
        if (!selectedCat && dummyCats.length > 0) {
            setSelectedCat(dummyCats[0]);
        }
    }, [selectedCat, setSelectedCat, setCatsList]);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleCatSelect = (cat) => {
        setSelectedCat(cat);
        setIsOpen(false);
    };

    if (!selectedCat) {
        return <div>Loading Cats...</div>; // 고양이 정보 로딩 중
    }

    return (
        <div className="relative">
            <button
            onClick={toggleDropdown}
            className="flex items-center p-2 border border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
                <img src={selectedCat.image} alt={selectedCat.name} className="w-8 h-8 rounded-full mr-2" />
                <svg className={`w-4 h-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'></path>
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border-gray-200 rounded-md shadow-lg z-10">
                     {catsList.map((cat) => (
                         <button
                            key={cat.id}
                            onClick={() => handleCatSelect(cat)}
                            className="flex items-center w-full p-3 text-left hover:bg-gray-100 focus:outline-none"
                         >
                             <img src={cat.image} alt={cat.name} className="w-8 h-8 rounded-full mr-2" />
                             <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                         </button>
                     ))}
                </div>
            )}
        </div>
    );
};

export default CatSelector;