import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/axios";
import Navbar from "../components/Navbar";

function EditPrompt() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [categoryId, setCategoryId] = useState("");

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);

                const promptResponse = await api.get(
                    `/prompts/${id}`
                );

                const categoryResponse = await api.get(
                    "/categories"
                );

                const prompt = promptResponse.data;

                setTitle(prompt.title || "");
                setDescription(prompt.description || "");
                setContent(prompt.content || "");

                if (
                    prompt.category_id !== undefined &&
                    prompt.category_id !== null
                ) {
                    setCategoryId(String(prompt.category_id));
                }

                setCategories(
                    Array.isArray(categoryResponse.data)
                        ? categoryResponse.data
                        : []
                );
            } catch (error) {
                console.error(
                    "Failed to load prompt:",
                    error
                );

                alert("Failed to load prompt.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!categoryId) {
            alert("Please select a category.");
            return;
        }

        try {
            setSaving(true);

            await api.put(`/prompts/${id}`, {
                title: title,
                description: description,
                content: content,
                category_id: Number(categoryId)
            });

            navigate("/");
        } catch (error) {
            console.error(
                "Failed to update prompt:",
                error
            );

            alert("Failed to update prompt.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="form-page">
                <Navbar />

                <div className="form-container">
                    <div className="form-header">
                        <h1>Edit Prompt</h1>
                        <p>Loading prompt...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="form-page">
            <Navbar />

            <div className="form-container">
                <div className="form-header">
                    <h1>Edit Prompt</h1>

                    <p>
                        Update your reusable prompt.
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
                            required
                        >
                            {categories.map((category) => (
                                <option
                                    key={category.id}
                                    value={String(category.id)}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>PROMPT CONTENT</label>

                        <textarea
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
                                : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditPrompt;