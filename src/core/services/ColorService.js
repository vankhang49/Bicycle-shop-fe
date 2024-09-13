import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

export const getAllColors = async () => {
    try {
        const temp
            = await axios.get(`${BASE_URL}/api/public/colors`);
        return temp.data;
    } catch (e) {
        return [];
    }
}