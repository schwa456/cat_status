import React, { createContext, useState, useContext, useEffect } from "react";

const CatContext = createContext(undefined, undefined);

export const CatProvider = ({ children }) => {
    const [cats, setCats] = useState([]);
    const [selectedCat, setSelectedCat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCats = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/cats')
                if (!response.ok) {
                    throw new Error('Failed to fetch cats');
                }
                const data = await response.json()
                setCats(data);
                if (data.length > 0) {
                    setSelectedCat(data[0]);
                } 
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchCats()
    }, []);

    const handleSelectCat = (cat) => {
        setSelectedCat(cat);
    };

    const value = {
        cats,
        selectedCat,
        loading,
        selectCat: handleSelectCat
    };

    return <CatContext.Provider value={value}>{children}</CatContext.Provider>;
};

export const useCats = () => {
    const context = useContext(CatContext);
    if (context === undefined) {
        throw new Error("useCats must be used within a CatProvider");
    }
    return context;
}