import { Navigate, useLocation } from 'react-router-dom';

import { ILoginRequest } from '../models/ICredentails';
import { userAPI } from '../services/UserService';

// import { useLoginUserMutation } from '../services/UserService';

const Login = () => {
  const location = useLocation();
  const isLoggedIn: boolean =
    (JSON.parse(localStorage.getItem('')!) as boolean) || false;
  const [loginUser, { data, error, isLoading, isSuccess }] =
    userAPI.useLoginUserMutation();

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

  return <div>Login</div>;
};

export default Login;
