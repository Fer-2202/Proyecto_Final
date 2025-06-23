import * as Yup from 'yup';

const YupSpeciesSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters'),
  scientificName: Yup.string()
    .required('Scientific Name is required')
    .min(2, 'Scientific Name must be at least 2 characters')
    .max(50, 'Scientific Name cannot exceed 50 characters'),
  conservationStatusId: Yup.number()
    .required('Conservation Status is required')
    .integer('Conservation Status must be an integer')
    .positive('Conservation Status must be positive'),
  description: Yup.string().max(200, 'Description cannot exceed 200 characters'),
});

export default YupSpeciesSchema;