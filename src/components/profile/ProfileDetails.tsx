import { IUpdateProfileDetailsRequest } from '../../models/IUser';
import ProfileDetailsForm from './ProfileDetailsForm';
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

  const onUpdateProfileDetails = async (data: IUpdateProfileDetailsRequest) => {
    await updateUserDetails(data);
  };

  return (
    <>
      {isFetchLoading && <span>Loading...</span>}
      {isFetchSuccess && (
        <div>
          <h4 className="mb-3">Profile</h4>
          <hr />
          <ProfileDetailsForm
            user={userDetails?.data.user}
            onUpdateProfileDetails={onUpdateProfileDetails}
            isUpdateLoading={isUpdateLoading}
          />
        </div>
      )}
    </>
  );
};

export default ProfileDetails;
