import { z } from 'zod';

export const taskCreateSchema = z.object({
  title: z.string().trim().min(1).max(160),
  description: z.string().trim().max(2000).optional().default(''),
  status: z.enum(['pending', 'in_progress', 'done']).default('pending'),
});

export const taskUpdateSchema = taskCreateSchema.partial().refine(
  (v) => Object.keys(v).length > 0,
  { message: 'At least one field is required for update' }
);
