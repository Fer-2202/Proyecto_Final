import * as Yup from 'yup';

const YupConservationStatusSchema = Yup.object().shape({
  name: Yup.string()
    .required('El estado es requerido')
    .oneOf(["LC", "NT", "VU", "EN", "CR", "EW", "EX"], 'Estado inválido'),
});

export default YupConservationStatusSchema;