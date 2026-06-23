import api from './api'
import { ProfileSchema } from '../models/profile'
import parseApiResponse from '../utils/parseResponse'
import errorHandling from '../utils/errorHandling'

/**
 * Fetch the authenticated user's profile.
 * Token otomatis di-inject oleh Axios request interceptor (api.js).
 * 
 * @returns {Promise<object>}
 */
export async function getProfile() {
  try {
    const response = await api.get('/profile/', {
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
    })
    return parseApiResponse(ProfileSchema, response.data)
  } catch (error) {
    throw errorHandling(error, "Error When Get Profile Data")
  }
}
