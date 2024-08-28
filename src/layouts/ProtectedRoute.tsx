import { Navigate, Outlet, useLocation } from 'react-router-dom';

import CacheKey from '../enums/cache.key';

/**
 * Renders a protected route that requires the user to be logged in.
 * If the user is logged in, it renders the child routes. Otherwise, it redirects to the login page.
 *
 * @returns The protected route component.
 */
const ProtectedRoute = () => {
    const location = useLocation();
    const isLoggedIn = (JSON.parse(localStorage.getItem(CacheKey.LOGGED_IN)!) as boolean) || false;

    return isLoggedIn ? <Outlet /> : <Navigate to={'/login'} replace state={{ from: location }} />;
};

export default ProtectedRoute;
