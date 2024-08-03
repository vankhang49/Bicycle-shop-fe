import axiosInstance from "../../utils/axiosInstance";

export const getAllCustomer = async (searchContent, page) => {
    try {
        const temp = await axiosInstance.get(`/users/customer?userCode=${searchContent}` +
        `&fullName=${searchContent}&page=${page}`);
        console.log(temp.data);
        return temp.data;
    } catch (e) {
        throw e.response.data;
    }
}

export const getAllEmployee = async (searchContent, page) => {
    try {
        const temp = await axiosInstance.get(`/users/employees?userCode=${searchContent}` +
            `&fullName=${searchContent}&page=${page}`);
        console.log(temp.data);
        return temp.data;
    } catch (e) {
        throw e.response.data;
    }
}

export const getUserById = async (userId) => {
    try {
        const temp = await axiosInstance.get(`/users/${userId}`);
        return temp.data;
    } catch (e) {

    }
}

export const saveUser = async (employee) => {
    try {
        const temp = await axiosInstance.post(`/users`, employee)
        console.log(temp.data);
        return temp.data;
    }catch (e) {
        console.log(e)
        throw e.response.data;
    }
}

export const updateUser = async (id, employee) => {
    try {
        const temp = await axiosInstance.put(`users/${id}`, employee)
        console.log(temp.data);
        return temp.data;
    } catch (e) {
        throw e.response.data;
    }
}

export const deleteUser = async (userId) => {
    try {
        const temp = await axiosInstance.delete(`/users/${userId}`);
        console.log(temp.data);
        return temp.data;
    } catch (e) {
        throw e.response.data.errors;
    }
}

export const disableUser = async (userId) => {
    try {
        const temp = await axiosInstance.put(`/users/disable/${userId}`);
        console.log(temp.data);
        return temp.data;
    } catch (e) {
        throw e.response.data.errors;
    }
}

export const enableUser = async (userId) => {
    try {
        const temp = await axiosInstance.put(`/users/enable/${userId}`);
        console.log(temp.data);
        return temp.data;
    } catch (e) {
        throw e.response.data.errors;
    }
}