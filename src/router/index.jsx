import { createBrowserRouter } from 'react-router-dom'
import NotFoundPage from '@/pages/NotFoundPage.jsx'
import SplashPage from '../pages/SplashPage'
import DashboardPage from "../pages/DashboardPage"
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ProtectedRoute from './ProtectedRoute'
import UnauthorizedPage from '../pages/UnauthorizedPage'
import AdminDashboardPage from '../pages/AdminDashboardPage'
import CompleteProfilePage from '../pages/CompleteProfilePage'

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
  // AUTH (Bebas Akses)
  {
    path: '/',
    element: <SplashPage />,
  },
  {
    path: "auth/login",
    element: <LoginPage />

  },
  {
    path: "auth/register",
    element: <RegisterPage />
  },

  // NEED LOGIN INFO
  {
    element: <ProtectedRoute />,
    children : [
      {
        path: 'auth/complete-profile',
        element: <CompleteProfilePage />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      
    ]
  },

  {
    element : <ProtectedRoute requireAdmin={true}/>,
    children: [
      {
        path : "admin/dashboard",
        element : <AdminDashboardPage/>
      }
    ]
  },

  // UNDEFINED & UNAUTORIZED ROUTE
  {
        path: '*',
        element: <NotFoundPage />,
      },
  {
        path: 'unauthorized',
        element: <UnauthorizedPage />,
      },

  

])
