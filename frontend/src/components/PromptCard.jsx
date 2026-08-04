// import { useState } from "react";

import {
    addFavorite,
    removeFavorite
} from "../api/favorites";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";




function PromptCard({
    prompt,
    favorites,
    setFavorites
}) {

    console.log("PromptCard:", prompt.id, favorites);
    console.log({
    prompt,
    favorites
});

    const isFavorite = (favorites || []).some(
    (fav) => fav && fav.prompt_id === prompt.id
);
   const navigate = useNavigate();

   const handleDelete = async () => {

    const confirmDelete = window.confirm(
        "Delete this prompt?"
    );


    if (!confirmDelete) return;


    try {

        await api.delete(`/prompts/${prompt.id}`);

        window.location.reload();


    } catch(error) {

        console.error(error);

    }

};


    const handleFavorite = async () => {
        console.log("Clicked!", prompt.id);

        try {

            if (isFavorite) {

                await removeFavorite(prompt.id);

                setFavorites(
                    favorites.filter(
                        (fav) => fav.prompt_id !== prompt.id
                    )
                );

            } else {

                const response = await addFavorite(prompt.id);

                setFavorites([
                    ...favorites,
                    response
                ]);

            }


        } catch (error) {

            console.error(error);

        }

    };


    return (

        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "15px"
            }}
        >

            <h3>
                {prompt.title}
            </h3>


            <p>
                {prompt.description}
            </p>


            <p>
                Category: {prompt.category}
            </p>


            <pre>
                {prompt.content}
            </pre>


            <button
                onClick={handleFavorite}
            >
                {
                    isFavorite
                    ? "⭐ Remove favorite"
                    : "☆ Add favorite"
                }
            </button>

            <button
                onClick={() => navigate(`/edit/${prompt.id}`)}
            >
            Edit
            </button>


            <button
                onClick={handleDelete}
            >
            Delete
            </button>


        </div>

    );

}


export default PromptCard;