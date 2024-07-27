import axios from "axios";

const BASE_URL = "http://localhost:8080/api/public";

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