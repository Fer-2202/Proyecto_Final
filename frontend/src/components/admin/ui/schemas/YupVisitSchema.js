import * as Yup from 'yup';

const YupVisitSchema = Yup.object().shape({
  date: Yup.date().required('Date is required'),
  ticketId: Yup.number()
    .required('Ticket is required')
    .integer('Ticket must be an integer')
    .positive('Ticket must be positive'),
  num_adults: Yup.number()
    .required('Number of adults is required')
    .integer('Number of adults must be an integer')
    .min(0, 'Number of adults cannot be negative'),
  num_children: Yup.number()
    .required('Number of children is required')
    .integer('Number of children must be an integer')
    .min(0, 'Number of children cannot be negative'),
});

export default YupVisitSchema;