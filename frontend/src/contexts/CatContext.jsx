import React, { createContext, useState } from "react";

const CatContext = createContext(undefined, undefined);

export const CatProvider = ({ children }) => {
    const [selectedCat, setSelectedCat] = useState(null);
    const [catsList, setCatsList] = useState([]);

    return (
        <CatContext.Provider value={[selectedCat, setSelectedCat, catsList, setCatsList]}>
            {children}
        </CatContext.Provider>
    )
}