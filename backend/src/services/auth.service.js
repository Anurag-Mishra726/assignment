import bcrypt from 'bcryptjs';
import { UserModel } from '../models/user.model.js';
import { AppError } from '../utils/AppError.js';
import { signJwt } from '../utils/jwt.js';

export const AuthService = {
  async register(payload) {
    const existing = await UserModel.findByEmail(payload.email.toLowerCase());
    if (existing) throw new AppError('Email already in use', 409);

    const password = await bcrypt.hash(payload.password, 12);
    const user = await UserModel.create({
      username: payload.username,
      email: payload.email.toLowerCase(),
      password,
      role: payload.role,
    });

    const token = signJwt({ userId: user.id, role: user.role, email: user.email });
    return { user, token };
  },

  async login(payload) {
    const user = await UserModel.findByEmail(payload.email.toLowerCase());
    if (!user) throw new AppError('Invalid email or password', 401);

    const valid = await bcrypt.compare(payload.password, user.password_hash);
    if (!valid) throw new AppError('Invalid email or password', 401);

    const profile = await UserModel.findById(user.id);
    const token = signJwt({ userId: profile.id, role: profile.role, email: profile.email });
    return { user: profile, token };
  },
};
