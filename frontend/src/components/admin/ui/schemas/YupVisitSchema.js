import * as Yup from 'yup';

const YupVisitSchema = Yup.object().shape({
  day: Yup.date()
    .required('La fecha es requerida'),
  total_slots: Yup.number()
    .required('El total de cupos es requerido')
    .integer('Debe ser un número entero')
    .min(0, 'No puede ser negativo'),
});

export default YupVisitSchema;