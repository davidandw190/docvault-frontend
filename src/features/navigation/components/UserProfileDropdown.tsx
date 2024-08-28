import { IUser } from '../../../types/interfaces/IUser';
import { NavLink } from 'react-router-dom';

type Props = {
    user: IUser | undefined;
    onLogout: () => void;
    isLoading: boolean;
};

/**
 * Displays a dropdown menu for the user profile.
 *
 * @component
 * @param {Props} props - Props including user, loading state, and onLogout function.
 */
const UserProfileDropdown: React.FC<Props> = ({ user, isLoading, onLogout }: Props) => {
    return (
        <div className="flex-shrink-0 dropdown">
            <a
                className="d-block link-body-emphasis text-decoration-none dropdown-toggle profile-dropdown"
                style={{ cursor: 'pointer' }}
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <img
                    src={
                        isLoading
                            ? 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExODF4MTlob2VueGN5YTk4dTFhZTVleGplZGRhNndlYjVpeTkwaHNpdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7bu3XilJ5BOiSGic/giphy.gif'
                            : user?.imageUrl
                    }
                    alt="User"
                    width="32"
                    height="32"
                    className="rounded-circle"
                />
            </a>
            <ul className="dropdown-menu dropdown-menu-end" style={{ paddingInline: '10px' }}>
                <li>
                    <NavLink
                        to="/profile/details"
                        end
                        className="rounded-2 dropdown-item d-flex gap-2 align-items-center"
                    >
                        <img
                            src={
                                isLoading
                                    ? 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExODF4MTlob2VueGN5YTk4dTFhZTVleGplZGRhNndlYjVpeTkwaHNpdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7bu3XilJ5BOiSGic/giphy.gif'
                                    : user?.imageUrl
                            }
                            alt={user?.firstName}
                            width="35"
                            height="35"
                            className="rounded-circle"
                        />
                        <div>
                            <p style={{ display: 'block', margin: 0, padding: 0, color: '#000' }}>
                                {user?.firstName} {user?.lastName}
                            </p>
                            <p
                                style={{
                                    display: 'block',
                                    margin: 0,
                                    padding: 0,
                                    fontSize: '12px',
                                    fontWeight: 600
                                }}
                            >
                                {user?.email}
                            </p>
                        </div>
                    </NavLink>
                </li>
                <hr className="dropdown-divider" />
                <li>
                    <NavLink
                        to="/user/password"
                        end
                        className="rounded-2 dropdown-item d-flex gap-2 align-items-center"
                    >
                        <i className="bi bi-key"></i>
                        Password
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/user/settings"
                        end
                        className="rounded-2 dropdown-item d-flex gap-2 align-items-center"
                    >
                        <i className="bi bi-gear-wide-connected"></i>
                        Settings
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/user/authorization"
                        end
                        className="rounded-2 dropdown-item d-flex gap-2 align-items-center"
                    >
                        <i className="bi bi-shield-exclamation"></i>
                        Authorization
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/user/authentication"
                        end
                        className="rounded-2 dropdown-item d-flex gap-2 align-items-center"
                    >
                        <i className="bi bi-lock-fill"></i>
                        Authentication (MFA)
                    </NavLink>
                </li>
                <hr className="dropdown-divider" />
                <li>
                    <a
                        onClick={onLogout}
                        className="rounded-2 dropdown-item dropdown-item-danger d-flex gap-2 align-items-center"
                        style={{ cursor: 'pointer' }}
                    >
                        <i className="bi bi-box-arrow-right"></i>
                        Logout
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default UserProfileDropdown;
