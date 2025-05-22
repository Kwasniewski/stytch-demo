import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StytchProvider } from '@stytch/react';
import { StytchUIClient } from '@stytch/vanilla-js';

// optional object for configuring SDK cookie behavior, currently showing defaults
const stytchOptions = {
  cookieOptions: {
    opaqueTokenCookieName: "demo_session",
    jwtCookieName: "demo_jwt",
    path: "",
    availableToSubdomains: false,
    domain: "",
  }
}

const stytchClient = new StytchUIClient(
  process.env.REACT_APP_STYTCH_PUBLIC_TOKEN || '',
  stytchOptions
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <StytchProvider stytch={stytchClient}>
      <App />
    </StytchProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
