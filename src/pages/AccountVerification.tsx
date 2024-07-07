import ActionLinks from '../components/auth/ActionLinks';
import { IResponse } from '../models/IResponse';
import { InvalidLinkMessage } from '../components/auth/InvalidLinkMessage';
import VerificationErrorMessage from '../components/auth/VerificationErrorMessage';
import VerificationSuccessMessage from '../components/auth/VerificationSuccessMessage';
import VerifyingAccount from '../components/auth/VerifyingAccount';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { userAPI } from '../services/UserService';

/**
 * Verifies a user's account using a key from the URL query parameters.
 * It extracts a verification key from the URL query parameters, triggers an API
 * call to verify the account if the key is present.
 *
 * @component
 */
const AccountVerification: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const key = searchParams.get('key');
  const [verifyAccount, { error, isLoading, isSuccess }] =
    userAPI.useVerifyAccountMutation();

  useEffect(() => {
    if (key) {
      verifyAccount(key);
    }
  }, [key, verifyAccount]);

  const renderContent = () => {
    if (!key) {
      return <InvalidLinkMessage />;
    }

    if (isLoading) {
      return <VerifyingAccount />;
    }

    if (error) {
      return (
        <VerificationErrorMessage
          message={
            'data' in error
              ? (error.data as IResponse<void>).message!
              : 'An error occurred. Please try again later.'
          }
        />
      );
    }

    if (isSuccess) {
      return (
        <VerificationSuccessMessage
          message={
            'Your account has been verified successfully. You can proceed to log in now.'
          }
        />
      );
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div
          className="col-lg-6 col-md-6 col-sm-12"
          style={{ marginTop: '100px' }}
        >
          <div className="card">
            <div className="card-body">
              {renderContent()}
              <ActionLinks
                firstLinkText={'Go to Login'}
                firstLinkPath={'/login'}
                secondLinkText={'Forgot Password?'}
                secondLinkPath={'/reset-password'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountVerification;
