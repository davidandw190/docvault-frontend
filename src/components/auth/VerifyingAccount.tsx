import React from 'react';

/**
 * Displays a loading message while the account is being verified.
 * 
 * @component
 */
const VerifyingAccount: React.FC = () => (
  <div className="d-flex align-items-center">
    <strong role="status">Please wait. Verifying...</strong>
    <div className="spinner-border ms-auto" aria-hidden="true"></div>
  </div>
);

export default VerifyingAccount;
