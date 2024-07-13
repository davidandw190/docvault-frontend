import AccountRoles from '../../../enums/account.role';
import { Role } from '../../../models/IUser';

type Props = {
  userRole: string;
  onUpdateAccountRole: (role: Role) => void;
  isUpdateRoleLoading: boolean;
};

/**
 * It handles user role selection rendering and updating.
 * It displays the user role and allows the user to update the role.
 *
 * @component
 * @param {Props} props - Props including user role, onUpdateAccountRole function, and loading state.
 */
const RoleSelection: React.FC<Props> = ({
  userRole,
  onUpdateAccountRole,
  isUpdateRoleLoading,
}: Props) => {
  const canUpdateRole: boolean = userRole === AccountRoles.SYS_ADMIN;

  return (
    <div className="col-sm-6">
      <label htmlFor="role" className="form-label">
        Authorization (ROLE_{userRole})
      </label>
      <select
        className="form-select"
        id="role"
        defaultValue={userRole}
        onChange={(e) => onUpdateAccountRole({ role: e.target.value })}
        disabled={canUpdateRole || isUpdateRoleLoading}
      >
        {Object.values(AccountRoles).map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
      <div className="small text-muted mt-3">
        Role gives permissions to control actions users are allowed or
        disallowed to take.
      </div>
    </div>
  );
};

export default RoleSelection;
