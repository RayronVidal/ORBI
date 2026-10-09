import { Navigate, Outlet, useLocation } from 'react-router-dom';

function ProtectedRoute() {
  const location = useLocation();
  const token =
    sessionStorage.getItem('token') || localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
