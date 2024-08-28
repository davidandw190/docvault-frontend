import AccountRoles from '../../../enums/account.role';
import AccountSettings from '../../../enums/account.settings';
import { IUser } from '../../../types/IUser';

type Props = {
    user: IUser | undefined;
    onToggleAccountSettings: (option: AccountSettings) => void;
};

const getSettingStatus = (user: IUser | undefined, setting: AccountSettings) => {
    switch (setting) {
        case AccountSettings.EXPIRED:
            return !user?.accountNonExpired;
        case AccountSettings.LOCKED:
            return !user?.accountNonLocked;
        case AccountSettings.ENABLED:
            return user?.enabled;
        case AccountSettings.CREDENTIALS_EXPIRED:
            return !user?.credentialsNonExpired;
        default:
            return false;
    }
};

const AccountSettingsList: React.FC<Props> = ({ user, onToggleAccountSettings }: Props) => {
    return (
        <div className="form-group">
            <label className="d-block mb-0">Account Settings</label>
            <div className="small text-muted mb-3">Settings regarding your account</div>
            <div className="form-group mb-0">
                <ul className="list-group list-group-sm">
                    {Object.values(AccountSettings).map(setting => (
                        <li key={setting} className="list-group-item has-icon">
                            {setting.replace('_', ' ')}
                            <div className="form-check form-switch ml-auto">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={setting}
                                    checked={getSettingStatus(user, setting)}
                                    onChange={() => onToggleAccountSettings(setting)}
                                    name={setting}
                                    disabled={
                                        !(
                                            user?.role === AccountRoles.SYS_ADMIN ||
                                            user?.role === AccountRoles.ADMIN
                                        )
                                    }
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AccountSettingsList;
