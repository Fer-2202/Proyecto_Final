import * as Yup from "yup";

const YupTicketSchema = Yup.object().shape({
  title: Yup.string()
    .required("El título es requerido")
    .min(2, "El título debe tener al menos 2 caracteres")
    .max(50, "El título no puede tener más de 50 caracteres"),
  description: Yup.string().required("La descripción es requerida"),
  price: Yup.number()
    .required("El precio es requerido")
    .positive("El precio debe ser positivo"),
  stock: Yup.number()
    .required("El stock es requerido")
    .integer("El stock debe ser un número entero")
    .min(0, "El stock no puede ser negativo"),
});

export default YupTicketSchema;