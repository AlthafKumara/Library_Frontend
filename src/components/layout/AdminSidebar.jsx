import { useState } from 'react';
import { useProfileStore } from '../../store/profileStore';
import { useAuth } from '../../hooks/useAuth';
import {
  Book,
  ArrowsLeftRight,
  Users,
  SignOut,
  CaretDown,
  CaretUp
} from '@phosphor-icons/react';
import Logo from '@/assets/images/Logo.png';

export default function AdminSidebar({ sidebarOpen }) {
  const profile = useProfileStore();
  const { handleLogout } = useAuth();
  const [isBookMenuOpen, setIsBookMenuOpen] = useState(true);

  const displayName = profile?.name
    || profile?.email?.split('@')[0]
    || 'Admin';

  const role = profile?.role || "Administrator";

  // Profile Initial Avatar
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-neutral-200 
        transform transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] flex flex-col
        ${sidebarOpen ? 'translate-x-0 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]' : '-translate-x-full'} 
        md:translate-x-0 md:static md:w-72 lg:w-80 md:shadow-none
      `}
    >
      {/* Desktop Logo (hidden on mobile header) */}
      <div className="hidden md:flex items-center gap-4 p-6 border-b border-neutral-200">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm">
          <img
            className='w-3/4'
            src={Logo}
            alt="Library Logo"
          />
        </div>
        <span className="font-medium text-2xl tracking-tighter text-neutral-900 leading-none">Admin Baca</span>
      </div>

      {/* Admin Profile Section */}
      <div className="flex flex-col p-6 border-b border-neutral-200 bg-neutral-100/30 mt-14 md:mt-0 relative">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-sm border border-primary-600/20">
            {initial}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="font-medium tracking-tight text-neutral-900 truncate text-lg leading-none" title={displayName}>
              {displayName}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-success-500 animate-[pulse_3s_ease-in-out_infinite]"></span>
              <span className="text-xs font-medium text-neutral-500 uppercase tracking-widest truncate">
                {role}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto py-6 custom-scrollbar">
        <nav className="px-4 space-y-2">
          <p className="px-4 text-xs font-medium uppercase tracking-widest text-neutral-400 mb-4 mt-2">Main Menu</p>

          {/* Book Category */}
          <div>
            <button
              onClick={() => setIsBookMenuOpen(!isBookMenuOpen)}
              className="w-full flex items-center justify-between p-4 rounded-2xl text-neutral-600 hover:bg-neutral-200/50 hover:text-neutral-900 transition-colors font-medium active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg transition-colors ${isBookMenuOpen ? 'bg-primary-200/50 text-primary-600' : 'bg-neutral-250 text-neutral-500'}`}>
                  <Book size={20} weight={isBookMenuOpen ? "duotone" : "regular"} />
                </div>
                <span>Book</span>
              </div>
              <div className="text-neutral-400 transition-transform duration-300">
                {isBookMenuOpen ? <CaretUp size={16} weight="bold" /> : <CaretDown size={16} weight="bold" />}
              </div>
            </button>

            {/* Book Submenu */}
            <BookSubMenu label={"Add Book"} isOpen={isBookMenuOpen}/>
            <BookSubMenu label={"Manage Book"} isOpen={isBookMenuOpen}/>

          </div>

          {/* Borrow Transaction */}
          <a href="#" className="flex items-center gap-4 p-4 rounded-2xl text-neutral-600 hover:bg-neutral-200/50 hover:text-neutral-900 transition-colors font-medium active:scale-[0.98] group">
            <div className="p-2 rounded-lg bg-neutral-250 text-neutral-500 group-hover:bg-primary-200/50 group-hover:text-primary-600 transition-colors">
              <ArrowsLeftRight size={20} weight="regular" />
            </div>
            <span>Borrow Transaction</span>
          </a>

          {/* Community */}
          <a href="#" className="flex items-center gap-4 p-4 rounded-2xl text-neutral-600 hover:bg-neutral-200/50 hover:text-neutral-900 transition-colors font-medium active:scale-[0.98] group">
            <div className="p-2 rounded-lg bg-neutral-250 text-neutral-500 group-hover:bg-primary-200/50 group-hover:text-primary-600 transition-colors">
              <Users size={20} weight="regular" />
            </div>
            <span>Community</span>
          </a>
        </nav>
      </div>

      {/* Logout Footer */}
      <div className="p-6 border-t border-neutral-200 bg-neutral-100/30">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-4 p-3 rounded-xl text-danger-600 hover:bg-danger-500/10 hover:text-danger-600 transition-colors font-medium active:scale-[0.98] group"
        >
          <SignOut size={20} weight="regular" className="group-hover:-translate-x-px transition-transform" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

function BookSubMenu({label, isOpen}) {
  return (<div className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isOpen ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
    <div className="pl-14 pr-4 py-1 space-y-1 relative before:absolute before:left-8 before:top-0 before:bottom-4 before:w-0.5 before:bg-neutral-200 before:rounded-full">
      <a href="#" className="flex items-center gap-3 p-3 rounded-xl text-sm text-neutral-500 hover:text-primary-600 hover:bg-primary-200/30 transition-colors font-medium active:scale-[0.98] group">
        <div className="relative">
          <div className="absolute -left-7 top-1/2 w-4 h-0.5 bg-neutral-200 rounded-full group-hover:bg-primary-400 transition-colors"></div>
        </div>
        <span>{label}</span>
      </a>
    </div>
  </div>)
}

