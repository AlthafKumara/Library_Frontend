import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

/**
 * store/authStore.js — Global authentication state
 *
 * This is the SINGLE SOURCE OF TRUTH for who is currently logged in.
 * - Populated by: authService.login(), authService.register(), authService.refreshToken()
 * - Cleared by: authService.logout()
 * - Read by: useAuth() hook, router guards, Navbar, ProtectedRoute
 *
 * We persist `userId` and `isAuthenticated` to localStorage so
 * it survives page reloads. We EXPLICITLY DO NOT persist the `accessToken`
 * to protect against XSS.
 */
export const useAuthStore = create(
  persist(
    (set) => ({
      userId: null,
      accessToken: null,
      isAuthenticated: false,

      /** Call after successful login / register / token refresh */
      setAuth: (userId, accessToken) =>
        set({
          userId,
          accessToken,
          isAuthenticated: true,
        }),

      /** Call after logout or when refresh token fails */
      clearAuth: () =>
        set({
          userId: null,
          accessToken: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
      // Only persist non-sensitive user data, NOT the access token
      partialize: (state) => ({
        userId: state.userId,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
