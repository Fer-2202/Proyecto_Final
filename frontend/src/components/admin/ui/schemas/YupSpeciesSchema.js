import * as Yup from 'yup';

const YupSpeciesSchema = Yup.object().shape({
  name: Yup.string()
    .required('El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(30, 'El nombre no puede tener más de 30 caracteres'),
  description: Yup.string()
    .max(1000, 'La descripción no puede tener más de 1000 caracteres'),
  img: Yup.mixed(),
  scientific_name: Yup.string()
    .max(100, 'El nombre científico no puede tener más de 100 caracteres'),
});

export default YupSpeciesSchema;