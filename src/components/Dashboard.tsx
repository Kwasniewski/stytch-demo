import React, { useState, useEffect } from 'react';
import { useStytch, useStytchSession, useStytchUser } from '@stytch/react';
import { Navigate } from 'react-router';
import { CopyBlock } from 'react-code-blocks';

const getCookie = (name: string) => {
  const cookie: Record<string, string> = {};
  document.cookie.split(';').forEach(function (el) {
    const split = el.split('=');
    cookie[split[0].trim()] = split.slice(1).join('=');
  });
  return cookie[name];
};

const Dashboard: React.FC = () => {
  const stytch = useStytch();
  const { user } = useStytchUser();
  const { session } = useStytchSession();

  const [userData, setUserData] = useState<string>('');
  const [apiResponse, setApiResponse] = useState<string>('');
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const trusted = user?.trusted_metadata;
    if (trusted && typeof trusted.admin === 'boolean') {
      setAdmin(trusted.admin);
    }
    setUserData(JSON.stringify(user, null, 2));
  }, [user]);

  const validateApi = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/validate`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('demo_jwt')}`,
      },
    })
      .then(response => response.json())
      .then(json => setApiResponse(json.message || JSON.stringify(json)))
      .catch(error => setApiResponse(`Error: ${error.message}`));
  };

  const setUserAdmin = (newAdmin: boolean) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getCookie('demo_jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ admin: newAdmin }),
    })
      .then(response => response.json())
      .then(json => {
        setApiResponse(json.message || JSON.stringify(json));
        if (user) {
          user.trusted_metadata.admin = newAdmin;
          setUserData(JSON.stringify(user, null, 2));
        }
        setAdmin(newAdmin);
      })
      .catch(error => setApiResponse(`Error: ${error.message}`));
  };

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Profile</h1>
        <button className="primary" onClick={validateApi}>
          Validate API
        </button>

        <div style={{ margin: '1rem 0' }}>
          <button
            className={`primary ${admin ? 'admin-true' : 'admin-false'}`}
            onClick={() => setUserAdmin(!admin)}
          >
            Toggle Admin
          </button>
        </div>

        <button className="primary" onClick={() => stytch.session.revoke()}>
          Log out
        </button>
      </div>
      {apiResponse && (
        <>
          <h2>API Response</h2>
          <div className="api-response">{apiResponse}</div>
        </>
      )}
      <h2>User object</h2>
      <CopyBlock text={userData} language="json" showLineNumbers={true} wrapLongLines={true} />

      <h2>Session object</h2>
      <CopyBlock
        text={JSON.stringify(session, null, 2)}
        language="json"
        showLineNumbers={true}
        wrapLongLines={true}
      />
    </div>
  );
};

export default Dashboard;
