import { Link } from 'react-router-dom';
import React from 'react';

type Props = {
  firstLinkText: string;
  firstLinkPath: string;
  secondLinkText: string;
  secondLinkPath: string;
};

/**
 * Displays action links for navigation (e.g., go to login, forgot password).
 */
const ActionLinks: React.FC<Props> = ({
  firstLinkText,
  firstLinkPath,
  secondLinkText,
  secondLinkPath,
}) => (
  <>
    <hr className="my-3" />
    <div className="row mb-3">
      <div className="col d-flex justify-content-start">
        <div className="link-container">
          <Link to={firstLinkPath} className="action-link">
            <small>{firstLinkText}</small>
          </Link>
        </div>
      </div>
      <div className="col d-flex justify-content-end">
        <div className="link-container">
          <Link to={secondLinkPath} className="action-link">
            <small>{secondLinkText}</small>
          </Link>
        </div>
      </div>
    </div>
  </>
);

export default ActionLinks;
