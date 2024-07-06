import React from 'react';

type Props = {
  message: string;
};

/**
 * Displays a success message when the account is successfully verified.
 */
const VerificationSuccessMessage: React.FC<Props> = ({ message }) => (
  <div className="alert alert-dismissible alert-success">{message}</div>
);

export default VerificationSuccessMessage;
