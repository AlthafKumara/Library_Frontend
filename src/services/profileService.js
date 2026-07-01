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

/**
 * Complete the authenticated user's profile.
 * 
 * @param {{ name: string, gender: string, photo_profile?: string }} payload
 * @returns {Promise<object>}
 */
export async function completeProfile(payload) {
  try {
    const response = await api.put('/profile/complete-profile', payload)
    return parseApiResponse(ProfileSchema, response.data)
  } catch (error) {
    throw errorHandling(error, "Error When Completing Profile")
  }
}

/**
 * Upload a profile photo using multipart/form-data.
 * 
 * @param {File} file  — the image File object selected by the user
 * @returns {Promise<{ photoUrl: string }>}  — the uploaded photo URL
 */
export async function uploadPhotoProfile(file) {
  try {
    const formData = new FormData()
    formData.append('photo_profile', file)

    const response = await api.post('/profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    // Return raw parsed envelope; caller extracts photo URL
    return parseApiResponse(null, response.data)
  } catch (error) {
    throw errorHandling(error, "Error When Uploading Photo Profile")
  }
}
