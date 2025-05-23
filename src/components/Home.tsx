import React, { useEffect } from 'react';
import { useStytch, useStytchUser } from '@stytch/react';
import { Navigate } from 'react-router';
import Login from './Login';

const Home: React.FC = () => {
  const stytch = useStytch();
  const { user } = useStytchUser();

  useEffect(() => {
    if (stytch && !user) {
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get('token');
      const tokenType = queryParams.get('stytch_token_type');

      // If a token is found, authenticate it with the appropriate method
      if (token && tokenType) {
        if (tokenType === 'magic_links') {
          stytch.magicLinks.authenticate(token, {
            session_duration_minutes: 60,
          });
        } else if (tokenType === 'oauth') {
          stytch.oauth.authenticate(token, {
            session_duration_minutes: 60,
          });
        }
      }
    }
  }, [stytch, user]);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="home-container">
      <Login />
    </div>
  );
};

export default Home;
