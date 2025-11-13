import React from "react";
import AppRoutes from "./Routes";
import { CatProvider } from "./contexts/CatContext"

function App() {
    return (
        <CatProvider>
            <AppRoutes />
        </CatProvider>
    );
}

export default App;