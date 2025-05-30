import * as Y from 'yup';

export const loginYupSchema = Y.object({
  identifier: Y.string().required('Campo requerido'), // Use identifier instead of email
  password: Y.string().required('Campo requerido'),
});

export default loginYupSchema;