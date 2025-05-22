import { useStytch, useStytchUser } from "@stytch/react";
import { useEffect } from "react";

const Authenticate: React.FC = () => {
  const stytch = useStytch();
  const { user } = useStytchUser();

  useEffect(() => {
    if (stytch && !user) {
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get("token");
      const tokenType = queryParams.get("stytch_token_type");

      // If a token is found, authenticate it with the appropriate method
      if (token && tokenType) {
        if (tokenType === "magic_links") {
          stytch.magicLinks
            .authenticate(token, {
              session_duration_minutes: 60,
            })
            .then(() => (window.location.href = "/dashboard"));
        } else if (tokenType === "oauth") {
          stytch.oauth
            .authenticate(token, {
              session_duration_minutes: 60,
            })
            .then(() => (window.location.href = "/dashboard"));
        }
      }
    }
  }, [stytch, user]);
  return (
    <div>Authenticating...</div>
  );
};

export default Authenticate; 