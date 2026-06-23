import api from './api'
import { AuthResponseSchema } from '../models/auth'
import parseApiResponse from "../utils/parseResponse"
import errorHandling from '../utils/errorHandling'

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
    return parseApiResponse(AuthResponseSchema, response.data)
  } catch (error) {
    throw errorHandling(error, "Login Gagal, Silahkan Coba Lagi")
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
    return parseApiResponse(AuthResponseSchema, response.data)
  } catch (error) {
    throw errorHandling(error, "Registrasi Gagal, Silahkan Coba Lagi")
  }
}

/**
 * Logout the current user.
 * The backend clears the HTTP-only refresh token cookie.
 */
export async function logout() {
  try {
    const response =  await api.post('/auth/logout')
    return parseApiResponse(null, response.data)
    
    
  } catch (error) {
    throw errorHandling(error, "Logout Gagal, Silahkan Coba Lagi nanti")
  }
}
