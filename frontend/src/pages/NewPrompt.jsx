import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";

function NewPrompt() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");

    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");

    useEffect(() => {

        async function loadCategories() {

            try {

                const response = await api.get("/categories");

                setCategories(response.data);

                if (response.data.length > 0) {
                    setCategoryId(response.data[0].id);
                }

            } catch (error) {

                console.error(error);

            }

        }

        loadCategories();

    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/prompts", {

                title,
                description,
                content,
                category_id: categoryId

            });

            navigate("/");

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div style={{ padding: "30px" }}>

            <h2>New Prompt</h2>

            <form onSubmit={handleSubmit}>

                <input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <br /><br />

                <input
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <br /><br />

                <textarea
                    rows="10"
                    cols="70"
                    placeholder="Prompt..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <br /><br />

                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                >

                    {
                        categories.map((category) => (

                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>

                        ))
                    }

                </select>

                <br /><br />

                <button type="submit">

                    Save Prompt

                </button>

            </form>

        </div>

    );

}

export default NewPrompt;