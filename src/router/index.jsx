import { createBrowserRouter } from 'react-router-dom'
import NotFoundPage from '@/pages/NotFoundPage.jsx'

/**
 * router/index.jsx — Central route registry
 *
 * HOW TO ADD A NEW ROUTE:
 * 1. Import the page component
 * 2. Add a new { path, element } object to the routes array
 * 3. Wrap with <ProtectedRoute> for auth-required pages
 *
 * Route groups:
 *  /              → public (books catalog, book detail)
 *  /auth/*        → unauthenticated only (login, register)
 *  /profile/*     → requires login
 *  /borrows/*     → requires login
 *  /community/*   → requires login
 *  /saved-lists/* → requires login
 *  /admin/*       → requires login + admin role
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <div className="p-8 text-center bg-neutral-100 text-primary-600">🚀 Library App — Router Ready</div>,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
