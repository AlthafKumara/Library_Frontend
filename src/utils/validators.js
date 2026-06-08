/**
 * utils/validators.js — Client-side form validation rules
 *
 * These mirror the backend Zod validation rules so errors are caught
 * on the client before hitting the API.
 *
 * Usage: call in form onSubmit or onChange handlers.
 * Returns: { valid: boolean, message: string }
 */

/**
 * Validate an email address.
 * @param {string} email
 * @returns {{ valid: boolean, message: string }}
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return { valid: false, message: 'Email harus diisi' }
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.trim())) {
    return { valid: false, message: 'Format email tidak valid' }
  }
  return { valid: true, message: '' }
}

/**
 * Validate a password.
 * Rules: minimum 8 characters (matches backend Zod rule).
 * @param {string} password
 * @returns {{ valid: boolean, message: string }}
 */
export function validatePassword(password) {
  if (!password) {
    return { valid: false, message: 'Password harus diisi' }
  }
  if (password.length < 8) {
    return { valid: false, message: 'Password minimal 8 karakter' }
  }
  return { valid: true, message: '' }
}

/**
 * Validate that password and confirmPassword match.
 * @param {string} password
 * @param {string} confirmPassword
 * @returns {{ valid: boolean, message: string }}
 */
export function validatePasswordMatch(password, confirmPassword) {
  if (password !== confirmPassword) {
    return { valid: false, message: 'Password tidak cocok' }
  }
  return { valid: true, message: '' }
}
