import axios from "axios";

const api = axios.create({
  baseURL: "https://korpapuatapi.arihantcapital.com/api/V1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Log all errors for debugging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("🔴 API Error:", {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

const getType = (branchCode) => branchCode.replace(/[0-9]/g, '');

// STEP 1: Get CSRF Token
export const getCsrfToken = (branchCode) =>
  api.post("/setcsrftoken", {
    branchCode: branchCode,
    type: getType(branchCode),
  });

// STEP 2: Send OTP
export const sendOtp = (branchCode, csrfToken) =>
  api.post("/sendotp", {
    branchCode: branchCode,
    type: getType(branchCode),
    CsrfToken: csrfToken,
  });

// STEP 3: Verify OTP
export const verifyOtp = (branchCode, otp, csrfToken) =>
  api.post("/validatingotp", {
    branchCode: branchCode,
    type: getType(branchCode),
    otp: otp,
    CsrfToken: csrfToken,
  });

export default api;
