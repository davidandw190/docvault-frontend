import { IResponse } from '../../../models/IResponse';
import { IUpdateUserPasswordRequest } from '../../../models/IUser';
import ProfileContentLoader from '../ProfileContentLoader';
import UpdatePasswordForm from './UpdatePasswordForm';
import { userAPI } from '../../../services/UserService';

/**
 * It handles user password updating.
 * It fetches user details and displays the password update form.
 *
 * @component
 */
const UpdatePassword: React.FC = () => {
  const {
    data: userDetails,
    error: fetchError,
    isSuccess: isFetchSuccess,
    isLoading: isFetchLoading,
  } = userAPI.useFetchUserQuery();
  const [
    updateUserPassword,
    {
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
    },
  ] = userAPI.useUpdateUserPasswordMutation();

  const onUpdatePassword = async (data: IUpdateUserPasswordRequest) => {
    await updateUserPassword(data);
  };

  return (
    <div>
      {isFetchLoading && <ProfileContentLoader />}
      {isFetchSuccess && (
        <>
          <h4 className="mb-3">Password</h4>
          <hr />
          <UpdatePasswordForm
            userId={userDetails.data.user.userId}
            isUpdateLoading={isUpdateLoading}
            isUpdateSuccess={isUpdateSuccess}
            onUpdatePassword={onUpdatePassword}
          />
        </>
      )}
      {fetchError && (
        <div className="alert alert-dismissible alert-danger">
          {'data' in fetchError
            ? (fetchError.data as IResponse<void>).message
            : 'An error occurred while fetching your profile details. Please try again later.'}
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
