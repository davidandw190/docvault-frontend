import { Outlet } from 'react-router-dom';
import React from 'react';
import UserProfileCard from '../components/profile/UserProfileCard';
import { userAPI } from '../services/UserService';

const Profile: React.FC = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const {
    data: userDetails,
    isLoading: isUserLoading,
    // error: isUserError,
    isSuccess: isUserSuccess,
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
          // TODO: Add Loading skeleton component
          <span>Loading...</span>
        ) : (
          isUserSuccess &&
          userDetails && (
            <div className="col-lg-3 col-md-5 col-sm-12">
              <UserProfileCard
                user={userDetails.data.user}
                onSelectPicture={onSelectPicture}
                isPictureLoading={isPictureLoading}
              />
              {/* TODO: Add User Navigation component */}
            </div>
          )
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
          onChange={(event) => {
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
