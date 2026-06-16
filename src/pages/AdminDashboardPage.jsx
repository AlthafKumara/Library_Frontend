import { useProfileStore } from '../store/profileStore'
import { useAuth } from '../hooks/useAuth'

/**
 * DashboardPage — Main landing page after login.
 *
 * Reads the logged-in user profile from Zustand profileStore.
 * `profile.name` is available after profile completion;
 * falls back to the email prefix until then.
 */
export default function AdminDashboardPage() {
  const profile = useProfileStore()
  const { handleLogout } = useAuth();

  
  const displayName = profile?.name
    || profile?.email?.split('@')[0]
    || 'admin'

  const role = profile?.role || "Role undefined"

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-neutral-200 gap-4 px-6">
      <p className="text-sm font-medium uppercase tracking-widest text-neutral-400">
        Welcome back
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-neutral-900 text-center">
        Hello, {role} {displayName}!
      </h1>
      <p className="text-neutral-500 text-lg text-center max-w-md">
        Your library dashboard is ready. Start manage books, track your borrows transaction
      </p>
      <button
        onClick={handleLogout}
        className="mt-4 px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
      >
        Logout
      </button>
    </div>
  )
}
