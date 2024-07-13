import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import AccountVerification from './pages/AccountVerification';
import App from './App';
import AuthenticationSettings from './components/profile/authentication/AuthenticationSettings';
import AuthorizationSettings from './components/profile/authorization/AuthorizationSettings';
import ForgottenPassword from './pages/ForgottenPassword';
import Login from './pages/Login';
import NavBar from './components/navigation/NavBar';
import Profile from './pages/Profile';
import ProfileDetails from './components/profile/details/ProfileDetails';
import ProfileSettings from './components/profile/settings/ProfileSettings';
import ProtectedRoute from './components/ProtectedRoute';
import Registration from './pages/Registration';
import ResetPassword from './pages/ResetPassword';
import RestrictedRoute from './components/RestrictedRoute';
import UpdatePassword from './components/profile/password/UpdatePassword';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Routes */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Registration />} />
      <Route path="verify-account" element={<AccountVerification />} />
      <Route path="forgot-password" element={<ForgottenPassword />} />
      <Route path="reset-password" element={<ResetPassword />} />

      {/* Redirect root to documents */}
      <Route path="/" element={<Navigate to="/documents" />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<NavBar />}>
          <Route path="documents" element={<div>Documents</div>} />

          {/* Profile Routes */}
          <Route path="profile" element={<Profile />}>
            <Route
              path="/profile"
              element={<Navigate to="/profile/details" />}
            />
            <Route path="details" element={<ProfileDetails />} />
            <Route path="password" element={<UpdatePassword />} />
            <Route path="settings" element={<ProfileSettings />} />
            <Route path="authorization" element={<AuthorizationSettings />} />
            <Route path="authentication" element={<AuthenticationSettings />} />
            <Route path="*" element={<Navigate to="/profile/details" />} />
          </Route>

          {/* Restricted Routes */}
          <Route element={<RestrictedRoute />}>
            <Route path="members" element={<div>Members</div>} />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

export default router;
