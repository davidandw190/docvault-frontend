import { IRegistrationRequest } from '../models/ICredentails';
import { IResponse } from '../models/IResponse';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { userAPI } from '../services/UserService';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const registrationSchema = z.object({
  firstName: z.string().min(3, 'First name is required'),
  lastName: z.string().min(3, 'Last name is required'),
  email: z.string().min(3, 'Email is required').email('Invalid email address'),
  password: z.string().min(5, 'Password is required'),
  confirmPassword: z.string().min(5, 'Password is required'),
});

const Registration: React.FC = () => {
  const [registerUser, { data: response, isLoading, error, isSuccess }] =
    userAPI.useRegisterUserMutation();

  const { register, reset, handleSubmit, formState, getFieldState } =
    useForm<IRegistrationRequest>({
      resolver: zodResolver(registrationSchema),
      mode: 'onTouched',
    });

  const isFieldValid = (fieldName: keyof IRegistrationRequest): boolean =>
    getFieldState(fieldName, formState).isTouched &&
    !getFieldState(fieldName, formState).invalid;

  const handleRegistration = async (credentials: IRegistrationRequest) =>
    await registerUser(credentials);

  useEffect(() => {
    reset();
  }, [isSuccess, reset]);

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
              <form
                onSubmit={handleSubmit(handleRegistration)}
                className="needs-validation"
                noValidate
              >
                <div className="row g-3">
                  <div className="col-12">
                    <label htmlFor="firstName" className="form-label">
                      First name
                    </label>
                    <div className="input-group has-validation">
                      <span className="input-group-text">
                        <i className="bi bi-person-vcard"></i>
                      </span>
                      <input
                        type="text"
                        {...register('firstName')}
                        name="firstName"
                        className={`form-control ' ${
                          formState.errors.firstName ? 'is-invalid' : ''
                        } ${isFieldValid('firstName') ? 'is-valid' : ''}`}
                        id="firstName"
                        placeholder="First name"
                        disabled={isLoading}
                        required
                      />
                      <div className="invalid-feedback">
                        {formState.errors.firstName?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <label htmlFor="lastName" className="form-label">
                      Last name
                    </label>
                    <div className="input-group has-validation">
                      <span className="input-group-text">
                        <i className="bi bi-person-vcard"></i>
                      </span>
                      <input
                        type="text"
                        {...register('lastName')}
                        name="lastName"
                        className={`form-control ' ${
                          formState.errors.lastName ? 'is-invalid' : ''
                        } ${isFieldValid('lastName') ? 'is-valid' : ''}`}
                        id="lastName"
                        placeholder="Last Name"
                        disabled={isLoading}
                        required
                      />
                      <div className="invalid-feedback">
                        {formState.errors.lastName?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <div className="input-group has-validation">
                      <span className="input-group-text">
                        <i className="bi bi-envelope"></i>
                      </span>
                      <input
                        type="text"
                        {...register('email')}
                        name="email"
                        className={`form-control ' ${
                          formState.errors.email ? 'is-invalid' : ''
                        } ${isFieldValid('email') ? 'is-valid' : ''}`}
                        id="email"
                        placeholder="Email address"
                        disabled={isLoading}
                        required
                      />
                      <div className="invalid-feedback">
                        {formState.errors.email?.message}
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <div className="input-group has-validation">
                      <span className="input-group-text">
                        <i className="bi bi-key"></i>
                      </span>
                      <input
                        type="password"
                        {...register('password')}
                        name="password"
                        className={`form-control ' ${
                          formState.errors.password ? 'is-invalid' : ''
                        } ${isFieldValid('password') ? 'is-valid' : ''}`}
                        placeholder="Password"
                        disabled={isLoading}
                        required
                      />
                      <div className="invalid-feedback">
                        {formState.errors.password?.message}
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm password
                    </label>
                    <div className="input-group has-validation">
                      <span className="input-group-text">
                        <i className="bi bi-key"></i>
                      </span>
                      <input
                        type="password"
                        {...register('confirmPassword')}
                        name="confirmPassword"
                        className={`form-control ' ${
                          formState.errors.confirmPassword ? 'is-invalid' : ''
                        } ${isFieldValid('confirmPassword') ? 'is-valid' : ''}`}
                        placeholder="Confirm password"
                        disabled={isLoading}
                        required
                      />
                      <div className="invalid-feedback">
                        {formState.errors.confirmPassword?.message}
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="col">
                  <button
                    disabled={formState.isSubmitting || isLoading}
                    className="btn btn-primary"
                    type="submit"
                  >
                    {(formState.isSubmitting || isLoading) && (
                      <span
                        className="spinner-border spinner-border-sm"
                        aria-hidden="true"
                      ></span>
                    )}
                    <span role="status">
                      {formState.isSubmitting || isLoading
                        ? 'Loading...'
                        : 'Register'}
                    </span>
                  </button>
                </div>
              </form>
              <hr className="my-3" />
              <div className="row mb-3">
                <div className="col d-flex justify-content-start">
                  <div className="btn btn-outline-light">
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                      Go to login
                    </Link>
                  </div>
                </div>
                <div className="col d-flex justify-content-end">
                  <div className="link-dark">
                    <Link to="/resetpassword">Forgot password?</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
