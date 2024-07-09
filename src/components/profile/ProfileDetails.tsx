import { IUpdateProfileDetailsRequest } from '../../models/IUser';
import { userAPI } from '../../services/UserService';

const ProfileDetails: React.FC = () => {
  const {
    data: userDetails,
    error,
    isSuccess: isFetchSuccess,
    isLoading: isFetchLoading,
    refetch,
  } = userAPI.useFetchUserQuery();

  const [updateUserDetails, { isLoading: isUpdateLoading }] =
    userAPI.useUpdateUserDetailsMutation();

    const onUpdateProfile = async (data: IUpdateProfileDetailsRequest) => {
      await updateUserDetails(data);
    }

  return (
    <>
      {isFetchLoading && <span>Loading...</span>}
      {isFetchSuccess && (
        <div>
          <h4 className="mb-3">Profile</h4>
          <hr />
          {/* Add Profile Details Form */}
        </div>
      )}
    </>
  );
};

export default ProfileDetails;
