import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

const BASE_URL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

export const getAllBrand = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/public/brands`);
        return response.data;
    } catch (e) {
        return [];
    }
}

export const getAllBrandByCategoryName = async (categoryName) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/public/brands/${categoryName}`);
        return response.data;
    } catch (e) {
        return [];
    }
}

export const saveBrand = async (brand) => {
    try {
        const response = await axiosInstance.post(`brands`, brand);
        return response.data;
    } catch (e) {
        e.message = "Không thể thêm mới thương hiệu!";
        throw e;
    }
}

export const deleteBrand = async (id) => {
    try {
        const response = await axiosInstance.delete(`brands/${id}`);
        return response.data;
    } catch (e) {
        e.message = "Không thể xóa thương hiệu!";
        throw e;
    }
}
