const ticketFormConfig = [
  {
    name: "name",
    label: "Nombre",
    type: "text",
    required: true,
  },
  {
    name: "description",
    label: "Descripción",
    type: "text",
    required: true,
  },
  {
    name: "price",
    label: "Precio",
    type: "number",
    required: true,
  },
  {
    name: "total_slots",
    label: "Cupos totales",
    type: "number",
    required: true,
  },
  {
    name: "currency",
    label: "Moneda",
    type: "select",
    required: true,
    options: [
      { value: "CRC", label: "Colones" },
      { value: "USD", label: "Dólares" },
    ],
  },
];

export default ticketFormConfig;