import { z } from "zod";

export const registerZodSchema = z.object({
  // Validacion de campos de los User
  username: z.string().min(1, "Campo requerido"),
  email: z.string().email("Correo inválido").min(1, "Campo requerido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .min(1, "Campo requerido"),
  first_name: z.string().min(1, "Campo requerido"),
  last_name: z.string().min(1, "Campo requerido"),

  // Validacion decambios del UserProfile
  profile: z
    .object({
      phone: z.string().optional().nullable(),
      address: z.string().optional().nullable(),
      birth_date: z.string().optional().nullable(), // Usar un string para el input de fecha
      profile_picture: z.any().optional().nullable(), // Use z.any() for file input
      bio: z.string().optional().nullable(),
      id_role: z.number().optional().nullable(), // Digamos que id_role es un number
      id_provinces: z.number().optional().nullable(), // Digamos que id_provinces es un number
    })
    .optional(), // Make the entire profile object optional
});

export default registerZodSchema;