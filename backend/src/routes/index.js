import { Router } from 'express';
import { authRouter } from './auth.route.js';
import { taskRouter } from './task.route.js';

export const apiV1Router = Router();

apiV1Router.use('/auth', authRouter);
apiV1Router.use('/tasks', taskRouter);
