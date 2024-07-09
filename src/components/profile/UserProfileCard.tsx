import { IUser } from '../../models/IUser';

type Props = {
  user: IUser | undefined;
  onSelectPicture: () => void;
  isPictureLoading: boolean;
};

const UserProfileCard: React.FC<Props> = ({
  user,
  onSelectPicture,
  isPictureLoading,
}) => {
  console.log('user', user);
  return (
    <div className="card text-center mb-3">
      <div className="card-body">
        <img
          src={user?.imageUrl}
          className="img-fluid mx-auto user-photo"
          alt={user?.firstName}
        />
        <a
          onClick={onSelectPicture}
          className="btn btn-light border btn-sm card-text mb-2 opacity-80"
          style={{ fontSize: '12px' }}
        >
          {!isPictureLoading && (
            <i className="bi bi-camera-fill" style={{ marginRight: '5px' }}></i>
          )}
          {isPictureLoading && (
            <span
              className="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></span>
          )}
          <span role="status">
            {isPictureLoading ? 'Changing...' : 'Change Photo'}
          </span>
        </a>
        <p className="h6">
          {user?.firstName} {user?.lastName}
        </p>
        <p className="card-text">
          <i className="bi bi-shield-exclamation">
            <span className="badge bg-primary-subtle text-primary-emphasis pill fst-normal">
              {user?.role}
            </span>
          </i>
        </p>
      </div>
    </div>
  );
};

export default UserProfileCard;
