import { Task } from '../models/task.model.js';
import { AppError } from '../utils/AppError.js';

export const TaskService = {
  async create(payload, user) {
    return Task.create({ ...payload, userId: user.userId });
  },

  async list(user) {
    return Task.listForUser(user);
  },

  async update(id, payload, user) {
    const task = await Task.findById(id);
    if (!task) throw new AppError('Task not found', 404);

    const canEdit = user.role === 'admin' || task.user_id === user.userId;
    if (!canEdit) throw new AppError('Forbidden', 403);

    return Task.update(id, {
      title: payload.title ?? task.title,
      description: payload.description ?? task.description,
      status: payload.status ?? task.status,
    });
  },

  async remove(id, user) {
    const task = await Task.findById(id);
    if (!task) throw new AppError('Task not found', 404);

    const canDelete = user.role === 'admin' || task.user_id === user.userId;
    if (!canDelete) throw new AppError('Forbidden', 403);

    await Task.remove(id);
  },
};
