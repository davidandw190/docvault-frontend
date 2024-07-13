import { Link, Outlet } from 'react-router-dom';

import AccountRoles from '../enums/account.role';
import { userAPI } from '../services/UserService';

/**
 * It handles restricted route rendering and permissions.
 * It fetches user details and displays the restricted route content.
 *
 * @component
 */
const RestrictedRoute = () => {
  const {
    data: userData,
    error,
    isLoading,
  } = userAPI.useFetchUserQuery(undefined, { refetchOnMountOrArgChange: true });

  if (isLoading || !userData) {
    return (
      <div className="container py-5" style={{ marginTop: '100px' }}>
        <div className="row">
          <div className="col text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (userData.data.user.role === AccountRoles.ADMIN || userData.data.user.role === AccountRoles.SYS_ADMIN) {
    return <Outlet />;
  }

  return (
    <div className="container py-5" style={{ marginTop: '100px' }}>
    <div className="row">
      <div className="col-md-2 text-center">
        <p>
          <i className="bi bi-exclamation-octagon-fill text-danger" style={{ fontSize: '50px' }}></i><br />
          <span className="text-danger">Status Code: 403</span>
        </p>
      </div>
      <div className="col-md-10">
        <h3>ACCESS DENIED</h3>
        <p>Access to this page is denied due to lack of permissions.</p>
        <Link to={'/'} className="btn btn-primary">Go Back To Home</Link>
      </div>
    </div>
  </div>
  )
};

export default RestrictedRoute;
