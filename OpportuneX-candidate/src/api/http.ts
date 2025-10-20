import axios from "axios";

// ✅ Central Axios instance
const http = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true, // allow cookies (for session-based auth)
  timeout: 15000, // 15s request timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ Request interceptor
// http.interceptors.request.use(
//   (config) => {
//     // Example: attach auth token from localStorage/sessionStorage
//     const token =
//       typeof window !== "undefined" ? localStorage.getItem("token") : null;
//     console.log("token", token);

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// ✅ Response interceptor
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Example: Handle 401 Unauthorized globally
    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "Token_Invalid_or_Expire"
    ) {
      const res = await axios.post(
        "http://localhost:5500/api/v1/candidate/auth/refresh",
        {},
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
    }

    return Promise.reject(error);
  }
);

export default http;
