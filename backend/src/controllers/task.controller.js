import { TaskService } from '../services/task.service.js';

export const createTask = async (req, res, next) => {
  try {
    const task = await TaskService.create(req.validatedBody, req.user);
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const listTasks = async (req, res, next) => {
  try {
    const tasks = await TaskService.list(req.user);
    res.json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await TaskService.update(Number(req.params.id), req.validatedBody, req.user);
    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    await TaskService.remove(Number(req.params.id), req.user);
    res.json({ success: true, message: 'Task deleted' });
  } catch (error) {
    next(error);
  }
};
