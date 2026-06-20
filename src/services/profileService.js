import api from './api'
import { ProfileSchema } from '../models/profile'
import { parseResponse } from '../utils/parseResponse'

/**
 * Fetch the authenticated user's profile.
 * Token otomatis di-inject oleh Axios request interceptor (api.js).
 * 
 * @returns {Promise<object>}
 */
export async function getProfile() {
  try {
    const response = await api.get('/profile/')
    return parseResponse(ProfileSchema, response.data.data)
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      'Gagal memuat profil.'
    throw new Error(message, { cause: error })
  }
}
