// ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useProfileStore } from '../store/profileStore';
import { useAuthStore } from '../store/authStore';


const ProtectedRoute = ({ requireAdmin = false }) => {
  const profile = useProfileStore();
  const auth = useAuthStore();
  const location = useLocation();

  // Skenario 1: Pengguna belum login sama sekali
  if (!auth.isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  // Skenario 2: Halaman membutuhkan akses Admin, tetapi user bukan Admin
  if (requireAdmin && profile.role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }
  if (!requireAdmin && profile.role === 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }


  // Skenario 3: Lolos pengecekan, render halaman yang dituju
  return <Outlet />;
};

export default ProtectedRoute;