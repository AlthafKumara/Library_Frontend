import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSplash from '@/hooks/useSplash.js';
import Logo from '@/assets/images/Logo.png';
import { useProfileStore } from '@/store/profileStore.js';
import { ROUTES } from '../utils/constants';

export default function SplashPage() {
  const navigate = useNavigate();
  const isSplashLoading = useSplash(1000);
  
  const id = useProfileStore((state) => state.id);
  const name = useProfileStore((state) => state.name);
  const isAdmin = useProfileStore((state) => state.isAdmin);

  useEffect(() => {
    // When the splash timer finishes, navigate to the dashboard
    if (!isSplashLoading) {
      if (id) {
        if (isAdmin) {
          navigate(ROUTES.ADMIN_DASHBOARD, { replace: true });
        } else {
          navigate(ROUTES.HOME, { replace: true });
        }
      } else if(name === null){
        navigate(ROUTES.COMPLETE_PROFILE , {replace : true})
      } else {
        navigate(ROUTES.LOGIN, { replace: true });
      }
    }
  }, [isSplashLoading, navigate, id, isAdmin, name]);

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
