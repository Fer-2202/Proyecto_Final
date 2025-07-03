import * as Yup from "yup";

const YupTicketSchema = Yup.object().shape({
  name: Yup.string()
    .required("El nombre es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(30, "El nombre no puede tener más de 30 caracteres"),
  description: Yup.string().required("La descripción es requerida"),
  price: Yup.number()
    .required("El precio es requerido")
    .positive("El precio debe ser positivo"),
  total_slots: Yup.number()
    .required("El total de espacios es requerido")
    .integer("El total de espacios debe ser un número entero")
    .min(0, "El total de espacios no puede ser negativo"),
  currency: Yup.string()
    .required("La moneda es requerida")
    .oneOf(["CRC", "USD"], "Moneda inválida"),
});

export default YupTicketSchema;