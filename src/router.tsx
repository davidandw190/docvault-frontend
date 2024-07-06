import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import AccountVerification from './pages/AccountVerification';
import App from './App';
import Login from './pages/Login';
import NavBar from './components/navigation/NavBar';
import Registration from './pages/Registration';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Routes */}
      <Route path="login" element={<Login />} />
      <Route path='register' element={<Registration />} />
      <Route path='verify/account' element={<AccountVerification />} />
      {/* Protected Routes */}
      <Route element={<NavBar />}>
        <Route index path='/documents' element={'documents'} />
        <Route path='/' element={<Navigate to={'/documents'} />} />
      </Route>
    </Route>
  )
);

export default router;
