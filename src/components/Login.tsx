import { Navigate, useLocation } from 'react-router-dom';

import { ILoginRequest } from '../models/ICredentails';
import { IResponse } from '../models/IResponse';
import { useForm } from 'react-hook-form';
import { userAPI } from '../services/UserService';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// import { useLoginUserMutation } from '../services/UserService';

const loginSchema = z.object({
  email: z.string().min(3, 'Email is required').email('Invalid email address'),
  password: z.string().min(5, 'Password is required')
})

const Login = () => {
  const location = useLocation();
  const isLoggedIn: boolean =
    (JSON.parse(localStorage.getItem('')!) as boolean) || false;
  const [loginUser, { data, error, isLoading, isSuccess }] =
    userAPI.useLoginUserMutation();

    const { register, handleSubmit, formState: form, getFieldState } = useForm<ILoginRequest>({
      resolver: zodResolver(loginSchema),
      mode: 'onTouched'
    });

  const handleLogin = (credentials: ILoginRequest) => loginUser(credentials);

  if (isLoggedIn) {
    return location?.state?.from?.pathname ? <Navigate to={location.state.from.pathname} replace/> : <Navigate to="/" replace/>;
  }

  if (isSuccess && (!data?.data.user.mfa)) {
    localStorage.setItem('login', 'true');
    return location?.state?.from?.pathname ? <Navigate to={location.state.from.pathname} replace/> : <Navigate to="/" replace/>;
  }


  if (isSuccess &&  data?.data.user.mfa) {
    // TODO: Return MFA component
    return
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-6 col-sm-12" style={{ marginTop: '150px' }}>
          <div className="card">
            <div className="card-body">
              <h4 className="mb-3">Login</h4>
              {error && <div className="alert alert-dismissible alert-danger">
                {'data' in error ? (error.data as IResponse<void>).message : 'An error occurred'}
              </div>}
              <hr />
              <form onSubmit={handleSubmit(handleLogin)} className="needs-validation" noValidate>
                <div className="row g-3">
                  <div className="col-12">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <div className="input-group has-validation">
                      <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                      <input type="text" {...register('email')} name='email' autoComplete="on"
                        className={`form-control ' ${form.errors.email ? 'is-invalid' : ''}`}
                        id="email" placeholder="Email address" disabled={false} required /> 
                        {/* TODO: setup feedback when input is valid */}
                      <div className="invalid-feedback">{form.errors.email?.message}</div>
                    </div>
                  </div>
                  <div className="col-12">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group has-validation">
                      <span className="input-group-text"><i className="bi bi-key"></i></span>
                      <input type="password" {...register('password')} name='password' autoComplete="on"
                        className={`form-control ' ${form.errors.password ? 'is-invalid' : ''}`} placeholder="Password" disabled={false} required />
                      {/* TODO: setup feedback when input is valid */}
                      <div className="invalid-feedback">{form.errors.password?.message}</div>
                    </div>
                  </div>
                </div>
                <div className="col mt-3">
                  <button disabled={form.isSubmitting || isLoading} className="btn btn-primary btn-block" type="submit" >
                    {(form.isSubmitting || isLoading) && <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>}
                    <span role="status">{(form.isSubmitting || isLoading) ? 'Loading...' : 'Login'}</span>
                  </button>
                </div>
              </form>
              <hr className="my-3" />
              <div className="row mb-3">
                <div className="col d-flex justify-content-start">
                  <div className="btn btn-outline-light">
                    <Link to="/register" style={{ textDecoration: 'none' }}>Create an Account</Link>
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
  )
};

export default Login;
