import AccountSettings from '../../enums/account.settings';
import AccountSettingsList from './AccountSettingsList';
import { IResponse } from '../../models/IResponse';
import ProfileContentLoader from './ProfileContentLoader';
import { userAPI } from '../../services/UserService';

/**
 * Settings component handles the display and toggling of user account settings.
 *
 * @component
 * @returns {JSX.Element} A JSX element representing the Settings component.
 */
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
  const [toggleCredentialsExpired] =
    userAPI.useToggleAccountCredentialsExpiredMutation();

  const onToggleAccountSettings = async (option: AccountSettings) => {
    switch (option) {
      case AccountSettings.EXPIRED:
        await toggleAccountExpired();
        break;
      case AccountSettings.LOCKED:
        await toggleAccountLocked();
        break;
      case AccountSettings.ENABLED:
        await toggleAccountEnabled();
        break;
      case AccountSettings.CREDENTIALS_EXPIRED:
        await toggleCredentialsExpired();
        break;
    }
  };

  if (isFetchLoading) {
    return <ProfileContentLoader />;
  }

  return (
    <>
      <h4 className="mb-3">Settings</h4>
      <hr />
      {isFetchSuccess && (
        <>
          <AccountSettingsList
            user={userDetails?.data.user}
            onToggleAccountSettings={onToggleAccountSettings}
          />
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
