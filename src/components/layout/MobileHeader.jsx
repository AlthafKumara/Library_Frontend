import { List } from '@phosphor-icons/react';
import Logo from '@/assets/images/Logo.png';
import { useProfileStore } from '../../store/profileStore';


export default function MobileHeader({ onClick }) {
    const profile = useProfileStore();

    const role = profile?.role

    return (
        <div className="md:hidden bg-neutral-100 p-4 flex justify-between items-center border-b border-neutral-300 z-10 sticky top-0 shadow-sm">
            <div className="flex items-center gap-1 text-primary-500">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                    <img
                        className='w-3/5'
                        src={Logo}
                        alt="Library Logo"
                    />
                </div>
                <span className="font-medium text-md tracking-tight text-neutral-900">{role === "admin" ? "Baca Admin" : "Baca"}</span>
            </div>
            <button
                onClick={onClick}
                className="p-2 -mr-2 text-neutral-600 hover:bg-neutral-250 rounded-lg transition-colors active:scale-[0.98]"
            >
                <List size={24} />
            </button>
        </div>)
}