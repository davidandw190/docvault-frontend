import { IUser } from "../models/IUser";
import { NavLink } from "react-router-dom";
import React from "react";

type Props = {
  user: IUser | undefined;
}

const NavBarLinks: React.FC<Props> = ({ user }: Props) => {
  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <NavLink to="/documents" end className="nav-link" aria-current="page">
          Documents
        </NavLink>
      </li>
      {user?.role === 'ADMIN' && (
        <li className="nav-item">
          <NavLink to="/users" end className="nav-link">
            Members
          </NavLink>
        </li>
      )}
    </ul>
  );
}

export default NavBarLinks;