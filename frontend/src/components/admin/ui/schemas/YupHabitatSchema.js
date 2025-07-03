import * as Yup from 'yup';

const YupHabitatSchema = Yup.object().shape({
  name: Yup.string()
    .required('El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(30, 'El nombre no puede tener más de 30 caracteres'),
  nums_animals: Yup.number()
    .required('La cantidad de animales es requerida')
    .integer('Debe ser un número entero')
    .min(0, 'No puede ser negativo'),
  description: Yup.string()
    .required('La descripción es requerida')
    .max(100, 'La descripción no puede tener más de 100 caracteres'),
  section: Yup.number()
    .required('La sección es requerida')
    .integer('Debe ser un número entero')
    .positive('Debe ser positivo'),
});

export default YupHabitatSchema;