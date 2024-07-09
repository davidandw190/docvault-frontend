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
            <Route path="details" element={<div>Profile Details</div>} />
            <Route path="password" element={<div>Password</div>} />
            <Route path="settings" element={<div>Settings</div>} />
            <Route path="authorization" element={<div>Authorization</div>} />
            <Route path="authentication" element={<div>Authentication</div>} />
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
