import axios from "axios";

// ✅ Central Axios instance
const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5500/api/v1",
  withCredentials: true, // allow cookies (for session-based auth)
  timeout: 15000, // 15s request timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  // signal:
});

// ✅ Request interceptor
http.interceptors.request.use(
  (config) => {
    // Example: attach auth token from localStorage/sessionStorage
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Example: Handle 401 Unauthorized globally
    if (error.response?.status === 401) {
      // You could redirect to login or refresh token logic here
      console.warn("Unauthorized: redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default http;
