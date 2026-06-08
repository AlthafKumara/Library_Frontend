import { create } from 'zustand'

/**
 * store/authStore.js — Global authentication state
 *
 * This is the SINGLE SOURCE OF TRUTH for who is currently logged in.
 * - Populated by: authService.login(), authService.register(), authService.refreshToken()
 * - Cleared by: authService.logout()
 * - Read by: useAuth() hook, router guards, Navbar, ProtectedRoute
 *
 * NOTE: accessToken lives in memory (this store) — NOT in localStorage.
 * The refresh token is stored in an HTTP-only cookie by the backend.
 * This protects against XSS attacks.
 */
export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isAdmin: false,

  /** Call after successful login / register / token refresh */
  setAuth: (user, accessToken) =>
    set({
      user,
      accessToken,
      isAuthenticated: true,
      isAdmin: user?.role === 'admin',
    }),

  /** Call after logout or when refresh token fails */
  clearAuth: () =>
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isAdmin: false,
    }),
}))
