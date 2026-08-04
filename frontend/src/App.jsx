import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewPrompt from "./pages/NewPrompt";


function App() {
    console.log("App loaded");

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/new"
                    element={<NewPrompt />}
/>

            </Routes>

        </BrowserRouter>
    );
}

export default App;