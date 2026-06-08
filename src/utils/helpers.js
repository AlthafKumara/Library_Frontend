/**
 * utils/helpers.js — Miscellaneous pure utility functions
 * No React, no Axios — just plain JavaScript.
 */

/**
 * Convert a plain object to FormData.
 * Used for file uploads (profile photo, book cover).
 *
 * @param {Object} obj - Key/value pairs to convert
 * @returns {FormData}
 *
 * @example
 * const fd = buildFormData({ photo: fileInput.files[0] })
 * await profileService.uploadPhoto(fd)
 */
export function buildFormData(obj) {
  const formData = new FormData()
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value)
    }
  })
  return formData
}

/**
 * Get initials from a full name string.
 * Used as fallback when a user has no profile photo.
 *
 * @param {string} name - Full name, e.g. "John Doe"
 * @returns {string} - Up to 2 uppercase initials, e.g. "JD"
 *
 * @example
 * getInitials("John Doe")   // "JD"
 * getInitials("Alice")      // "A"
 * getInitials("")           // "?"
 */
export function getInitials(name) {
  if (!name || typeof name !== 'string') return '?'
  return name
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('')
}
