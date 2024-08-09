import axios from "axios";

const BASE_URL = "https://bicycle-shop-be.onrender.com/api/public";
axios.defaults.withCredentials = true;

export const getAllCategories = async () => {
    try {
        const temp
            = await axios.get(`${BASE_URL}/categories`);
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}

export const saveCategory = async (category) => {
    try {
        const temp = await axios.post(`${BASE_URL}/categories`, category);
        return temp.data;
    } catch (e) {
        e.message = "Không thể thêm mới danh mục!";
        throw e;
    }
}

export const deleteCategory = async (id) => {
    try {
        const temp = await axios.delete(`${BASE_URL}/categories/${id}`);
        return temp.data;
    } catch (e) {
        e.message = "Không thể xóa danh mục!";
        throw e;
    }
}