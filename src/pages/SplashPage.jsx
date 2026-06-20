import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSplash from '@/hooks/useSplash.js';
import Logo from '@/assets/images/Logo.png';
import { useProfileStore } from '@/store/profileStore.js';

export default function SplashPage() {
  const navigate = useNavigate();
  const isSplashLoading = useSplash(1000);
  
  const id = useProfileStore((state) => state.id);
  const isAdmin = useProfileStore((state) => state.isAdmin);

  useEffect(() => {
    // When the splash timer finishes, navigate to the dashboard
    if (!isSplashLoading) {
      if (id) {
        if (isAdmin) {
          navigate('/admin/dashboard', { replace: true });
        } else {
          navigate('/dashboard', { replace: true });
        }
      } else {
        navigate('/auth/login', { replace: true });
      }
    }
  }, [isSplashLoading, navigate, id, isAdmin]);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-neutral-100">
      <img
        className="w-1/12 animate-bounce"
        src={Logo}
        alt="Library Logo"
      />
    </div>
  );
}
