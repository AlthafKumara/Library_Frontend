import { useState } from 'react';
import { useProfileStore } from '../store/profileStore';
import { Book } from '@phosphor-icons/react';
import AdminSidebar from '../components/layout/AdminSidebar';
import '@/assets/images/Logo.png';
import MobileHeader from '../components/layout/MobileHeader';
import Footer from '../components/layout/Footer';

export default function AdminDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-dvh flex flex-col md:flex-row bg-neutral-200">
      {/* Mobile Header */}
      <MobileHeader onClick={() => setSidebarOpen(true)}/>
      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Sidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative min-h-dvh overflow-y-auto">
        <BaseContentAdmin />
        <Footer />
      </main>
    </div>
  );
}

function BaseContentAdmin() {
  const profile = useProfileStore();

  const displayName = profile?.name
    || profile?.email?.split('@')[0]
    || 'Admin';

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-6 p-6 md:p-8 bg-neutral-200">
      <div className="bg-neutral-100/60 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-white/10 flex flex-col items-center max-w-[65ch] w-full text-center relative overflow-hidden ring-1 ring-black/5">

        <div className="relative z-10 w-20 h-20 bg-neutral-100 text-primary-500 rounded-2xl flex items-center justify-center mb-8 shadow-inner border border-white/10">
          <Book size={40} weight="duotone" />
        </div>

        <p className="relative z-10 text-sm font-medium uppercase tracking-widest text-primary-500 mb-4">
          Welcome to Control Panel
        </p>

        <h1 className="relative z-10 text-4xl md:text-5xl font-medium tracking-tighter leading-none text-neutral-900 mb-6">
          Hello, <span className="text-primary-500">{displayName}!</span>
        </h1>

        <p className="relative z-10 text-neutral-500 text-lg max-w-[65ch] mx-auto leading-[145%]">
          Your library dashboard is ready. Manage your catalog, process transactions, and engage with your community effortlessly.
        </p>
      </div>
    </div>
  );
}
