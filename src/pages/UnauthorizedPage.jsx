/**
 * pages/UnauthorizedPage.jsx — 401 Fallback
 * Shown when the user doesn't have access to a route.
 */
import { Link } from 'react-router-dom'
import { ROUTES } from '@/utils/constants.js'

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-2 text-center px-4">
      <h1 className="text-6xl font-bold text-primary-500">401</h1>
      <p className="text-2xl text-gray-500">Akses role tidak diizinkan</p>
      <Link
        to={ROUTES.SPLASH}
        className="mt-4 px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
      >
        Kembali 
      </Link>
    </div>
  )
}
