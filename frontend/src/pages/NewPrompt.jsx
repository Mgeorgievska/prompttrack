
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import Navbar from "../components/Navbar";

function NewPrompt() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");

    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");

    const [loadingCategories, setLoadingCategories] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await api.get("/categories");

                const data = Array.isArray(response.data)
                    ? response.data
                    : [];

                setCategories(data);

                if (data.length > 0) {
                    setCategoryId(String(data[0].id));
                }
            } catch (error) {
                console.error("Failed to load categories:", error);
            } finally {
                setLoadingCategories(false);
            }
        };

        loadCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!categoryId) {
            alert("Please select a category.");
            return;
        }

        try {
            setSaving(true);

            await api.post("/prompts", {
                title,
                description,
                content,
                category_id: Number(categoryId),
            });

            navigate("/");
        } catch (error) {
            console.error("Failed to create prompt:", error);
            alert("Failed to create prompt.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="form-page">
            <Navbar />

            <div className="form-container">

                <div className="form-header">
                    <h1>Create New Prompt</h1>

                    <p>
                        Add a new reusable prompt to your library.
                    </p>
                </div>

                <form
                    className="prompt-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">
                        <label>TITLE</label>

                        <input
                            type="text"
                            placeholder="e.g. Python Expert"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>DESCRIPTION</label>

                        <input
                            type="text"
                            placeholder="Briefly describe what this prompt does"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>CATEGORY</label>

                        <select
                            value={categoryId}
                            onChange={(e) =>
                                setCategoryId(e.target.value)
                            }
                            disabled={
                                loadingCategories ||
                                categories.length === 0
                            }
                            required
                        >
                            {loadingCategories ? (
                                <option value="">
                                    Loading categories...
                                </option>
                            ) : categories.length === 0 ? (
                                <option value="">
                                    No categories available
                                </option>
                            ) : (
                                categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={String(category.id)}
                                    >
                                        {category.name}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>PROMPT CONTENT</label>

                        <textarea
                            placeholder="Write your prompt here..."
                            value={content}
                            onChange={(e) =>
                                setContent(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-actions">

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={() => navigate("/")}
                            disabled={saving}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="save-button"
                            disabled={saving || !categoryId}
                        >
                            {saving
                                ? "Saving..."
                                : "Save Prompt"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}

export default NewPrompt;

