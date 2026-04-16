import { Router } from 'express';
import { createTask, deleteTask, listTasks, updateTask } from '../controllers/task.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { taskCreateSchema, taskUpdateSchema } from '../schemas/task.schema.js';

export const taskRouter = Router();

taskRouter.use(requireAuth);
taskRouter.get('/', listTasks);
taskRouter.post('/', validate(taskCreateSchema), createTask);
taskRouter.put('/:id', validate(taskUpdateSchema), updateTask);
taskRouter.delete('/:id', deleteTask);
