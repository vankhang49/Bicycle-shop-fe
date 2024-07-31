import axios from "axios";

const BASE_URL = "http://192.168.55.102:8080/api/public";
axios.defaults.withCredentials = true;

export const getAllColors = async () => {
    try {
        const temp
            = await axios.get(`${BASE_URL}/colors`);
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}