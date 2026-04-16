import { AppError } from '../utils/AppError.js';
import { verifyJwt } from '../utils/jwt.js';

export const requireAuth = (req, _res, next) => {
  const bearer = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.slice(7)
    : null;
  const token = bearer || req.cookies.token;

  if (!token) {
    next(new AppError('Authentication required', 401));
    return;
  }

  try {
    req.user = verifyJwt(token);
    next();
  } catch {
    next(new AppError('Invalid or expired token', 401));
  }
};

export const requireRole = (...roles) => (req, _res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    next(new AppError('Forbidden: insufficient role', 403));
    return;
  }
  next();
};
