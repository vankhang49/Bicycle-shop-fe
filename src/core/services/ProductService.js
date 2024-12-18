import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

const BASE_URL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

export async function getAllProducts(page, nameSearch, familyName, categoryName, brandName, priceBefore, priceAfter) {
    try {
        const temp
            = await axios.get(`${BASE_URL}/api/public/products?page=${page}&nameSearch=${nameSearch}` +
            `&familyName=${familyName}&categoryName=${categoryName}&brandName=${brandName}` +
            `&priceBefore=${priceBefore}&priceAfter=${priceAfter}`);
        console.log(temp.data);
        return temp.data;
    } catch (e) {
        throw e.response.data;
    }
}

export const getNewProducts = async () => {
    try {
        const temp
            = await axios.get(`${BASE_URL}/api/public/products/new-products`);
        return temp.data.content;
    } catch (e) {
        throw e.response.data;
    }
}

export const getRelatedProducts = async (categoryName) => {
    try {
        const temp
            = await axios.get(`${BASE_URL}/api/public/products/related-products?categoryName=${categoryName}`);
        return temp.data.content;
    } catch (e) {
        throw e.response.data;
    }
}

export const getAllProductsAuth= async (searchContent, page) => {
    try {
        const temp = await axiosInstance.get(`products?productCode=${searchContent}` +
        `&productName=${searchContent}&brandName=${searchContent}&page=${page}`);
        return temp.data;
    } catch (e) {
        throw e.response.data;
    }
}

export const getProductByPriceId = async (priceId) => {
    try {
        const temp = await axiosInstance.get(`products/pricing/${priceId}`);
        return temp.data;
    } catch (e) {
        throw e.response.data;
    }
}

export const getOneNewProduct = async () => {
    try {
        const temp = await axios.get(`${BASE_URL}/api/public/products/one-new-product`);
        console.log(temp.data)
        return temp.data;
    } catch (e) {
        throw e.response.data;
    }
}

export async function getProductAndPricingById(productId) {
    try {
        const temp = await axios.get(`${BASE_URL}/api/public/products/detail/${productId}`);
        console.log(temp.data.product)
        return temp.data.product;
    } catch (e) {
        throw new Error("Không tìm thấy sản phẩm!")
    }
}

export const saveProduct= async (product) => {
    try {
        const temp = await axiosInstance.post(`products`, product);
        return temp.data;
    } catch (e) {
        throw new Error("Không thể thêm mới!")
    }

}

export const updateProduct= async (product) => {
    try {
        const temp = await axiosInstance.put(`products`, product);
        return temp.data;
    } catch (e) {
        throw new Error("Không thể cập nhật!")
    }
}

export const findProductById = async (id) => {
    try {
        const temp = await axios.get(`${BASE_URL}/api/public/products/${id}`);
        return temp.data;
    } catch (e) {
        throw new Error("Không tìm thấy kết quả!")
    }
}

export const deleteProductById = async (id) => {
    try {
        const temp = await axiosInstance.delete(`products/${id}`);
        return temp.data;
    } catch (e) {
        throw new Error("Không tìm thấy kết quả!")
    }
}
