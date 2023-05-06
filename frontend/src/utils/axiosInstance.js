import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");
    const newConfig = config;
    if (token) {
      newConfig.headers.Authorization = `Bearer ${token}`;
    }
    return newConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const retry = error.response.data==="expired Token";
    const originalRequest = error.config;

    if (error.response.status === 401 && retry) {
      const accessToken = localStorage.getItem('access-token');
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/member-service/auth/refresh`, {
        accessToken: accessToken,
      });

      if (response.status === 200) {
        const accessToken = response.data.accessToken;
        localStorage.setItem('access-token', accessToken);
        return axios(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
