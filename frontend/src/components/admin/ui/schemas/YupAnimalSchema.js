import * as Yup from 'yup';

const YupAnimalSchema = Yup.object().shape({
  name: Yup.string()
    .required('El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(30, 'El nombre no puede tener más de 30 caracteres'),
  age: Yup.number()
    .required('La edad es requerida')
    .integer('La edad debe ser un número entero')
    .positive('La edad debe ser positiva'),
  species: Yup.number()
    .required('La especie es requerida')
    .integer('La especie debe ser un número entero')
    .positive('La especie debe ser positiva'),
  conservation_status: Yup.number()
    .required('El estado de conservación es requerido')
    .integer('El estado de conservación debe ser un número entero')
    .positive('El estado de conservación debe ser positivo'),
  habitat: Yup.number()
    .required('El hábitat es requerido')
    .integer('El hábitat debe ser un número entero')
    .positive('El hábitat debe ser positivo'),
});

export default YupAnimalSchema;