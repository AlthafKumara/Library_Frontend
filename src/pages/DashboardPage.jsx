import { useState } from 'react';
import { useProfileStore } from '../store/profileStore';
import MobileHeader from '../components/layout/MobileHeader';
import UserSidebar from '../components/layout/UserSidebar';
import Footer from '../components/layout/Footer';

/**
 * DashboardPage — Main landing page after login.
 *
 * Reads the logged-in user profile from Zustand profileStore.
 * `profile.name` is available after profile completion;
 * falls back to the email prefix until then.
 */
export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-dvh flex flex-col bg-neutral-50">
      <UserSidebar isMobileOpen={sidebarOpen} setIsMobileOpen={setSidebarOpen} />
      <MobileHeader onClick={() => setSidebarOpen(true)} />
      <MainContent />
      <Footer />
    </div>
  );
}

function MainContent() {
  const profile = useProfileStore();

  const displayName = profile?.name
    || profile?.email?.split('@')[0]
    || 'Guest';

  const role = profile?.role || "Role undefined";

  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-4 px-6 py-12">
      <p className="text-sm font-medium uppercase tracking-widest text-neutral-400">
        Welcome back
      </p>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 text-center leading-none">
        Hello, {role} {displayName}!
      </h1>
      <p className="text-neutral-500 text-lg md:text-xl text-center max-w-lg mt-2">
        Your library dashboard is ready. Start exploring books, track your borrows, and connect with the community.
      </p>
    </div>
  );
}
