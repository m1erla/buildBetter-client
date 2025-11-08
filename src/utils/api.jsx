import axios from "axios";
import config from "../config";

const isDevelopment = process.env.NODE_ENV === "development";

const api = axios.create({
  baseURL: config.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 second timeout
});

// Request interceptor
api.interceptors.request.use(
  (requestConfig) => {
    const token = localStorage.getItem("accessToken");

    // Only log in development
    if (isDevelopment) {
      console.log("API Request:", {
        url: requestConfig.url,
        method: requestConfig.method,
        hasToken: !!token,
      });
    }

    if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }
    return requestConfig;
  },
  (error) => {
    if (isDevelopment) {
      console.error("API Request Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Only log successful responses in development
    if (isDevelopment) {
      console.log("API Response Success:", {
        url: response.config.url,
        status: response.status,
      });
    }
    return response;
  },
  (error) => {
    // Log errors appropriately based on environment
    if (isDevelopment) {
      console.error("API Response Error:", {
        url: error.config?.url,
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
      });
    }

    // Timeout error check
    if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
      return Promise.reject(
        new Error(
          error.response?.data?.message ||
            "Request timeout. Please try again."
        )
      );
    }

    // Authentication error check (401)
    if (error.response?.status === 401) {
      const isLoginRequest = error.config?.url?.includes("/auth/authenticate");
      const isOnLoginPage = window.location.pathname.includes("/login");

      if (!isOnLoginPage && !isLoginRequest) {
        localStorage.clear();
        return Promise.reject(
          new Error("Session expired. Please log in again.")
        );
      }
    }

    // Handle other specific status codes
    if (error.response?.status === 403) {
      return Promise.reject(
        new Error(error.response?.data?.message || "Access denied.")
      );
    }

    if (error.response?.status === 404) {
      return Promise.reject(
        new Error(error.response?.data?.message || "Resource not found.")
      );
    }

    if (error.response?.status >= 500) {
      return Promise.reject(
        new Error(error.response?.data?.message || "Server error. Please try again later.")
      );
    }

    // Network errors
    if (error.message === "Network Error") {
      return Promise.reject(
        new Error("Network error. Please check your internet connection.")
      );
    }

    // Backend error message or default
    if (error.response?.data?.message) {
      return Promise.reject(new Error(error.response.data.message));
    }

    return Promise.reject(error);
  }
);

export default api;
