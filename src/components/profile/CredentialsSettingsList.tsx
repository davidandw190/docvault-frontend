import { IUser } from '../../models/IUser';
import React from 'react';

type Props = {
  user: IUser | undefined;
};

const CredentialsSettingsList: React.FC<Props> = ({ user }: Props) => {
  return (
    <div className="form-group mt-4">
      <label className="d-block mb-0">Credentials Settings</label>
      <div className="small text-muted mb-3">
        Your credentials will expire after 90 days if not updated.
      </div>
      <div className="form-group mb-0">
        <ul className="list-group list-group-sm">
          <li className="list-group-item has-icon">
            Credentials Expired
            <div className="form-check form-switch ml-auto">
              <input
                type="checkbox"
                checked={!user?.credentialsNonExpired}
                disabled={true}
                readOnly={true}
                className="form-check-input"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CredentialsSettingsList;
