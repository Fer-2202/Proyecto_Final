import * as Yup from 'yup';

const YupProvinceSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters'),
/*   code: Yup.string()
    .required('Code is required')
    .min(2, 'Code must be at least 2 characters')
    .max(10, 'Code cannot exceed 10 characters'), */
});

export default YupProvinceSchema;