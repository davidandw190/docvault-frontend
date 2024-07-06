import React from 'react';

/**
 * Displays a message indicating the (account activation or password reset)
 * verification link is invalid.
 * 
 * @component
 */
export const InvalidLinkMessage: React.FC = ()  => (
  <div className="alert alert-dismissible alert-danger">
    Invalid link. Please check the link and try again.
  </div>
);
