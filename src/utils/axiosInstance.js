import axios from 'axios';
import {toast} from "react-toastify";

const apiUrl = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: `${apiUrl}/api/auth`,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer`;
      config.headers.userId = localStorage.getItem("id");
      return config;
    },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
   async (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Lỗi 401: Unauthorized');
        localStorage.removeItem('role');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('lastTime');
        localStorage.removeItem('fullName');
        localStorage.removeItem('avatar');
        localStorage.removeItem('id');
      toast.warning("Đã hết phiên đăng nhập");
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
    }else if(error.code === "ERR_NETWORK"){

      toast.error("Máy chủ đang gặp sự cố !");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;