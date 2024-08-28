import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import CacheKey from '../../../enums/cache.key';
import NavBarLinks from './NavBarLinks';
import UserProfileDropdown from './UserProfileDropdown';
import appLogo from '../../assets/logo.png';
import { userAPI } from '../../../services/UserService';

/**
 * NavBar component renders the navigation bar with links and user profile dropdown.
 * It fetches user data using Redux Toolkit query and manages logout functionality.
 *
 * @component
 */
const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const {
        data: response,
        // error,
        isLoading: isUserFetchLoading
        // refetch,
    } = userAPI.useFetchUserQuery();

    const [logoutUser] = userAPI.useLogoutUserMutation();

    const onLogout = async () => {
        localStorage.removeItem(CacheKey.LOGGED_IN);
        localStorage.removeItem(CacheKey.ROLE);
        await logoutUser();
        navigate('/login');
    };

    return (
        <>
            <nav
                className="navbar navbar-expand-md fixed-top bg-light"
                data-bs-theme="light"
                style={{ marginBottom: '250px' }}
            >
                <div className="container">
                    <NavLink to="/" end className="navbar-brand">
                        <img
                            src={appLogo}
                            alt="Logo"
                            width="40"
                            height="40"
                            style={{ padding: '0', margin: '0', borderRadius: '0.370rem' }}
                        />
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo02"
                        aria-controls="navbarTogglerDemo02"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <NavBarLinks user={response?.data.user} />
                        <UserProfileDropdown
                            user={response?.data.user}
                            isLoading={isUserFetchLoading}
                            onLogout={onLogout}
                        />
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    );
};

export default NavBar;
