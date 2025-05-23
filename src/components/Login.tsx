import React from 'react';
import { StytchLogin } from '@stytch/react';
import { OAuthProviders, OneTapPositions, Products } from '@stytch/vanilla-js';

const Login: React.FC = () => {
  const config = {
    products: [Products.emailMagicLinks, Products.oauth],
    emailMagicLinksOptions: {
      loginRedirectURL: `${process.env.REACT_APP_DOMAIN}/stytch-demo`,
      loginExpirationMinutes: 30,
      signupRedirectURL: `${process.env.REACT_APP_DOMAIN}/stytch-demo`,
      signupExpirationMinutes: 30,
      createUserAsPending: true,
    },
    oauthOptions: {
      providers: [
        {
          type: OAuthProviders.Google,
          one_tap: true,
          position: OneTapPositions.floating,
          cancel_on_tap_outside: false,
        },
        {
          type: OAuthProviders.Github,
        },
      ],
    },
  };

  return <StytchLogin config={config} />;
};

export default Login;
