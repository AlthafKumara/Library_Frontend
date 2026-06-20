/**
 * router/guards.jsx — Route guard helper functions
 *
 * Usage: import these inside router/index.jsx or ProtectedRoute.jsx
 * to check auth state before allowing access to a route.
 *
 * Both functions read from the Zustand authStore — the single
 * source of truth for who is currently logged in.
 */
import { useAuthStore } from '@/store/authStore.js'
import { useProfileStore } from '@/store/profileStore.js'

/**
 * Check if the current user is authenticated.
 * @returns {boolean}
 */
export function isAuthenticated() {
  return useAuthStore.getState().isAuthenticated
}

/**
 * Check if the current user has the admin role.
 * @returns {boolean}
 */
export function isAdmin() {
  return useProfileStore.getState().isAdmin
}
