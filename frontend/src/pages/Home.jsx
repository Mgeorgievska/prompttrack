import { useEffect, useState } from "react";

import api from "../api/axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import PromptCard from "../components/PromptCard";

function Home() {

    const [prompts, setPrompts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [search, setSearch] = useState("");

    useEffect(() => {

    async function loadCategories() {

        try {

            const response = await api.get("/categories");

            setCategories(response.data);

        } catch (error) {

            console.error(error);

        }

    }

    loadCategories();

}, []);

useEffect(() => {

    async function loadPrompts() {

        try {
             console.log("Fetching prompts:", {
                search,
                selectedCategory
            });

            const response = await api.get("/prompts", {

                params: {

                    search,
                    category: selectedCategory

                }

            });

            setPrompts(response.data);

        } catch (error) {

            console.error(error);

        }

    }

    loadPrompts();

}, [search, selectedCategory]);

    
    


    

    return (

        <>

            <Navbar />

            <div
                style={{
                    display: "flex"
                }}
            >

                <Sidebar
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />

                <div
                    style={{
                        flex: 1,
                        padding: "20px"
                    }}
                >

                    <SearchBar
                        search={search}
                        setSearch={setSearch}
                    />

                    <p>
                        Showing {prompts.length} prompts
                    </p>

                    {
                        prompts.map((prompt) => (

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