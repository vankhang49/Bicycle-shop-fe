import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

const BASE_URL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

export const getAllCategories = async () => {
    try {
        const temp
            = await axios.get(`${BASE_URL}/api/public/categories`);
        return temp.data;
    } catch (e) {
        return [];
    }
}

export const saveCategory = async (category) => {
    try {
        const temp = await axiosInstance.post(`categories`, category);
        return temp.data;
    } catch (e) {
        e.message = "Không thể thêm mới danh mục!";
        throw e;
    }
}

export const deleteCategory = async (id) => {
    try {
        const temp = await axiosInstance.delete(`categories/${id}`);
        return temp.data;
    } catch (e) {
        e.message = "Không thể xóa danh mục!";
        throw e;
    }
}