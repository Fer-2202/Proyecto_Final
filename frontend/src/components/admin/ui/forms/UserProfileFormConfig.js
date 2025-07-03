const userProfileFormConfig = [
  { name: "user", label: "Usuario", type: "select", required: true, options: [] },
  { name: "province", label: "Provincia", type: "select", required: false, options: [] },
  { name: "phone", label: "Teléfono", type: "text", required: false },
  { name: "address", label: "Dirección", type: "text", required: false },
  { name: "birth_date", label: "Fecha de nacimiento", type: "date", required: false },
  { name: "profile_picture", label: "Foto de perfil", type: "file", required: false },
  { name: "bio", label: "Biografía", type: "textarea", required: false },
];

export default userProfileFormConfig;