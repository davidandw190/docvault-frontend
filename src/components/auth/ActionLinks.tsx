import { Link } from 'react-router-dom';
import React from 'react';

type Props = {
  firstLinkText: string;
  firstLinkPath: string;
  secondLinkText: string;
  secondLinkPath: string;
};

/**
 * ActionLinks component displays two action links with provided text and paths.
 * 
 * @component
 * @param {Props} props - Props including the text and path for the 2 nav links.
 */
const ActionLinks: React.FC<Props> = ({
  firstLinkText,
  firstLinkPath,
  secondLinkText,
  secondLinkPath,
}: Props) => (
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
