import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import AccountVerification from './pages/AccountVerification';
import App from './App';
import ForgottenPassword from './pages/ForgottenPassword';
import Login from './pages/Login';
import NavBar from './components/navigation/NavBar';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Registration from './pages/Registration';
import ResetPassword from './pages/ResetPassword';
import RestrictedRoute from './components/RestrictedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Routes */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Registration />} />
      <Route path="verify/account" element={<AccountVerification />} />
      <Route path="forgot-password" element={<ForgottenPassword />} />
      <Route path="reset-password" element={<ResetPassword />} />
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<NavBar />}>
          <Route index path="documents" element={'documents'} />
          <Route path="/" element={<Navigate to={'/documents'} />} />
          <Route path="profile" element={<Profile />}>
          </Route>
          <Route element={<RestrictedRoute />}>
            <Route path="members" element={'members'} />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

export default router;
