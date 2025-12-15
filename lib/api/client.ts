/**
 * API Client for Laravel Backend
 * Base URL: http://127.0.0.1:8000/api/v1
 */

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    // Only access localStorage in browser environment
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Helper to process queued requests
const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Response interceptor for error handling and token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (typeof window === 'undefined') {
        return Promise.reject(error);
      }

      // Check if this is a refresh token request that failed
      if (originalRequest.url?.includes('/refresh')) {
        // Refresh token is invalid, clear everything and redirect to login
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
        document.cookie = 'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';

        const currentPath = window.location.pathname;
        const redirectUrl = `/login?redirect=${encodeURIComponent(currentPath)}&expired=true`;
        window.location.href = redirectUrl;
        return Promise.reject(error);
      }

      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('refresh_token');

      if (!refreshToken) {
        // No refresh token, redirect to login
        localStorage.removeItem('auth_token');
        document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';

        const currentPath = window.location.pathname;
        const redirectUrl = `/login?redirect=${encodeURIComponent(currentPath)}&expired=true`;
        window.location.href = redirectUrl;
        return Promise.reject(error);
      }

      try {
        // Try to refresh the token
        const response = await axios.post(
          `${API_BASE_URL}/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
          }
        );

        const { access_token, refresh_token: newRefreshToken } = response.data.data;

        // Store new tokens
        localStorage.setItem('auth_token', access_token);
        localStorage.setItem('refresh_token', newRefreshToken);

        // Update cookies
        const accessExpiryDate = new Date();
        accessExpiryDate.setDate(accessExpiryDate.getDate() + 7);
        document.cookie = `auth_token=${access_token}; path=/; expires=${accessExpiryDate.toUTCString()}; SameSite=Lax`;

        const refreshExpiryDate = new Date();
        refreshExpiryDate.setDate(refreshExpiryDate.getDate() + 30);
        document.cookie = `refresh_token=${newRefreshToken}; path=/; expires=${refreshExpiryDate.toUTCString()}; SameSite=Lax`;

        // Update the authorization header
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
        }

        // Process queued requests
        processQueue(null, access_token);

        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        processQueue(refreshError as Error, null);

        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
        document.cookie = 'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';

        const currentPath = window.location.pathname;
        const redirectUrl = `/login?redirect=${encodeURIComponent(currentPath)}&expired=true`;
        window.location.href = redirectUrl;

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;

