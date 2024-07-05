import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { userAPI } from '../services/UserService';

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
      // TODO: Make a dedicated component for this
      return <span>Invalid Link</span>;
    }

    if (isLoading) {

      // TODO: Make a dedicated component for this
      return <span>Verifying account...</span>;
    }

    if (error) {
      // TODO: Make a dedicated component for this
      return <span>Error</span>;
    }

    if (isSuccess) {
      // TODO: Make a dedicated component for this
      return <span>Account verified successfully</span>;
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
             {/* TODO: Add action links */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountVerification;
