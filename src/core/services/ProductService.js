import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

const BASE_URL = "https://bicycle-shop-be.onrender.com/api/public";
axios.defaults.withCredentials = true;

export async function getAllProducts(page, nameSearch, familyName, categoryName, brandName, priceBefore, priceAfter) {
    try {
        const temp
            = await axios.get(`${BASE_URL}/products?page=${page}&nameSearch=${nameSearch}` +
            `&familyName=${familyName}&categoryName=${categoryName}&brandName=${brandName}` +
            `&priceBefore=${priceBefore}&priceAfter=${priceAfter}`);
        console.log(temp.data)
        return temp.data;
    } catch (e) {
        throw e.response.data;
    }
}

export const getNewProducts = async () => {
    try {
        const temp
            = await axios.get(`${BASE_URL}/products/new-products`);
        console.log(temp.data.content)
        return temp.data.content;
    } catch (e) {
        throw e.response.data;
    }
}

export const getRelatedProducts = async (categoryName) => {
    try {
        const temp
            = await axios.get(`${BASE_URL}/products/related-products?categoryName=${categoryName}`);
        console.log(temp.data.content)
        return temp.data.content;
    } catch (e) {
        throw e.response.data;
    }
}

export const getAllProductsAuth= async (searchContent, page) => {
    try {
        const temp = await axiosInstance.get(`products?productCode=${searchContent}` +
        `&productName=${searchContent}&brandName=${searchContent}&page=${page}`);
        console.log(temp.data);
        return temp.data;
    } catch (e) {
        throw e.response.data;
    }
}

export const getProductByPriceId = async (priceId) => {
    try {
        const temp = await axiosInstance.get(`products/pricing/${priceId}`);
        console.log(temp.data);
        return temp.data;
    } catch (e) {
        throw e.response.data;
    }
}

export async function getProductAndPricingById(productId) {
    try {
        const temp = await axios.get(`${BASE_URL}/products/detail/${productId}`);
        console.log(temp.data)
        return temp.data.product;
    } catch (e) {
        throw new Error("Không tìm thấy sản phẩm!")
    }
}

export const saveProduct= async (product) => {
    try {
        const temp = await axios.post(`${BASE_URL}/products`, product);
        console.log(temp.data)
        return temp.data;
    } catch (e) {
        throw new Error("Không thể thêm mới!")
    }

}

export const updateProduct= async (product) => {
    try {
        const temp = await axios.put(`${BASE_URL}/products`, product);
        console.log(temp.data)
        return temp.data;
    } catch (e) {
        throw new Error("Không thể cập nhật!")
    }
}

export const findProductById = async (id) => {
    try {
        const temp = await axios.get(`${BASE_URL}/products/${id}`);
        console.log(temp.data)
        return temp.data;
    } catch (e) {
        throw new Error("Không tìm thấy kết quả!")
    }
}
