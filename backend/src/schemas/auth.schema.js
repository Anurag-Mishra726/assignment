import { z } from 'zod';

const password = z.string().min(8).max(64)
  .regex(/[A-Z]/, 'Password must include an uppercase letter')
  .regex(/[a-z]/, 'Password must include a lowercase letter')
  .regex(/[0-9]/, 'Password must include a number');

export const registerSchema = z.object({
  username: z.string().trim().min(2).max(100),
  email: z.email(),
  password,
  confirmPassword: password,
  role: z.enum(['user', 'admin']).default('user'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password and Confirm password is must match"
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});
