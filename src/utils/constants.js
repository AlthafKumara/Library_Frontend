/**
 * utils/constants.js — App-wide constants
 *
 * RULE: Never hardcode these strings inline in components or hooks.
 * Always import from here to prevent typos and make changes in one place.
 */

// Borrow request lifecycle statuses (matches backend enum exactly)
export const BORROW_STATUSES = {
  PENDING: 'pending',
  APPROVED: 'approved',
  BORROWED: 'borrowed',
  RETURNED: 'returned',
  OVERDUE: 'overdue',
  LOST: 'lost',
}

// User roles (matches backend RBAC)
export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
}

// Pagination defaults (matches API docs: default 10, max 50)
export const PAGINATION = {
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 50,
}

// API base URL (also set in .env as VITE_API_BASE_URL)
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1'

// Route paths — use these instead of hardcoding strings in <Link to="...">
export const ROUTES = {
  SPLASH : "/",
  HOME: '/dashboard',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  COMPLETE_PROFILE: '/auth/complete-profile',
  BOOKS: '/books',
  BOOK_DETAIL: (id) => `/books/${id}`,
  MY_BORROWS: '/borrows/me',
  BORROW_DETAIL: (id) => `/borrows/${id}`,
  COMMUNITY: '/community',
  MESSAGE_DETAIL: (id) => `/community/${id}`,
  SAVED_LISTS: '/saved-lists',
  PROFILE: '/profile',
  ADMIN_DASHBOARD : "/admin/dashboard",
  ADMIN_BOOKS: '/admin/books',
  ADMIN_CATEGORIES: '/admin/categories',
  ADMIN_BORROWS: '/admin/borrows',
}
