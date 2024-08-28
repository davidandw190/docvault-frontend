import ActionLinks from '../../../components/auth/ActionLinks';
import { IResetPasswordExternallyRequest } from '../../../types/ICredentails';
import { IResponse } from '../../../types/IResponse';
import { InvalidLinkMessage } from '../../../components/auth/InvalidLinkMessage';
import ResetPasswordForm from '../components/ResetPasswordForm';
import VerificationErrorMessage from '../../../components/auth/VerificationErrorMessage';
import VerifyingAccount from '../../../components/auth/VerifyingAccount';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { userAPI } from '../../../services/UserService';

/**
 * ResetPassword component renders the reset password form allowing the user
 * to enter a new password after verifying the reset password link.
 *
 * @page
 */
const ResetPassword: React.FC = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const key = searchParams.get('key');

    const [
        verifyResetPassword,
        {
            data: response,
            error: verifyError,
            isLoading: isVerifyLoading,
            isSuccess: isVerifySuccess
        }
    ] = userAPI.useVerifyResetPasswordMutation();

    const [
        resetPasswordExternally,
        { error: resetError, isLoading: isResetLoading, isSuccess: isResetSuccess }
    ] = userAPI.useResetPasswordExternallyMutation();

    const onResetPassword = async (payload: IResetPasswordExternallyRequest) => {
        await resetPasswordExternally(payload);
    };

    useEffect(() => {
        if (key) {
            verifyResetPassword(key);
        }
    }, [key, verifyResetPassword]);

    const renderContent = () => {
        if (!key) {
            return <InvalidLinkMessage />;
        }

        if (isVerifyLoading) {
            return <VerifyingAccount />;
        }

        if (verifyError) {
            const message =
                'data' in verifyError
                    ? (verifyError.data as IResponse<void>).message!
                    : 'An error occurred. Please try again later.';
            return <VerificationErrorMessage message={message} />;
        }

        if (isVerifySuccess) {
            return (
                <>
                    {resetError && (
                        <div className="alert alert-dismissible alert-danger">
                            {'data' in resetError
                                ? (resetError.data as IResponse<void>).message!
                                : 'An error occurred'}
                        </div>
                    )}
                    {isResetSuccess && (
                        <div className="alert alert-dismissible alert-success">
                            You password was reset successfully. You can now go back to Login
                        </div>
                    )}
                    <hr />
                    <ResetPasswordForm
                        onSubmit={onResetPassword}
                        isLoading={isVerifyLoading || isResetLoading}
                        userId={response.data.user.userId!}
                    />
                    ;
                </>
            );
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-12" style={{ marginTop: '100px' }}>
                    <div className="card">
                        <div className="card-body">
                            {renderContent()}
                            <ActionLinks
                                firstLinkText={'Go back to Login'}
                                firstLinkPath={'/login'}
                                secondLinkText={''}
                                secondLinkPath={''}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
