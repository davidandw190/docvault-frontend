import { Navigate, useLocation } from 'react-router-dom';

import CacheKey from '../enums/cache.key';
import { z } from 'zod';

const schema = z.object({
  email: z.string().min(3, 'Email is required').email('Invalid email address'),
});

const FogottenPassword: React.FC = () => {
  const location = useLocation();
  const isLoggedIn: boolean =
    (JSON.parse(localStorage.getItem(CacheKey.LOGGED_IN)!) as boolean) || false;

  if (isLoggedIn) {
    return location?.state?.from?.pathname ? (
      <Navigate to={location?.state?.from?.pathname} replace />
    ) : (
      <Navigate to={'/'} replace />
    );
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div
          className="col-lg-6 col-md-6 col-sm-12"
          style={{ marginTop: '150px' }}
        >
          <div className="card">
            <div className="card-body">
            <h4 className="mb-3">Request Password Reset</h4>
            <hr />
            {/* TODO: Add a Forgotten Password Form here */}
            {/* TODO #2: Make the action links configurable and add them here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FogottenPassword;
