import axios from "axios";

const BASE_URL = "https://bicycle-shop-be.onrender.com/api/public";
axios.defaults.withCredentials = true;

export const getAllColors = async () => {
    try {
        const temp
            = await axios.get(`${BASE_URL}/colors`);
        return temp.data;
    } catch (e) {
        return [];
    }
}