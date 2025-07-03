const orderFormConfig = [
  { name: "email", label: "Email", type: "text", required: true },
  { name: "status", label: "Estado", type: "select", required: true, options: [
    { value: "PENDING", label: "Pendiente" },
    { value: "PAID", label: "Pagado" },
    { value: "CANCELLED", label: "Cancelado" },
    { value: "FAILED", label: "Fallido" },
  ] },
  { name: "visit", label: "Visita", type: "select", required: true, options: [] },
  { name: "user", label: "Usuario", type: "select", required: true, options: [] },
];

export default orderFormConfig;