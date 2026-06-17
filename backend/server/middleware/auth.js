import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'portfolio-admin-dev-secret-change-me';
const TOKEN_TTL = '12h';

export function signAdminToken() {
  return jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: TOKEN_TTL });
}

export function verifyAdminToken(token) {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload?.role === 'admin';
  } catch {
    return false;
  }
}

export function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token || !verifyAdminToken(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || 'portfolio-admin';
}
