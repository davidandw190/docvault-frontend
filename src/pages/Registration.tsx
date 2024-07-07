import ActionLinks from '../components/auth/ActionLinks';
import { IRegistrationRequest } from '../models/ICredentails';
import { IResponse } from '../models/IResponse';
import RegistrationForm from '../components/auth/RegistrationForm';
import { userAPI } from '../services/UserService';

const Registration: React.FC = () => {
  const [registerUser, { data: response, isLoading, error, isSuccess }] =
    userAPI.useRegisterUserMutation();

  const onRegister = async (credentials: IRegistrationRequest) =>
    await registerUser(credentials);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div
          className="col-lg-6 col-md-6 col-sm-12"
          style={{ marginTop: '100px' }}
        >
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
                secondLinkPath={'/reset-password'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
