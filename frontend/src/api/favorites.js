import api from "./axios";


export const getFavorites = async () => {
    const response = await api.get("/favorites");
    return response.data;
};


export const addFavorite = async (promptId) => {
    const response = await api.post("/favorites", {
        prompt_id: promptId
    });

    return response.data;
};


export const removeFavorite = async (promptId) => {
    const response = await api.delete(`/favorites/${promptId}`);
    return response.data;
};