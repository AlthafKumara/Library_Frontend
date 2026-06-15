  import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSplash from '@/hooks/useSplash.js';
import Logo from '@/assets/images/Logo.png';

export default function SplashPage() {
  const navigate = useNavigate();
  const isSplashLoading = useSplash(3000);

  useEffect(() => {
    // When the splash timer finishes, navigate to the dashboard
    if (!isSplashLoading) {
      navigate('/auth/login', { replace: true }); }
  }, [isSplashLoading, navigate]);

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
