import { NavLink } from 'react-router-dom';

/**
 * It displays navigation links for profile pages.
 *
 * @component
 */
const ProfileNavigation: React.FC = () => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <ul className="nav nav-pills nav-justified-start flex-column">
                    <li className="nav-item mb-2">
                        <NavLink
                            to="/profile/details"
                            end
                            className="nav-link fs-6 text fw-semibold"
                        >
                            <i className="bi bi-person-circle me-2"></i>
                            Profile
                        </NavLink>
                    </li>

                    <li className="nav-item mb-2">
                        <NavLink
                            to="/profile/password"
                            end
                            className="nav-link fs-6 text fw-semibold"
                        >
                            <i className="bi bi-key me-2"></i>
                            Password
                        </NavLink>
                    </li>
                    <li className="nav-item mb-2">
                        <NavLink
                            to="/profile/settings"
                            end
                            className="nav-link fs-6 text fw-semibold"
                        >
                            <i className="bi bi-gear-wide-connected me-2"></i>
                            Settings
                        </NavLink>
                    </li>
                    <li className="nav-item mb-2">
                        <NavLink
                            to="/profile/authorization"
                            end
                            className="nav-link fs-6 text fw-semibold"
                        >
                            <i className="bi bi-shield-exclamation me-2"></i>
                            Authorization
                        </NavLink>
                    </li>
                    <li className="nav-item mb-2">
                        <NavLink
                            to="/profile/authentication"
                            end
                            className="nav-link fs-6 text fw-semibold"
                        >
                            <i className="bi bi-lock-fill me-2"></i>
                            Authentication (MFA)
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProfileNavigation;
