import * as Yup from 'yup';

const YupOrderSchema = Yup.object().shape({
  date: Yup.date().required('Date is required'),
  total: Yup.number()
    .required('Total is required')
    .positive('Total must be a positive number'),
  userProfileId: Yup.number()
    .required('User Profile is required')
    .integer('User Profile must be an integer')
    .positive('User Profile must be positive'),
});

export default YupOrderSchema;