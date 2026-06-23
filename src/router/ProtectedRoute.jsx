// ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useProfileStore } from '../store/profileStore';
import { useAuthStore } from '../store/authStore';
import { ROUTES } from '../utils/constants';


const ProtectedRoute = ({ requireAdmin = false }) => {
  const profile = useProfileStore();
  const auth = useAuthStore();
  const location = useLocation();

  // Skenario 1: Pengguna belum login sama sekali
  if (!auth.isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }
  // Skenario 2 : Pengguna belum memiliki data profile sama sekali (Wajib Complete Profile terlebih dahulu)
  if (auth.isAuthenticated && profile.name === null && location.pathname !== ROUTES.COMPLETE_PROFILE){
    return <Navigate to={ROUTES.COMPLETE_PROFILE} state={{ from: location }} replace />;
  }
  // Skenario 3: Halaman membutuhkan akses Admin, tetapi user bukan Admin
  if (requireAdmin && profile.role !== 'admin') {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }
  if (!requireAdmin && profile.role === 'admin') {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }


  // Skenario 4: Lolos pengecekan, render halaman yang dituju
  return <Outlet />;
};

export default ProtectedRoute;