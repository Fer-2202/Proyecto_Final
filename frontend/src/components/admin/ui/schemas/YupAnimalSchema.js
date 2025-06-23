import * as Yup from 'yup';

const YupAnimalSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters'),
  speciesId: Yup.number()
    .required('Species is required')
    .integer('Species must be an integer')
    .positive('Species must be positive'),
  habitatId: Yup.number()
    .required('Habitat is required')
    .integer('Habitat must be an integer')
    .positive('Habitat must be positive'),
  sectionId: Yup.number()
    .required('Section is required')
    .integer('Section must be an integer')
    .positive('Section must be positive'),
  description: Yup.string()
    .max(200, 'Description cannot exceed 200 characters'),
});

export default YupAnimalSchema;