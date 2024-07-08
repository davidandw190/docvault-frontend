import React from 'react';

type Props = {
  message: string;
};

/**
 * Displays a success message when the account is successfully verified.
 * 
 * @component
 * @param {Props} props - Props including the success message.
 */
const VerificationSuccessMessage: React.FC<Props> = ({ message }) => (
  <div className="alert alert-dismissible alert-success">{message}</div>
);

export default VerificationSuccessMessage;
