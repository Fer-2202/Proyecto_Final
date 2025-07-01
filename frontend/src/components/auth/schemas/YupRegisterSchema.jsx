import * as Y from "yup";

export const registerYupSchema = Y.object({
  // User model fields
  username: Y.string().required("Campo requerido"),
  email: Y.string().email("Correo inválido").required("Campo requerido"),
  password: Y.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("Campo requerido"),
  first_name: Y.string().required("Campo requerido"),
  last_name: Y.string().required("Campo requerido"),

  // UserProfile model fields nested under 'profile'
  profile: Y.object({
    phone: Y.string().nullable(),
    address: Y.string().nullable(),
    birth_date: Y.date().nullable(),
    profile_picture: Y.mixed().nullable(), // Use mixed for file input
    bio: Y.string().nullable(),
    id_role: Y.number().nullable(), // Assuming id_role is a number
    id_provinces: Y.number().nullable(), // Assuming id_provinces is a number
  }).nullable(), // Make the entire profile object nullable
});

export default registerYupSchema;