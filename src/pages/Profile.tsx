import LoadingSkeleton from '../features/profile/LoadingSkeleton';
import { Outlet } from 'react-router-dom';
import ProfileNavigation from '../layouts/ProfileNavigation';
import React from 'react';
import UserProfileCard from '../features/profile/UserProfileCard';
import { userAPI } from '../services/UserService';

const Profile: React.FC = () => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const {
        data: userDetails,
        isLoading: isUserLoading,
        // error: isUserError,
        isSuccess: isUserSuccess
    } = userAPI.useFetchUserQuery();

    const [updateProfilePicture, { isLoading: isPictureLoading }] =
        userAPI.useUpdateProfilePictureMutation();

    const onSelectPicture = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const onUploadPicture = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('userId', userDetails?.data.user.userId ?? '');
        await updateProfilePicture(formData);
    };

    return (
        <div className="container main">
            <div className="row">
                {isUserLoading ? (
                    <LoadingSkeleton />
                ) : (
                    <div className="col-lg-3 col-md-5 col-sm-12">
                        <UserProfileCard
                            user={userDetails?.data.user}
                            onSelectPicture={onSelectPicture}
                            isPictureLoading={isPictureLoading}
                        />
                        <ProfileNavigation />
                    </div>
                )}
                <div className="col-lg-9 col-md-7 col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: 'none' }}>
                <input
                    type="file"
                    ref={inputRef}
                    onChange={event => {
                        const file = event.target.files?.[0];
                        if (file) {
                            onUploadPicture(file);
                        }
                    }}
                    name="file"
                    accept="image/*"
                />
            </div>
        </div>
    );
};

export default Profile;
