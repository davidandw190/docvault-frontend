import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import App from './App';
import LoginPage from './pages/LoginPage';
import NavBar from './components/NavBar';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Routes */}
      <Route path="login" element={<LoginPage />} />
      {/* Protected Routes */}
      <Route element={<NavBar />}>
        <Route index path='/documents' element={'documents'} />
        <Route path='/' element={<Navigate to={'/documents'} />} />
      </Route>
    </Route>
  )
);

export default router;
