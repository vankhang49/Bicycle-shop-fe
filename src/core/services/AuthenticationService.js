import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

const baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

export const login = async (data) => {
    try {
        const loginData = {
            email: data.email,
            password: data.password,
        }
        const response = await axios.post(`${baseURL}/api/auth/authenticate`, loginData)
        console.log(response.data)
        return response.data;
    } catch (e) {
        throw e.response.data.message;
    }
}

export const register = async (userData) => {
    try{
        const registerData = {
            newEmail: userData.newEmail,
            newPassword: userData.newPassword,
            confirmPassword: userData.confirmPassword
        }
        console.log(registerData)
        const response = await axios.post(`${baseURL}/api/auth/register`, registerData)
        return response.data;
    }catch(err){
        throw err.response.data;
    }
}

export const logout = async () => {
    try {
        const userId = localStorage.getItem("id");
        await axiosInstance.post(`logout?userId=${userId}`);
    } catch (e) {
        throw e;
    }
}

export const getYourProfile = async () => {
    try{
        const response = await axiosInstance.get(`get-profile`);
        console.log(response.data)
        return response.data;
    }catch(err){
        console.log(err);
    }
}

export const updatePasswordUser = async (userData, token) => {
    try{
        const response = await axiosInstance.put(`update-password`, userData);
        return response.data;
    }catch(err){
        console.log(err)
        err.message = "Vui lòng nhập đúng mật khẩu!"
        throw err;
    }
}

export const updateAvatar = async (email, avatar) => {
    try {
        const request = {
            email: email,
            avatar: avatar
        }
        const resp = await axiosInstance.patch(`update-image`, request);
        console.log(resp.data);
        return resp.data;
    } catch (e) {
        throw e.response.data;
    }
}

export const updateInfo = async (userData) => {
    try {
        const resp = await axiosInstance.put(`update-info`, userData);
        console.log(resp.data);
        return resp.data;
    } catch (e) {
        console.log(e)
        throw e.response.data;
    }
}

/**AUTHENTICATION CHECKER */

export const getRoles = async () => {
    try {
        const response = await axiosInstance.get(`${baseURL}/api/auth/user-role`)
        console.log(response.data)
        return response.data;
    } catch (e) {
        return [];
    }
}

export const isAdmin = async () =>{
    const roles = await getRoles();
    return roles.some(role => role.roleName === 'ROLE_ADMIN');
}
export const isCustomer = async () =>{
    const roles = await getRoles();
    return roles.some(role => role.roleName === 'ROLE_CUSTOMER');
}

export const isEmployee = async () =>{
    const roles = await getRoles();
    return roles.some(role => role.roleName === 'ROLE_EMPLOYEE');
}

export const isStoreManager = async () =>{
    const roles = await getRoles();
    return roles.some(role => role.roleName === 'ROLE_MANAGER');
}

export const adminOnly = () =>{
    return localStorage.getItem('isAuthenticated') && this.isAdmin();
}