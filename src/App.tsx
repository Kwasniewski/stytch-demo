import { createBrowserRouter, RouterProvider, Navigate } from 'react-router';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Authenticate from './components/Authenticate';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/authenticate',
    element: <Authenticate />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
