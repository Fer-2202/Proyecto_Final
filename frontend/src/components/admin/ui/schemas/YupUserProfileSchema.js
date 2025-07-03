import * as Yup from 'yup';

const YupUserProfileSchema = Yup.object().shape({
  user: Yup.number()
    .required('El usuario es requerido')
    .integer('Debe ser un número entero')
    .positive('Debe ser positivo'),
  province: Yup.number()
    .nullable(),
  phone: Yup.string()
    .max(20, 'El teléfono no puede tener más de 20 caracteres'),
  address: Yup.string()
    .max(255, 'La dirección no puede tener más de 255 caracteres'),
  birth_date: Yup.date(),
  profile_picture: Yup.mixed(),
  bio: Yup.string(),
});

export default YupUserProfileSchema;