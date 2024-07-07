import { Navigate, useLocation } from 'react-router-dom';

import ActionLinks from '../components/auth/ActionLinks';
import CacheKey from '../enums/cache.key';
import { IResponse } from '../models/IResponse';
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
    <div className="container">
      <div className="row justify-content-center">
        <div
          className="col-lg-6 col-md-6 col-sm-12"
          style={{ marginTop: '150px' }}
        >
          <div className="card">
            <div className="card-body">
              <h4 className="mb-3">Login</h4>
              {error && (
                <div className="alert alert-dismissible alert-danger">
                  {'data' in error
                    ? (error.data as IResponse<void>).message
                    : 'An error occurred'}
                </div>
              )}
              <hr />
              <LoginForm
                loginUser={loginUser}
                isLoading={isLoading}
              />
              <ActionLinks
                firstLinkText={'Create an account'}
                firstLinkPath={'/register'}
                secondLinkText={'Forgot your password?'}
                secondLinkPath={'/reset-password'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
