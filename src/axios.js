import axios from 'axios'; 

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', 
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const currentPath = window.location.pathname;
      const currentSearch = window.location.search;
      const nextUrl = encodeURIComponent(currentPath + currentSearch);

      if (currentPath !== '/signin') {
        window.location.href = `/signin?next=${nextUrl}`;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;