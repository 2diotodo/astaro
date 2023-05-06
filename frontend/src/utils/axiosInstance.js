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
    const {config, response:{status}} = error;

    if (error.response.status === 401 && retry) {
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
          localStorage.setItem('access-token', accessToken);
          console.log(originalRequest.headers.Authorization)
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          console.log(originalRequest.headers.Authorization);
          console.log(originalRequest)
          // const newConfig = Object.assign({}, originalRequest, {
          //   headers: Object.assign({}, originalRequest.headers, {
          //     Authorization: `Bearer ${accessToken}`
          //   })
          // });
          return axios(originalRequest);
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
