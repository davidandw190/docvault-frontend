import { Navigate, useLocation } from 'react-router-dom';

import ActionLinks from '../../../components/auth/ActionLinks';
import CacheKey from '../../../enums/cache.key';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import { ForgotPasswordRequest } from '../../../types/credentails.types';
import { IResponse } from '../../../types/interfaces/IResponse';
import { userAPI } from '../../../services/UserService';

/**
 * ForgottenPassword component renders the forgot password form allowing the user
 * to enter his email on which to recieve a reset password link, and handles the
 * password reset request.
 *
 * @page
 */
const FogottenPassword: React.FC = () => {
    const location = useLocation();
    const isLoggedIn: boolean =
        (JSON.parse(localStorage.getItem(CacheKey.LOGGED_IN)!) as boolean) || false;

    const [forgotPassword, { data: response, error, isLoading, isSuccess }] =
        userAPI.useForgotPasswordMutation();

    const onForgotPassword = async (request: ForgotPasswordRequest) => {
        forgotPassword(request);
    };

    if (isLoggedIn) {
        return location?.state?.from?.pathname ? (
            <Navigate to={location?.state?.from?.pathname} replace />
        ) : (
            <Navigate to={'/'} replace />
        );
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-6 col-sm-12" style={{ marginTop: '150px' }}>
                    <div className="card">
                        <div className="card-body">
                            <h4 className="mb-3">Request Password Reset</h4>
                            {error && (
                                <div className="alert alert-dismissable alter-danger">
                                    {'data' in error
                                        ? (error.data as IResponse<void>).message
                                        : 'An error occurred. Please try again later.'}
                                </div>
                            )}
                            {isSuccess && (
                                <div className="alert alert-success">
                                    {(response as IResponse<void>).message ||
                                        'We sent you an email for you to reset your password'}
                                    <img
                                        src="/checkmark.png"
                                        alt="Success"
                                        className="mb-3"
                                        style={{ width: '50px', height: '50px' }}
                                    />
                                </div>
                            )}
                            <hr />
                            {!isSuccess && (
                                <ForgotPasswordForm
                                    onSubmit={onForgotPassword}
                                    isLoading={isLoading}
                                />
                            )}
                            <ActionLinks
                                firstLinkText={'Go back to Login'}
                                firstLinkPath={'/login'}
                                secondLinkText={'Resend the code'}
                                secondLinkPath={''}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FogottenPassword;
