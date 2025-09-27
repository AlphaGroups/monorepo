import axios from "axios";

// Create a global event for loading state changes
const loadingEvent = new Event('globalLoadingChange');

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });

  failedQueue = [];
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Dispatch loading start event
  window.dispatchEvent(new CustomEvent('globalLoadingStart'));
  return config;
});

api.interceptors.response.use(
  (res) => {
    // Dispatch loading end event
    window.dispatchEvent(new CustomEvent('globalLoadingEnd'));
    return res;
  },
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          { refresh_token: refreshToken }
        );

        const newToken = res.data.access_token;
        localStorage.setItem("accessToken", newToken);

        api.defaults.headers.Authorization = `Bearer ${newToken}`;
        processQueue(null, newToken);

        return api(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        localStorage.clear();
        window.location.href = "/lms/login";
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
        window.dispatchEvent(new CustomEvent('globalLoadingEnd'));
      }
    }

    // Dispatch loading end event on error
    window.dispatchEvent(new CustomEvent('globalLoadingEnd'));
    return Promise.reject(err);
  }
);

export default api;
