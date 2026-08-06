import axios from "axios";

// Falls back to a relative "/api" path (same-origin as the page) rather
// than a hardcoded absolute domain. This way the app keeps working no
// matter which domain it's actually deployed on, and API calls stay
// same-origin (avoiding CORS issues) as long as the host proxies /api
// to the Node backend. Set VITE_API_URL in .env.production only if the
// API is deployed on a different domain/subdomain than the frontend.
export const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

const API = axios.create({
  baseURL: API_BASE_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url?.includes("/admin/login");

    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");

      if (
        window.location.pathname.startsWith("/admin") &&
        window.location.pathname !== "/admin/login"
      ) {
        window.location.href = "/admin/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;
