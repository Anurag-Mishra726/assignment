import { AuthService } from '../services/auth.service.js';
import { UserModel } from '../models/user.model.js';

const cookieConfig = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 24 * 60 * 60 * 1000,
};

export const register = async (req, res, next) => {
  try {
    const { user, token } = await AuthService.register(req.validatedBody);
    res.cookie('token', token, cookieConfig);
    res.status(201).json({ success: true, data: { user, token } });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { user, token } = await AuthService.login(req.validatedBody);
    res.cookie('token', token, cookieConfig);
    res.json({ success: true, data: { user, token } });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.userId);
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const listUsers = async (_req, res, next) => {
  try {
    const users = await UserModel.listAll();
    res.json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};
