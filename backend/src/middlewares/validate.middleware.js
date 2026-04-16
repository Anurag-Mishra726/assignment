import { ZodError } from 'zod';
import { AppError } from '../utils/AppError.js';

export const validate = (schema) => (req, _res, next) => {
  try {
    req.validatedBody = schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const details = error.issues.map((i) => ({ path: i.path.join('.'), message: i.message }));
      next(new AppError('Validation failed', 400, details));
      return;
    }
    next(error);
  }
};
