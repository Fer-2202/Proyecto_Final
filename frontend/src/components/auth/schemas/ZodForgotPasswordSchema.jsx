import { z } from 'zod';

export const forgotPasswordZodSchema = z.object({
  email: z.string().email('Correo inválido').min(1, 'Campo requerido'),
});

export default forgotPasswordZodSchema;