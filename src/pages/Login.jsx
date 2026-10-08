import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import { useLibrary } from '../context/LibraryContext.jsx';

export default function Login() {
  useDocumentTitle('Login');
  const { currentUser, login } = useLibrary();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = ({ membershipId, password }) => {
    const user = login(membershipId, password);
    if (!user) {
      setError('Invalid membership ID or password.');
      return;
    }
    navigate(location.state?.from?.pathname ?? '/', { replace: true });
  };

  return (
    <div className="login-page">
      <LoginForm onSubmit={handleLogin} error={error} />
    </div>
  );
}
