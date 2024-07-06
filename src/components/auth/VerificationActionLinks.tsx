import { Link } from 'react-router-dom';
import React from 'react';

/**
 * Displays action links for navigation (e.g., go to login, forgot password).
 */
const VerificationActionLinks: React.FC = () => (
    <>
        <hr className="my-3" />
        <div className="row mb-3">
            <div className="col d-flex justify-content-start">
                <div className="btn btn-outline-light">
                    <Link to="/login" style={{ textDecoration: 'none' }}>Go to Login</Link>
                </div>
            </div>
            <div className="col d-flex justify-content-end">
                <div className="link-dark">
                    <Link to="/resetpassword">Forgot password?</Link>
                </div>
            </div>
        </div>
    </>
);

export default VerificationActionLinks;