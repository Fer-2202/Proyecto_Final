import * as Yup from 'yup';

const YupOrderSchema = Yup.object().shape({
  email: Yup.string()
    .required('El email es requerido')
    .email('Debe ser un email válido'),
  status: Yup.string()
    .required('El estado es requerido')
    .oneOf(["PENDING", "PAID", "CANCELLED", "FAILED"], 'Estado inválido'),
  visit: Yup.number()
    .required('La visita es requerida')
    .integer('Debe ser un número entero')
    .positive('Debe ser positiva'),
  user: Yup.number()
    .required('El usuario es requerido')
    .integer('Debe ser un número entero')
    .positive('Debe ser positivo'),
});

export default YupOrderSchema;