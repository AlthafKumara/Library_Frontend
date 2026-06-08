import axios from 'axios'
import { useAuthStore } from '@/store/authStore.js'

/**
 * services/api.js — Single Axios instance for the entire app
 *
 * REQUEST INTERCEPTOR:
 *   Automatically injects "Authorization: Bearer <token>" header
 *   on every outgoing request, reading from the Zustand authStore.
 *
 * RESPONSE INTERCEPTOR (401 handling):
 *   When a request fails with 401 (token expired):
 *   1. Calls POST /auth/refresh-token (uses HTTP-only cookie automatically)
 *   2. Updates the Zustand store with the new access token
 *   3. Retries the original failed request with the new token
 *   4. If refresh also fails → clears auth state (user is logged out)
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1',
  withCredentials: true, // Required: sends HTTP-only refresh token cookie
  headers: {
    'Content-Type': 'application/json',
  },
})

// ─── Request Interceptor ────────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// ─── Response Interceptor (auto refresh on 401) ─────────────────────
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue requests that come in while we're already refreshing
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return api(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // Attempt to get a new access token using the HTTP-only cookie
        const response = await api.post('/auth/refresh-token')
        const { accessToken, user } = response.data.data

        useAuthStore.getState().setAuth(user, accessToken)
        processQueue(null, accessToken)

        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        useAuthStore.getState().clearAuth()
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

export default api
