const animalFormConfig = [
  { name: "name", label: "Nombre", type: "text", required: true },
  { name: "age", label: "Edad", type: "number", required: true },
  { name: "species", label: "Especie", type: "select", required: true, options: [] },
  { name: "conservation_status", label: "Estado de Conservación", type: "select", required: true, options: [] },
  { name: "habitat", label: "Hábitat", type: "select", required: true, options: [] },
];

export default animalFormConfig;