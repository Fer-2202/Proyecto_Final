const conservationStatusFormConfig = [
  { name: "name", label: "Estado", type: "select", required: true, options: [
    { value: "LC", label: "Least Concern" },
    { value: "NT", label: "Near Threatened" },
    { value: "VU", label: "Vulnerable" },
    { value: "EN", label: "Endangered" },
    { value: "CR", label: "Critically Endangered" },
    { value: "EW", label: "Extinct in the Wild" },
    { value: "EX", label: "Extinct" },
  ] },
];

export default conservationStatusFormConfig;