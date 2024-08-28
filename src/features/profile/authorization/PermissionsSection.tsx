type Props = {
    userAuhorities: string;
};

/**
 * It displays the user permissions based on the authorities assigned to the user.
 * It displays the permissions in a list with a badge indicating the type of action.
 *
 * @component
 * @param {Props} props - Props including user authorities.
 */
const PermissionsSection: React.FC<Props> = ({ userAuhorities }: Props) => {
    const permissions = userAuhorities.split(',');

    const getBadgeClass = (type: string) => {
        switch (type) {
            case 'create':
                return 'bg-primary';
            case 'read':
                return 'bg-success';
            case 'update':
                return 'bg-warning';
            case 'delete':
                return 'bg-danger';
            default:
                return '';
        }
    };

    return (
        <div className="col-sm-6">
            <label htmlFor="permissions" className="form-label">
                Permissions
            </label>
            <ul className="list-group">
                {permissions.map(permission => {
                    const [action, type] = permission.split(':');
                    const badgeClass = getBadgeClass(type);

                    return (
                        <li
                            key={permission}
                            className="list-group-item list-group-item-light d-flex justify-content-between align-items-center"
                        >
                            {action}
                            <span className={`badge ${badgeClass} pill`}>{type}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default PermissionsSection;
