import { useEffect, useState } from "react";
import api from "../api/axios";
import PromptCard from "../components/PromptCard";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Home() {
    const [prompts, setPrompts] = useState([]);

    useEffect(() => {
        console.log("Home loaded");

        const fetchPrompts = async () => {
            try {
                const response = await api.get("/prompts");

                console.log(response.data);

                setPrompts(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPrompts();
    }, []);

    return (
    <>

        <Navbar />

        <div
            style={{
                display: "flex"
            }}
        >

            <Sidebar />

            <div
                style={{
                    flex: 1,
                    padding: "20px"
                }}
            >

                {
                    prompts.map(prompt => (

                        <PromptCard
                            key={prompt.id}
                            prompt={prompt}
                        />

                    ))
                }

            </div>

        </div>

    </>
);
}

export default Home;