import { Navigate, useLocation } from 'react-router-dom';

import LoginForm from '../components/LoginForm';
import QrCodeForm from '../components/QrCodeForm';
import { userAPI } from '../services/UserService';

const LoginPage: React.FC = () => {
  const location = useLocation();
  const isLoggedIn =
    (JSON.parse(localStorage.getItem('')!) as boolean) || false;
  const [loginUser, { data, error, isLoading, isSuccess }] =
    userAPI.useLoginUserMutation();

  if (isLoggedIn) {
    return location?.state?.from?.pathname ? (
      <Navigate to={location?.state?.from?.pathname} replace />
    ) : (
      <Navigate to={'/'} replace />
    );
  }

  if (isSuccess && !data?.data.user.mfa) {
    localStorage.setItem('logged-in', 'true');
    return location?.state?.from?.pathname ? (
      <Navigate to={location?.state?.from?.pathname} replace />
    ) : (
      <Navigate to={'/'} replace />
    );
  }

  if (isSuccess && data?.data.user.mfa) {
    return <QrCodeForm userId={data.data.user.userId} />;
  }

  return (
    <LoginForm loginUser={loginUser} error={error} isLoading={isLoading} />
  );
};

export default LoginPage;
