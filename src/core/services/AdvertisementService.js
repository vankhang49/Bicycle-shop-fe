import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

const baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

export const getAllAdvertisements = async () => {
    try {
        const temp = await axios.get(`${baseURL}/api/auth/advertisements/public`);
        return temp.data.content;
    } catch (e) {
        return [];
    }
}

export const saveAdvertisement = async (advertisements) => {
    try {
        const response = await axiosInstance.post(`advertisements`, advertisements);
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
}

export const updateAdvertisement = async (advertisements) => {
    try {
        const response = await axiosInstance.put(`advertisements`, advertisements);
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
}

