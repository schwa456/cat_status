import React from "react";
import AppRoutes from "./Routes";
import { CatProvider } from "./contexts/CanContext";

function App() {
    return (
        <CatProvider>
            <AppRoutes />
        </CatProvider>
    );
}

export default App;