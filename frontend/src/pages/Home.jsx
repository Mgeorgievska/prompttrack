import {
    useEffect,
    useState
} from "react";

import api from "../api/axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import PromptCard from "../components/PromptCard";

import { getFavorites } from "../api/favorites";


function Home() {

    const [prompts, setPrompts] =
        useState([]);

    const [categories, setCategories] =
        useState([]);

    const [selectedCategory, setSelectedCategory] =
        useState("All");

    const [search, setSearch] =
        useState("");

    const [favorites, setFavorites] =
        useState([]);

    const [loading, setLoading] =
        useState(true);


    useEffect(() => {

        async function loadFavorites() {

            try {

                const data =
                    await getFavorites();

                setFavorites(data);

            } catch (error) {

                console.error(error);

            }
        }

        loadFavorites();

    }, []);


    useEffect(() => {

        async function loadCategories() {

            try {

                const response =
                    await api.get("/categories");

                setCategories(
                    response.data
                );

            } catch (error) {

                console.error(error);

            }
        }

        loadCategories();

    }, []);


    useEffect(() => {

        async function loadPrompts() {

            setLoading(true);

            try {

                const response =
                    await api.get(
                        "/prompts",
                        {
                            params: {
                                search,
                                category:
                                    selectedCategory
                            }
                        }
                    );

console.log("PROMPTS API RESPONSE:", response.data);

setPrompts(
    Array.isArray(response.data)
        ? response.data
        : response.data.prompts || []
                );

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }
        }

        loadPrompts();

    }, [
        search,
        selectedCategory
    ]);


    return (

        <div className="app">

            <Navbar />


            <div className="app-layout">

                <Sidebar
                    categories={categories}
                    selectedCategory={
                        selectedCategory
                    }
                    setSelectedCategory={
                        setSelectedCategory
                    }
                />


                <main className="main-content">

                    <section className="hero">

                        <div>

                            <div className="hero-label">
                                PROMPTTRACK LIBRARY
                            </div>

                            <h1>
                                Your prompts,
                                <br />
                                <span>
                                    organized.
                                </span>
                            </h1>

                            <p>
                                Create, manage and
                                reuse your best AI
                                prompts in one place.
                            </p>

                        </div>

                    </section>


                    <section className="toolbar">

                        <SearchBar
                            search={search}
                            setSearch={setSearch}
                        />

                        <div className="prompt-count">
                            <strong>
                                {prompts.length}
                            </strong>

                            {prompts.length === 1
                                ? " prompt"
                                : " prompts"}
                        </div>

                    </section>


                    <section className="prompt-section">

                        <div className="section-heading">

                            <div>

                                <h2>
                                    {selectedCategory ===
                                    "All"
                                        ? "All Prompts"
                                        : selectedCategory}
                                </h2>

                                <p>
                                    Your saved prompt
                                    collection
                                </p>

                            </div>

                        </div>


                        {loading ? (

                            <div className="state-message">

                                <div className="loader"></div>

                                <p>
                                    Loading prompts...
                                </p>

                            </div>

                        ) : prompts.length === 0 ? (

                            <div className="empty-state">

                                <div className="empty-icon">
                                    ✦
                                </div>

                                <h3>
                                    No prompts found
                                </h3>

                                <p>
                                    Try another search
                                    or create a new
                                    prompt.
                                </p>

                            </div>

                        ) : (

                            <div className="prompt-grid">

                                {prompts.map(
                                    (prompt) => (

                                        <PromptCard
                                            key={prompt.id}
                                            prompt={prompt}
                                            favorites={
                                                favorites
                                            }
                                            setFavorites={
                                                setFavorites
                                            }
                                        />

                                    )
                                )}

                            </div>

                        )}

                    </section>

                </main>

            </div>

        </div>

    );
}

export default Home;