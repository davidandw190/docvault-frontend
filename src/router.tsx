import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import AccountVerification from './features/auth/pages/AccountVerification';
import App from './App';
import AuthenticationSettings from './features/profile/authentication/AuthenticationSettings';
import AuthorizationSettings from './features/profile/authorization/AuthorizationSettings';
import ForgottenPassword from './features/auth/pages/ForgottenPassword';
import Login from './features/auth/pages/Login';
import NavBar from './features/navigation/components/NavBar';
import Profile from './pages/Profile';
import ProfileDetails from './features/profile/details/ProfileDetails';
import ProfileSettings from './features/profile/settings/ProfileSettings';
import ProtectedRoute from './layouts/ProtectedRoute';
import Registration from './features/auth/pages/Registration';
import ResetPassword from './features/auth/pages/ResetPassword';
import RestrictedRoute from './layouts/RestrictedRoute';
import UpdatePassword from './features/profile/password/UpdatePassword';

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
                        <Route path="/profile" element={<Navigate to="/profile/details" />} />
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
