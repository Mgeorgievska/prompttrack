import { useEffect, useState } from "react";
import api from "../api/axios";
import PromptCard from "../components/PromptCard";

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
        <div>
            <h1>PromptTrack </h1>
            <h2>AI Prompt Library</h2>

            <p>Number of prompts: {prompts.length}</p>

            {prompts.map((prompt) => (
                <PromptCard
                    key={prompt.id}
                    prompt={prompt}
                />
            ))}
        </div>
    );
}

export default Home;