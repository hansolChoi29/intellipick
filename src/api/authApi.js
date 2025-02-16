import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-Type": "application/json",
    },
});
export const signInWithEmailAndPassword = async (email, password) => {
    const response = await api.post("/sign-in", { email, password });
    return response.data;
};
export const signUpWithEmailAndPassword = async (email, password, nickname) => {
    const response = await api.post("/sign-up", { email, password, nickname });
    return response.data;
};
export default api;
