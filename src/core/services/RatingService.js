import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";

const baseURL = "http://localhost:8080/api/auth/rating";
axios.defaults.withCredentials = true;

export const saveRatingList = async (ratings) => {
    try {
        const userId = localStorage.getItem("id");
        const temp = await axiosInstance.post(`rating?userId=${userId}`, ratings);
        return temp.data
    } catch (e) {
        throw e.response.data;
    }
}

export const getAllRatings = async (productId, page, size) => {
    try {
        const temp = await axios.get(`${baseURL}/public?productId=${productId}&page=${page}&size=${size}`);
        console.log(temp.data);
        return temp.data;
    } catch (e) {
        throw e.response.data;
    }
}

export const getAllRatingsByUserId = async (productId, page, size) => {
    try {
        const userId = localStorage.getItem("id");
        const temp = await axiosInstance.get(`rating/user/${userId}?productId=${productId}&page=${page}&size=${size}`);
        console.log(temp.data);
        return temp.data;
    } catch (e) {
        throw e.response.data;
    }
}

export const updateRating = async (rating) => {
    try {
        const response = await axiosInstance.put(`rating`, rating);
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
}