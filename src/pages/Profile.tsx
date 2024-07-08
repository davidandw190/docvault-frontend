import { Outlet } from 'react-router-dom';
import React from 'react';
import { userAPI } from '../services/UserService';

const Profile: React.FC = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const {
    data: userDetails,
    isLoading,
    error,
    isSuccess,
  } = userAPI.useFetchUserQuery();

  const selectImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="container main">
      <div className="row">
        {isLoading ? (
          // TODO: Add Loading skeleton component
          <span>Loading...</span>
        ) : (
          isSuccess &&
          userDetails && (
            <div className="col-lg-3 col-md-5 col-sm-12">
              {/* TODO: Add User Profile Card component */}
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
          onChange={(event) => console.log(event.target.files)}
          name="file"
          accept="image/*"
        />
      </div>
    </div>
  );
};

export default Profile;
