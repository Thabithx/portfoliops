import express from 'express';
import { getAdminPassword, requireAdmin, signAdminToken, verifyAdminToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', (req, res) => {
  const { password } = req.body || {};

  if (!password || password !== getAdminPassword()) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  const token = signAdminToken();
  res.json({ token, expiresIn: '12h' });
});

router.get('/verify', requireAdmin, (_req, res) => {
  res.json({ ok: true });
});

export default router;
