/**
 * pages/NotFoundPage.jsx — 404 Fallback
 * Shown for any URL that doesn't match a defined route.
 */
import { Link } from 'react-router-dom'
import { ROUTES } from '@/utils/constants.js'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center px-4">
      <h1 className="text-6xl font-bold text-neutral-100">404</h1>
      <p className="text-xl text-gray-500">Halaman tidak ditemukan</p>
      <Link
        to={ROUTES.HOME}
        className="mt-4 px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
      >
        Kembali ke Beranda
      </Link>
    </div>
  )
}
