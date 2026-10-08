import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useLibrary } from '../context/LibraryContext.jsx';

export default function ProtectedRoute({ roles }) {
  const { currentUser } = useLibrary();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (roles && !roles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
