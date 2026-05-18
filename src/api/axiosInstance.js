import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://korpapuatapi.arihantcapital.com/api/V1",
  timeout: 30000,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Auto-attach JWT token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("connect_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (error) => Promise.reject(error));

// Auto-handle 401 - redirect to login
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("connect_token");
      localStorage.removeItem("connect_manager");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
