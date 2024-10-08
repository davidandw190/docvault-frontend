import React from 'react';

type Props = {
    message: string;
};

/**
 * Displays an error message for when an (activation or password reset) account
 * verification fails.
 * 
 * @component
 * @param {Props} props - Props including the error message.
 */
const VerificationErrorMessage: React.FC<Props> = ({ message }) => (
    <div className="alert alert-dismissible alert-danger">
        {message}
    </div>
);

export default VerificationErrorMessage;
