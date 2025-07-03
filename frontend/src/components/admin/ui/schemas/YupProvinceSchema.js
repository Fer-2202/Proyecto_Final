import * as Yup from 'yup';

const YupProvinceSchema = Yup.object().shape({
  name: Yup.string()
    .required('El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(30, 'El nombre no puede tener más de 30 caracteres'),
/*   code: Yup.string()
    .required('Code is required')
    .min(2, 'Code must be at least 2 characters')
    .max(10, 'Code cannot exceed 10 characters'), */
});

export default YupProvinceSchema;