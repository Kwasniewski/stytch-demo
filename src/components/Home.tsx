import React from 'react';
import { useStytchUser } from '@stytch/react';
import { Navigate } from 'react-router';
import Login from './Login';

const Home: React.FC = () => {
  const { user } = useStytchUser();
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="home-container">
      <h1>Welcome to Stytch Demo</h1>
      <p>Please sign in to continue</p>
      <Login />
    </div>
  );
};

export default Home;
