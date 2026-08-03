import axios from "axios";
console.log("AXIOS FILE LOADED");
const api = axios.create({
    baseURL: "http://localhost:5000/api"
});

export default api;