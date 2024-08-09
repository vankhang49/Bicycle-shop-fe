import axios from "axios";

const BASE_URL = "https://bicycle-shop-be.onrender.com/api/public";
axios.defaults.withCredentials = true;

export const getAllPromotions = async () => {
    try {
        const temp
            = await axios.get(`${BASE_URL}/promotions`);
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}