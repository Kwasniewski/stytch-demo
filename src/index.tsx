import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { StytchProvider } from '@stytch/react';
import { StytchUIClient } from '@stytch/vanilla-js';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Authenticate from './components/Authenticate';

// optional object for configuring SDK cookie behavior, currently showing defaults
const stytchOptions = {
  cookieOptions: {
    opaqueTokenCookieName: 'demo_session',
    jwtCookieName: 'demo_jwt',
    path: '',
    availableToSubdomains: false,
    domain: '',
  },
};

const stytchClient = new StytchUIClient(
  process.env.REACT_APP_STYTCH_PUBLIC_TOKEN || '',
  stytchOptions
);

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

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <StytchProvider stytch={stytchClient}>
      <RouterProvider router={router} />
    </StytchProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
