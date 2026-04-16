import { AppError } from '../utils/AppError.js';

export const notFoundHandler = (_req, _res, next) => {
  next(new AppError('Route not found', 404));
};

export const errorHandler = (err, _req, res, _next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal server error',
    details: err.details || null,
  });
};
