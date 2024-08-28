import { IResponse } from '../../../types/interfaces/IResponse';
import ProfileContentLoader from '../ProfileContentLoader';
import ProfileDetailsForm from './ProfileDetailsForm';
import { UpdateProfileDetailsRequest } from '../../../types/user.types';
import { userAPI } from '../../../services/UserService';

/**
 * It handles user profile details rendering and updating.
 * It fetches user details and displays the user profile details.
 *
 * @component
 */
const ProfileDetails: React.FC = () => {
    const {
        data: userDetails,
        error,
        isSuccess: isFetchSuccess,
        isLoading: isFetchLoading
    } = userAPI.useFetchUserQuery();

    const [updateUserDetails, { isLoading: isUpdateLoading }] =
        userAPI.useUpdateUserDetailsMutation();

    const onUpdateProfileDetails = async (data: UpdateProfileDetailsRequest) => {
        await updateUserDetails(data);
    };

    return (
        <>
            {isFetchLoading && <ProfileContentLoader />}
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
            {error && (
                <div className="alert alert-dismissible alert-danger">
                    {'data' in error
                        ? (error.data as IResponse<void>).message
                        : 'An error occurred while fetching your profile details. Please try again later.'}
                </div>
            )}
        </>
    );
};

export default ProfileDetails;
