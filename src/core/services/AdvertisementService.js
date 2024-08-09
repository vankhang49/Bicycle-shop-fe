import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

const baseURL = "https://bicycle-shop-be.onrender.com";
axios.defaults.withCredentials = true;

export const getAllAdvertisements = async () => {
    try {
        const temp = await axios.get(`${baseURL}/api/auth/advertisements/public`);
        console.log(temp.data);
        return temp.data.content;
    } catch (e) {
        return [];
    }
}

export const saveAdvertisement = async (advertisements) => {
    try {
        const response = await axiosInstance.post(`advertisements`, advertisements);
        console.log(response.data);
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
}

export const updateAdvertisement = async (advertisements) => {
    try {
        const response = await axiosInstance.put(`advertisements`, advertisements);
        console.log(response.data);
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
}

