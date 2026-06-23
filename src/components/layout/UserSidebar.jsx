import { useProfileStore } from '../../store/profileStore';
import { useAuth } from '../../hooks/useAuth';
import {
  House,
  Book,
  ArrowsLeftRight,
  SignOut,
  X
} from '@phosphor-icons/react';
import Logo from '@/assets/images/Logo.png';

export default function UserSidebar({ isMobileOpen, setIsMobileOpen }) {
  const profile = useProfileStore();
  const { handleLogout } = useAuth();

  const displayName = profile?.name
    || profile?.email?.split('@')[0]
    || 'Guest';

  const role = profile?.role || "User";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <>
      {/* 
        ========================================================================
        DESKTOP / TABLET HEADER
        ========================================================================
      */}
      <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-neutral-200 sticky top-0 z-40">

        {/* Left: Logo & Navigation */}
        <div className="flex items-center gap-12">
          {/* Logo */}
          <div className="flex items-center gap-1">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src={Logo} alt="Library Logo" className="w-3/4 object-contain" />
            </div>
            <span className="font-medium text-2xl tracking-tighter text-neutral-900 leading-none">Baca</span>
          </div>

          {/* Desktop Nav */}
          {displayName !== "Guest" && (<nav className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-2 text-primary-600 font-medium no-underline">
              <House size={15} weight="duotone" />
              <span>Home</span>
            </a>
            <a href="#" className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors font-medium no-underline">
              <Book size={15} />
              <span>Book</span>
            </a>
            <a href="#" className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors font-medium no-underline">
              <ArrowsLeftRight size={15} />
              <span>Transaction</span>
            </a>
          </nav>)}

        </div>

        {/* Right: Profile Dropdown */}
        <div className="relative group">
          {/* Avatar + Name trigger */}
          <div className="flex items-center gap-3 cursor-pointer select-none">
            <div className="flex flex-col items-end">
              <span className="font-medium tracking-tight text-neutral-900 leading-none">{displayName}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-lg shadow-sm border border-primary-600/20 ring-2 ring-transparent group-hover:ring-primary-300 transition-all duration-200">
              {initial}
            </div>
          </div>

          {/* Dropdown Panel */}
          <div className="
            absolute right-0 top-[calc(100%+12px)] w-52 z-50
            bg-white border border-neutral-200 rounded-2xl
            shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)]
            opacity-0 invisible translate-y-1
            group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
            transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)]
            overflow-hidden
          ">
            {/* User info header */}
            <div className="px-4 py-3 border-b border-neutral-100 bg-neutral-50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-base shrink-0">
                  {initial}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-medium text-sm text-neutral-900 truncate leading-none">{displayName}</span>
                  <span className="text-xs text-neutral-400 uppercase tracking-widest mt-0.5">{role}</span>
                </div>
              </div>
            </div>
            {/* Logout action */}
            <div className="p-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-danger-600 hover:bg-danger-50 transition-colors font-medium text-sm active:scale-[0.98] group/btn"
              >
                <SignOut size={18} className="shrink-0 group-hover/btn:-translate-x-0.5 transition-transform" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 
        ========================================================================
        MOBILE SIDEBAR / DRAWER
        ========================================================================
      */}
      {/* Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside
        className={`
          fixed inset-y-0 right-0 z-50 w-72 bg-white border-l border-neutral-200 
          transform transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] flex flex-col md:hidden
          ${isMobileOpen ? 'translate-x-0 shadow-[-20px_0_40px_-15px_rgba(0,0,0,0.1)]' : 'translate-x-full'} 
        `}
      >
        <div className="flex items-center justify-end p-4 border-b border-neutral-200">
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-2 text-neutral-500 hover:bg-neutral-100 rounded-lg active:scale-95 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Profile on Top for Mobile */}
        <div className="flex flex-col items-center p-6 border-b border-neutral-200 bg-neutral-100/50">
          <div className="w-16 h-16 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-2xl mb-4 shadow-sm border border-primary-600/20">
            {initial}
          </div>
          <span className="font-medium tracking-tight text-neutral-900 text-lg leading-none mb-1 text-center">
            {displayName}
          </span>
          <span className="text-xs font-medium text-neutral-500 uppercase tracking-widest text-center mt-1">
            {role}
          </span>
        </div>

        {/* Mobile Navigation */}
        {displayName !== "Guest" && (<div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <nav className="px-4 space-y-2">
            <a href="#" className="flex items-center gap-4 p-4 rounded-2xl text-primary-600 bg-primary-50 transition-colors font-medium active:scale-[0.98] no-underline">
              <House size={24} weight="duotone" />
              <span>Home</span>
            </a>
            <a href="#" className="flex items-center gap-4 p-4 rounded-2xl text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors font-medium active:scale-[0.98] no-underline">
              <Book size={24} />
              <span>Book</span>
            </a>
            <a href="#" className="flex items-center gap-4 p-4 rounded-2xl text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors font-medium active:scale-[0.98] no-underline">
              <ArrowsLeftRight size={24} />
              <span>Transaction</span>
            </a>
          </nav>
        </div>)}

        {/* Mobile Logout */}
        <div className="p-6 border-t border-neutral-200 bg-neutral-100/50 ">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 p-3 rounded-xl text-danger-600 hover:bg-danger-50 transition-colors font-medium active:scale-[0.98] group"
          >
            <SignOut size={20} className="group-hover:-translate-x-px transition-transform" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
