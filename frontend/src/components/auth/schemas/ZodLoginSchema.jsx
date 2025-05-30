import { z } from 'zod';

export const loginZodSchema = z.object({
  identifier: z.string(), // Use identifier instead of email
  password: z.string().min(1, 'Campo requerido'),
});

export default loginZodSchema;