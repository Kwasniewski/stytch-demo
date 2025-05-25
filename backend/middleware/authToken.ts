import { RequestHandler } from 'express';
import { stytchClient } from '../provider/stytch';

const authTokenMiddleware = (): RequestHandler => {
  return async (req, res, next) => {
    try {
      const jwt = req.headers?.authorization?.split(' ')[1];
      if (!jwt) {
        return res.status(401).json({ error: 'No JWT token found' });
      }

      const session = await stytchClient.sessions.authenticateJwtLocal({ session_jwt: jwt });
      req.identity = { user_id: session.user_id };
      return next();
    } catch (error: any) {
      console.error('JWT authentication failed:', error);
      res.status(401).json({ error: 'Invalid or expired token' });
    }
  };
};

export default authTokenMiddleware;
