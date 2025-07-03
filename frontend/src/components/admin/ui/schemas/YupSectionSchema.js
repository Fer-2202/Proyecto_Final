import * as Yup from 'yup';

const YupSectionSchema = Yup.object().shape({
  name: Yup.string()
    .required('El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(30, 'El nombre no puede tener más de 30 caracteres'),
  description: Yup.string()
    .max(200, 'Description cannot exceed 200 characters'),
});

export default YupSectionSchema;