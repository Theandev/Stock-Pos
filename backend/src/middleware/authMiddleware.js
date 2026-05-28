import jwt from 'jsonwebtoken';

function extractTokenFromRequest(req) {
  // Support Authorization header (`Bearer <token>`) and common alternatives like `x-access-token`.
  const authHeader = req.headers.authorization || req.headers['x-access-token'];
  if (!authHeader) return null;
  if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) return authHeader.split(' ')[1];
  return authHeader;
}

function normalizePayload(payload) {
  // Create a consistent `user` object regardless of how the token was signed.
  return {
    id: payload.id ?? payload.userId ?? payload.sub ?? null,
    email: payload.email ?? (payload.user && payload.user.email) ?? null,
    role: payload.role ?? (payload.user && payload.user.role) ?? (payload.isAdmin ? 'admin' : null) ?? null,
    name: payload.name ?? (payload.user && payload.user.name) ?? null,
  };
}

export const verifyToken = (req, res, next) => {
  const token = extractTokenFromRequest(req);
  if (!token) return res.status(401).json({ error: 'Authentication required' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'change_this_secret');
    req.user = normalizePayload(payload);
    return next();
  } catch (error) {
    console.error('Token verification failed:', error && error.message ? error.message : error);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const requireAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
  if (!req.user.role || req.user.role !== 'admin') return res.status(403).json({ error: 'Admins only' });
  return next();
};

