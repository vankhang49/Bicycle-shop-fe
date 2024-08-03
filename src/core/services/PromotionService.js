import axios from "axios";

const BASE_URL = "http://192.168.100.236:8080/api/public";
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