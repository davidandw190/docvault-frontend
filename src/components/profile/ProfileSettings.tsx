import { IResponse } from '../../models/IResponse';
import ProfileContentLoader from './ProfileContentLoader';
import { userAPI } from '../../services/UserService';

const ProfileSettings: React.FC = () => {
  const {
    data: userDetails,
    error: fetchError,
    isSuccess: isFetchSuccess,
    isLoading: isFetchLoading,
  } = userAPI.useFetchUserQuery();

  const [toggleAccountExpired] = userAPI.useToggleAccountExpiredMutation();
  const [toggleAccountLocked] = userAPI.useToggleAccountLockedMutation();
  const [toggleAccountEnabled] = userAPI.useToggleAccountEnabledMutation();
  const [toggleCredentialsExpired] = userAPI.useToggleAccountCredentialsExpiredMutation();


  if (isFetchLoading) {
    return <ProfileContentLoader />;
  }

  return (
    <>
      <h4 className="mb-3">Settings</h4>
      <hr />
      {isFetchSuccess && (
        <>
          {/* TODO: Add Account Setting component */}
          {/* TODO: Add Credentails Settings componet */}
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

export default ProfileSettings;
