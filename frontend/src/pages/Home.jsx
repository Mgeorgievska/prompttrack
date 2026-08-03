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

        fetchPrompts();
        fetchCategories();

    }, []);

    const fetchPrompts = async () => {

        try {

            const response = await api.get("/prompts");

            setPrompts(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const fetchCategories = async () => {

        try {

            const response = await api.get("/categories");

            setCategories(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const filteredPrompts = prompts.filter((prompt) => {

        const matchesSearch =
            prompt.title
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesCategory =
            selectedCategory === "All" ||
            prompt.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });

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
                        Showing {filteredPrompts.length} prompts
                    </p>

                    {
                        filteredPrompts.map((prompt) => (

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