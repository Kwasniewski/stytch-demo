import stytch from 'stytch';

export const stytchClient = new stytch.Client({
  project_id: (process.env.STYTCH_PROJECT_ID as string) || '',
  secret: (process.env.STYTCH_SECRET as string) || '',
});
