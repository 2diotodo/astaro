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
    let retry = null;
    if (error.response){
        retry = error.response.data ==="expired Token";
    }
    const {config} = error;

    if (error.response && error.response.status === 401 && retry) {
      const originalRequest = config;
      const accessToken = localStorage.getItem('access-token');
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/member-service/auth/refresh`, {
        accessToken: accessToken,
      },{
        headers:{
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true})
        .then((res) => {
          const accessToken = res.data.accessToken;
          const seq = res.data.seq;
          localStorage.setItem('access-token', accessToken);
          localStorage.setItem('seq', seq);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
