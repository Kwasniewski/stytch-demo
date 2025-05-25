import stytch from 'stytch';

export interface Env {
  STYTCH_PROJECT_ID: string;
  STYTCH_SECRET: string;
}

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*', // TODO: Secure this eventually
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
};

function monkeyPatchStytchClientSettings(client: stytch.Client) {
  /* eslint-disable */
  const cl = <any>client;
  /* eslint-enable */
  cl.fetchConfig.cache = undefined;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: DEFAULT_HEADERS,
      });
    }

    const jwt = request.headers.get('Authorization')?.split(' ')[1];
    if (!jwt) return new Response('Unauthorized', { status: 401, headers: DEFAULT_HEADERS });

    const stytchClient = new stytch.Client({
      project_id: (env.STYTCH_PROJECT_ID as string) || '',
      secret: (env.STYTCH_SECRET as string) || '',
    });
    monkeyPatchStytchClientSettings(stytchClient);
    const session = await stytchClient.sessions.authenticateJwtLocal({ session_jwt: jwt });
    if (!session) return new Response('Unauthorized', { status: 401, headers: DEFAULT_HEADERS });

    // /api/validate
    if (url.pathname === '/api/validate' && request.method === 'GET') {
      try {
        return new Response(
          JSON.stringify({
            message: "If you're seeing this, your call was successfully authorized!",
          }),
          {
            headers: DEFAULT_HEADERS,
          }
        );
      } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 401,
          headers: DEFAULT_HEADERS,
        });
      }
    }

    // /api/admin
    if (url.pathname === '/api/admin' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { admin } = body;
        if (typeof admin !== 'boolean') {
          return new Response(JSON.stringify({ error: 'Missing admin' }), {
            status: 400,
            headers: DEFAULT_HEADERS,
          });
        }
        const result = await stytchClient.users.update({
          user_id: session.user_id,
          trusted_metadata: { admin },
        });
        return new Response(JSON.stringify({ message: 'Admin updated successfully!', result }), {
          headers: DEFAULT_HEADERS,
        });
      } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 401,
          headers: DEFAULT_HEADERS,
        });
      }
    }

    return new Response('Not found', { status: 404, headers: DEFAULT_HEADERS });
  },
};
