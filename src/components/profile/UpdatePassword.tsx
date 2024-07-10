import { IResponse } from '../../models/IResponse';
import ProfileContentLoader from './ProfileContentLoader';
import { userAPI } from '../../services/UserService';

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
      error: isUpdateError,
      isSuccess: isUpdateSuccess,
    },
  ] = userAPI.useUpdateUserPasswordMutation();
  return (
    <div>
      {isFetchLoading && <ProfileContentLoader />}
      {isFetchSuccess && (
        <>
          <h4 className="mb-3">Password</h4>
          <hr />
          {/* TODO: Update password form */}
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
