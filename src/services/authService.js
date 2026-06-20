import api from './api'
import { AuthResponseSchema } from '../models/auth'
import { parseResponse } from '../utils/parseResponse'
/**
 * services/authService.js — All API calls for authentication
 *
 * Endpoints from docs/api_documentation.md:
 *   POST /auth/login          → login
 *   POST /auth/register       → register
 *   POST /auth/logout         → logout
 *   POST /auth/refresh-token  → refreshToken (used by api.js interceptor)
 */

/**
 * Login with email and password.
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ accessToken: string, user: object }>}
 */
export async function login({ email, password }) {
  try {
    const response = await api.post('/auth/login', { email, password })
    return parseResponse(AuthResponseSchema, response.data.data)
  } catch (error) {
    // Extract the backend error message and re-throw a normalised error
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      'Login gagal. Periksa kembali data Anda.'
    throw new Error(message, { cause: error })
  }
}

/**
 * Register a new user.
 * @param {{ email: string, password: string, confirmPassword: string }} payload
 * @returns {Promise<{ accessToken: string, user: object }>}
 */
export async function register({ email, password, confirmPassword }) {
  try {
    const response = await api.post('/auth/register', {
      email,
      password,
      confirmPassword,
    })
    return parseResponse(AuthResponseSchema, response.data.data)
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      'Registrasi gagal. Coba lagi.'
    throw new Error(message, { cause: error })
  }
}

/**
 * Logout the current user.
 * The backend clears the HTTP-only refresh token cookie.
 */
export async function logout() {
  try {
    await api.post('/auth/logout')
  } catch (error) {
    // Logout failure is non-critical — let the caller decide how to handle it
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      'Logout gagal.'
    throw new Error(message, { cause: error })
  }
}
