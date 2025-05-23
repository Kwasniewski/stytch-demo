import React from 'react';
import { useStytch, useStytchSession, useStytchUser } from '@stytch/react';
import { Navigate } from 'react-router';
import { CopyBlock } from 'react-code-blocks';

const Dashboard: React.FC = () => {
  const stytch = useStytch();
  const { user } = useStytchUser();
  const { session } = useStytchSession();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Profile</h1>
        <button className="primary" onClick={() => stytch.session.revoke()}>
          Log out
        </button>
      </div>
      <h2>User object</h2>
      <CopyBlock
        text={JSON.stringify(user, null, 2)}
        language="json"
        showLineNumbers={true}
        wrapLongLines={true}
      />

      <h2>Session object</h2>
      <CopyBlock
        text={JSON.stringify(session, null, 2)}
        language="json"
        showLineNumbers={true}
        wrapLongLines={true}
      />
      <p>
        You are logged in, and a Session has been created. The SDK stores the Session as a token and
        a JWT in the browser cookies as <span className="code">stytch_session</span> and{' '}
        <span className="code">stytch_session_jwt</span> respectively.
      </p>
    </div>
  );
};

export default Dashboard;
