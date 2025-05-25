declare namespace Express {
  interface Request {
    identity: {
      user_id: string;
    };
  }
}
