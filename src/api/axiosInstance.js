import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://korpapuatapi.arihantcapital.com/api/V1",
  withCredentials: true, // cookies/session send karega
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("connect_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
