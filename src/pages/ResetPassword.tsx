import ActionLinks from '../components/auth/ActionLinks';
import { IResponse } from '../models/IResponse';
import { InvalidLinkMessage } from '../components/auth/InvalidLinkMessage';
import VerificationErrorMessage from '../components/auth/VerificationErrorMessage';
import VerifyingAccount from '../components/auth/VerifyingAccount';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { userAPI } from '../services/UserService';

const ResetPassword: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const key = searchParams.get('key');

  const [verifyResetPassword, { error, isLoading, isSuccess }] =
    userAPI.useVerifyResetPasswordMutation();

  useEffect(() => {
    if (key) {
      verifyResetPassword(key);
    }
  }, [key, verifyResetPassword]);

  const renderContent = () => {
    if (!key) {
      return <InvalidLinkMessage />;
    }

    if (isLoading) {
      return <VerifyingAccount />;
    }

    if (error) {
      const message =
        'data' in error
          ? (error.data as IResponse<void>).message!
          : 'An error occurred. Please try again later.';
      return <VerificationErrorMessage message={message} />;
    }

    if (isSuccess) {
      // TODO: Set up the reset password form
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div
          className="col-lg-6 col-md-8 col-sm-12"
          style={{ marginTop: '100px' }}
        >
          <div className="card">
            <div className="card-body">
              {renderContent()}
              <ActionLinks
                firstLinkText={'Go back to Login'}
                firstLinkPath={'/login'}
                secondLinkText={''}
                secondLinkPath={''}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
