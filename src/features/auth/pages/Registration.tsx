import ActionLinks from '../../../components/auth/ActionLinks';
import { IResponse } from '../../../types/interfaces/IResponse';
import RegistrationForm from '../components/RegistrationForm';
import { RegistrationRequest } from '../../../types/credentails.types';
import { userAPI } from '../../../services/UserService';

/**
 * Registration component renders the registration form allowing the user
 * to enter his credentials and register a new account.
 *
 * @page
 */
const Registration: React.FC = () => {
    const [registerUser, { data: response, isLoading, error, isSuccess }] =
        userAPI.useRegisterUserMutation();

    const onRegister = async (credentials: RegistrationRequest) => await registerUser(credentials);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-6 col-sm-12" style={{ marginTop: '100px' }}>
                    <div className="card">
                        <div className="card-body">
                            <h4 className="mb-3">Register</h4>
                            {error && (
                                <div className="alert alert-dismissible alert-danger">
                                    {'data' in error
                                        ? (error.data as IResponse<void>).message!
                                        : 'An error occurred'}
                                </div>
                            )}
                            {isSuccess && (
                                <div className="alert alert-dismissible alert-success">
                                    {response.message}
                                </div>
                            )}
                            <hr />
                            <RegistrationForm
                                onRegistration={onRegister}
                                isSuccess={isSuccess}
                                isLoading={isLoading}
                            />
                            <ActionLinks
                                firstLinkText={'Already have an account?'}
                                firstLinkPath={'/login'}
                                secondLinkText={'Forgot your password?'}
                                secondLinkPath={'/forgot-password'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
