import { IResponse } from '../../../models/IResponse';
import PermissionsSection from './PermissionsSection';
import ProfileContentLoader from '../ProfileContentLoader';
import { Role } from '../../../models/IUser';
import RoleSelection from './RoleSelection';
import { userAPI } from '../../../services/UserService';

/**
 * It handles user authorization settings rendering and updating.
 * It fetches user details and displays the user role and permissions.
 *
 * @component
 */
const AuthorizationSettings: React.FC = () => {
  const {
    data: userDetails,
    isLoading: isFetchLoading,
    isSuccess: isFetchSuccess,
    error: fetchError,
  } = userAPI.useFetchUserQuery();

  const [updateAccountRole, { isLoading: isUpdateRoleLoading }] =
    userAPI.useUpdateAccountRoleMutation();

  const onUpdateRole = async (option: Role) => {
    await updateAccountRole(option);
  };

  if (isFetchLoading) {
    return <ProfileContentLoader />;
  }

  return (
    <>
      <h4 className="mb-3">Authorization Settings</h4>
      <hr />

      {isFetchSuccess && (
        <form className="needs-validation">
          <div className="row g-3">
            <RoleSelection
              userRole={userDetails.data.user.role}
              onUpdateAccountRole={onUpdateRole}
              isUpdateRoleLoading={isUpdateRoleLoading}
            />
            <PermissionsSection
              userAuhorities={userDetails.data.user.authorities}
            />
          </div>
          <hr className="my-4" />
        </form>
      )}
      {fetchError && (
        <div className="alert alert-dismissible alert-danger">
          {fetchError &&
            ('data' in fetchError
              ? (fetchError.data as IResponse<void>).message
              : 'An error occurred while fetching your profile details. Please try again later.')}
        </div>
      )}
    </>
  );
};

export default AuthorizationSettings;
