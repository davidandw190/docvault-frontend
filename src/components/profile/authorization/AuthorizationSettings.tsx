import { IResponse } from '../../../models/IResponse';
import ProfileContentLoader from '../ProfileContentLoader';
import { Role } from '../../../models/IUser';
import { userAPI } from '../../../services/UserService';

const AuthorizationSettings: React.FC = () => {
  const {
    data: userDetails,
    isLoading: isFetchLoading,
    isSuccess: isFetchSuccess,
    error: fetchError,
  } = userAPI.useFetchUserQuery();

  const [updateAccountRole, { isLoading: isUpdateRoleLoading }] = userAPI.useUpdateAccountRoleMutation();

  const onUpdateRole = async (option: Role) => {
    await updateAccountRole(option);
  }

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
            {/* TODO: add Role Selection Component */}
            {/* TODO: add Permission Section Componetnt */}
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
