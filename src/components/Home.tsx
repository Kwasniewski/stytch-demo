import React from 'react';
import { Link } from 'react-router-dom';
import { useStytchUser } from "@stytch/react";
import { Navigate } from 'react-router-dom';

const Home: React.FC = () => {
  const { user } = useStytchUser();
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }


  return (
    <div className="home-container">
      <h1>Welcome to Our App</h1>
      <p>Please sign in to continue</p>
      <Link to="/login" className="auth-link">
        Sign In
      </Link>
    </div>
  );
};

export default Home; 