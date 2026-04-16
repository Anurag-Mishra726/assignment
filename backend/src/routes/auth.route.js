import { Router } from 'express';
import { getMe, listUsers, login, register } from '../controllers/auth.controller.js';
import { requireAuth, requireRole } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { loginSchema, registerSchema } from '../schemas/auth.schema.js';

export const authRouter = Router();

authRouter.post('/register', validate(registerSchema), register);
authRouter.post('/login', validate(loginSchema), login);
authRouter.get('/me', requireAuth, getMe);
authRouter.get('/users', requireAuth, requireRole('admin'), listUsers);
