import { IResponse } from '../../../models/IResponse';
import LastLoginStatus from './LastLoginStatus';
import MfaStatus from './MfaStatus';
import ProfileContentLoader from '../ProfileContentLoader';
import { userAPI } from '../../../services/UserService';

const AuthenticationSettings: React.FC = () => {
  const {
    data: userDetails,
    isLoading: isFetchLoading,
    isSuccess: isFetchSuccess,
    error: fetchError,
  } = userAPI.useFetchUserQuery();

  const [
    enableMfa,
    { isLoading: isEnableMfaLoading, isSuccess: isEnableMfaSuccess },
  ] = userAPI.useEnableMfaMutation();
  const [disableMfa, { isLoading: isDisableMfaLoading }] =
    userAPI.useDisableMfaMutation();

  const toggleMfa = async () => {
    userDetails?.data.user.mfa ? await disableMfa() : await enableMfa();
  };

  if (isFetchLoading) {
    return <ProfileContentLoader />;
  }

  return (
    <>
      {isFetchSuccess && (
        <>
          <h4 className="mb-3">
            Authentication(MFA)
            <span
              className={`badge pill text-light text-bg-${
                userDetails?.data.user.mfa ? 'success' : 'warning'
              } fs-6`}
            >
              {userDetails?.data.user.mfa ? 'Enabled' : 'Disabled'}
            </span>
          </h4>
          <div className="row g-3">
            <div className="col-12 mb-2">
              <label className="form-label d-block mb-1">
                Multi Factor Authentication
              </label>
              <p className="small text-muted">
                Two-factor authentication adds an additional layer of security
                to your account by requiring more than just a password to log
                in.
              </p>
              <button
                onClick={toggleMfa}
                disabled={isDisableMfaLoading || isEnableMfaLoading}
                className={`btn border btn-${
                  userDetails?.data.user.mfa ? 'light' : 'primary'
                } mt-2`}
                type="button"
              >
                {userDetails?.data.user.mfa ? 'Disable' : 'Enable'} Two-Factor
                Authentication
                {(isDisableMfaLoading || isEnableMfaLoading) && (
                  <div
                    className={`spinner-border text-${
                      userDetails?.data.user.mfa ? 'primary' : 'light'
                    }`}
                    role="status"
                    style={{
                      height: '20px',
                      width: '20px',
                      marginLeft: '10px',
                    }}
                  ></div>
                )}
              </button>
              <MfaStatus
                isMfaEnabled={userDetails?.data.user.mfa}
                qrCodeImageUri={userDetails?.data.user.qrCodeImageUri}
                isQrCodeLoading={isEnableMfaLoading}
                isQrCodeSuccess={isEnableMfaSuccess}
              />
            </div>
            <hr className="my-2" />
            <LastLoginStatus lastLogin={userDetails?.data.user.lastLogin} />
          </div>
        </>
      )}
      {fetchError && (
        <div className="alert alert-dismissible alert-danger">
          {'data' in fetchError
            ? (fetchError.data as IResponse<void>).message
            : 'An error occurred while fetching your profile details. Please try again later.'}
        </div>
      )}
    </>
  );
};

export default AuthenticationSettings;
