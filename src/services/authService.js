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
  const response = await api.post('/auth/login', { email, password })
  return parseResponse(AuthResponseSchema, response.data.data)
}

/**
 * Register a new user.
 * @param {{ email: string, password: string, confirmPassword: string }} payload
 * @returns {Promise<{ accessToken: string, user: object }>}
 */
export async function register({ email, password, confirmPassword }) {
  const response = await api.post('/auth/register', {
    email,
    password,
    confirmPassword,
  })
  return parseResponse(AuthResponseSchema, response.data.data)
}

/**
 * Logout the current user.
 * The backend clears the HTTP-only refresh token cookie.
 */
export async function logout() {
  await api.post('/auth/logout')
}
