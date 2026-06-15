import { useProfileStore } from '../store/profileStore'

/**
 * DashboardPage — Main landing page after login.
 *
 * Reads the logged-in user profile from Zustand profileStore.
 * `profile.name` is available after profile completion;
 * falls back to the email prefix until then.
 */
export default function DashboardPage() {
  const profile = useProfileStore()

  // Derive a friendly display name:
  // 1. Use profile.name if profile is complete
  // 2. Otherwise use the part before "@" in the email
  // 3. Fall back to "Guest" if somehow neither exists
  const displayName = profile?.name
    || profile?.email?.split('@')[0]
    || 'Guest'

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-neutral-200 gap-4 px-6">
      <p className="text-sm font-medium uppercase tracking-widest text-neutral-400">
        Welcome back
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-neutral-900 text-center">
        Hello, {displayName}!
      </h1>
      <p className="text-neutral-500 text-lg text-center max-w-md">
        Your library dashboard is ready. Start exploring books, track your borrows, and connect with the community.
      </p>
    </div>
  )
}
