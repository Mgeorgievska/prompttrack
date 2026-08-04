import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewPrompt from "./pages/NewPrompt";
import EditPrompt from "./pages/EditPrompt";

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
                <Route
                    path="/edit/:id"
                    element={<EditPrompt />}
                />

            </Routes>



        </BrowserRouter>
    );
}

export default App;