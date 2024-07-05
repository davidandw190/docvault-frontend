import { Navigate, useLocation } from 'react-router-dom';

import { CacheKey } from '../enums/cache.key';
import LoginForm from '../components/auth/LoginForm';
import QrCodeForm from '../components/auth/QrCodeForm';
import { userAPI } from '../services/UserService';

/**
 * Login component handles user login and multi-factor authentication (MFA).
 * It uses `useLocation` to redirect users after a successful login and manages
 * the login state using local storage cookies and Redux Toolkit Query.
 * 
 * @component
 */
const Login: React.FC = () => {
  const location = useLocation();
  const isLoggedIn =
    (JSON.parse(localStorage.getItem(CacheKey.LOGGED_IN)!) as boolean) || false;
  const [loginUser, { data: response, error, isLoading, isSuccess }] =
    userAPI.useLoginUserMutation();

  if (isLoggedIn) {
    return location?.state?.from?.pathname ? (
      <Navigate to={location?.state?.from?.pathname} replace />
    ) : (
      <Navigate to={'/'} replace />
    );
  }

  if (isSuccess && !response?.data.user.mfa) {
    localStorage.setItem(CacheKey.LOGGED_IN, 'true');
    return location?.state?.from?.pathname ? (
      <Navigate to={location?.state?.from?.pathname} replace />
    ) : (
      <Navigate to={'/'} replace />
    );
  }

  if (isSuccess && response?.data.user.mfa) {
    return <QrCodeForm userId={response.data.user.userId} />;
  }

  return (
    <LoginForm loginUser={loginUser} error={error} isLoading={isLoading} />
  );
};

export default Login;
