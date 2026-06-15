import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useProfileStore } from '../store/profileStore'
import { login, register, logout } from '../services/authService'
import { getProfile } from '../services/profileService'
import {
  validateEmail,
  validatePassword,
  validatePasswordMatch,
} from '../utils/validators'
import { ROUTES } from '../utils/constants'

/**
 * hooks/useAuth.js — All auth actions + form state in one place.
 *
 * Returns:
 *   loginForm    — state + handler for LoginPage
 *   registerForm — state + handler for RegisterPage
 *   handleLogout — callable from any component
 *   isAuthenticated, user — read from authStore
 */
export function useAuth() {
  const navigate = useNavigate()
  const { setAuth, clearAuth, isAuthenticated, userId } = useAuthStore()

  // ─── Login ────────────────────────────────────────────────────────
  const [loginFields, setLoginFields] = useState({ email: '', password: '' })
  const [loginErrors, setLoginErrors] = useState({})
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginServerError, setLoginServerError] = useState('')

  function onLoginChange(e) {
    const { name, value } = e.target
    setLoginFields((prev) => ({ ...prev, [name]: value }))
    // Clear field error on change
    setLoginErrors((prev) => ({ ...prev, [name]: '' }))
    setLoginServerError('')
  }

  async function handleLogin(e) {
    e.preventDefault()

    // Client-side validation
    const emailCheck = validateEmail(loginFields.email)
    const passwordCheck = validatePassword(loginFields.password)

    const errors = {}
    if (!emailCheck.valid) errors.email = emailCheck.message
    if (!passwordCheck.valid) errors.password = passwordCheck.message

    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors)
      return
    }

    setLoginLoading(true)
    setLoginServerError('')

    try {
      const { accessToken, userId } = await login({
        email: loginFields.email.trim(),
        password: loginFields.password,
      })
      setAuth(userId, accessToken)

      try {
        const profile = await getProfile()
        useProfileStore.getState().setProfile(profile)
      } catch {
        // Silent fail — login tetap lanjut, profile store kosong
      }

      navigate(ROUTES.HOME)
    } catch (err) {
      const message =
        err.message === 'SERVER_SHAPE_MISMATCH'
          ? 'Unexpected response from server. Please try again.'
          : err?.response?.data?.message || 'Login gagal. Periksa kembali data Anda.'
      setLoginServerError(message)
    } finally {
      setLoginLoading(false)
    }
  }

  // ─── Register ─────────────────────────────────────────────────────
  const [registerFields, setRegisterFields] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [registerErrors, setRegisterErrors] = useState({})
  const [registerLoading, setRegisterLoading] = useState(false)
  const [registerServerError, setRegisterServerError] = useState('')

  function onRegisterChange(e) {
    const { name, value } = e.target
    setRegisterFields((prev) => ({ ...prev, [name]: value }))
    setRegisterErrors((prev) => ({ ...prev, [name]: '' }))
    setRegisterServerError('')
  }

  async function handleRegister(e) {
    e.preventDefault()

    // Client-side validation
    const emailCheck = validateEmail(registerFields.email)
    const passwordCheck = validatePassword(registerFields.password)
    const matchCheck = validatePasswordMatch(
      registerFields.password,
      registerFields.confirmPassword,
    )

    const errors = {}
    if (!emailCheck.valid) errors.email = emailCheck.message
    if (!passwordCheck.valid) errors.password = passwordCheck.message
    if (!matchCheck.valid) errors.confirmPassword = matchCheck.message

    if (Object.keys(errors).length > 0) {
      setRegisterErrors(errors)
      return
    }

    setRegisterLoading(true)
    setRegisterServerError('')

    try {
      const { accessToken, userId } = await register({
        email: registerFields.email.trim(),
        password: registerFields.password,
        confirmPassword: registerFields.confirmPassword,
      })
      setAuth(userId, accessToken)

      try {
        const profile = await getProfile()
        useProfileStore.getState().setProfile(profile)
      } catch {
        // Silent fail — register tetap lanjut, profile store kosong
      }

      navigate(ROUTES.HOME)
    } catch (err) {
      const message =
        err.message === 'SERVER_SHAPE_MISMATCH'
          ? 'Unexpected response from server. Please try again.'
          : err?.response?.data?.message || 'Registrasi gagal. Coba lagi.'
      setRegisterServerError(message)
    } finally {
      setRegisterLoading(false)
    }
  }

  // ─── Logout ───────────────────────────────────────────────────────
  async function handleLogout() {
    try {
      await logout()
    } catch {
      // Even if the API call fails, clear client state
    } finally {
      clearAuth()
      useProfileStore.getState().clearProfile()
      navigate(ROUTES.LOGIN)
    }
  }

  return {
    // Login
    loginFields,
    loginErrors,
    loginLoading,
    loginServerError,
    onLoginChange,
    handleLogin,

    // Register
    registerFields,
    registerErrors,
    registerLoading,
    registerServerError,
    onRegisterChange,
    handleRegister,

    // Shared
    handleLogout,
    isAuthenticated,
    userId,
  }
}
