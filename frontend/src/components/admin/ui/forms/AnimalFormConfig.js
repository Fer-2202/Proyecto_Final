const animalFormConfig = [
  { name: "name", label: "Nombre", type: "text", required: true },
  {
    name: "speciesId",
    label: "Especie",
    type: "select",
    required: true,
    options: [], // Options will be fetched dynamically
  },
  {
    name: "habitatId",
    label: "Hábitat",
    type: "select",
    required: true,
    options: [], // Options will be fetched dynamically
  },
  {
    name: "sectionId",
    label: "Sección",
    type: "select",
    required: true,
    options: [], // Options will be fetched dynamically
  },
  { name: "description", label: "Descripción", type: "text", required: false },
];

export default animalFormConfig;