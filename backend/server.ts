import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authTokenMiddleware from './middleware/authToken';
import { stytchClient } from './provider/stytch';

const app: Express = express();
const port: number = Number(process.env.BACKEND_PORT) || 4000;

// Middleware
app.use(
  cors({
    origin: process.env.REACT_APP_DOMAIN || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Routes
app.get('/api/validate', authTokenMiddleware(), (_req, res) => {
  res.json({ message: "If you're seeing this, your call was successfully authorized!" });
});

app.post('/api/admin', authTokenMiddleware(), async (req, res) => {
  const { admin } = req.body;
  try {
    await stytchClient.users.update({
      user_id: req.identity.user_id,
      trusted_metadata: { admin },
    });
    res.json({ message: 'User updated successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to upate User status', error: err?.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
