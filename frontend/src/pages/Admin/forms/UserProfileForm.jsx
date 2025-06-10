import { useState, useEffect } from "react";
import { createUserProfile, updateUserProfile } from "../../../api/userProfile";
import { getProvinces } from "../../../api/provinces";
import { getRoles } from "../../../api/roles"; // Endpoint para traer los grupos (roles)
import { getUsers } from "../../../api/users";
import FormWrapper from "./FormWrapper";

export default function UserProfileForm({
    mode,
    initialData,
    onCreate,
    onUpdate,
    onCancel,
}) {
  const [provincesList, setProvincesList] = useState([]);
  const [groupsList, setGroupsList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [formData, setFormData] = useState({
    user: "",
    phone: "",
    address: "",
    birth_date: "",
    email: "",
    profile_picture: null,
    bio: "",
    roles: [],
    province: ""
  });

  useEffect(() => {
    const fetchOptions = async () => {
      setProvincesList(await getProvinces());
      setGroupsList(await getRoles());
      setUsersList(await getUsers());
    };
    fetchOptions();
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (e.target.type === "file") {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else if (e.target.multiple) {
      const selected = Array.from(e.target.selectedOptions, option => option.value);
      setFormData(prev => ({ ...prev, [name]: selected }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "roles") {
        value.forEach(val => dataToSend.append("roles", val));
      } else if (value !== null && value !== undefined) {
        dataToSend.append(key, value);
      }
    });
    if (mode === "create") {
        onCreate(dataToSend);
    } else {
        onUpdate(initialData.id, dataToSend);
    }
  };

  return (
    <>
      <FormWrapper
        title={mode === "create" ? "Crear Perfil de Usuario" : "Editar Perfil de Usuario"}
        onSubmit={handleSubmit}
        formData={formData}
        onChange={handleChange}
        fields={[
          { name: "user", label: "Usuario", type: "select", options: usersList, optionLabel: "username", optionValue: "id" },
          { name: "phone", label: "Teléfono" },
          { name: "address", label: "Dirección" },
          { name: "birth_date", label: "Fecha de Nacimiento", type: "date" },
          { name: "email", label: "Correo", type: "email" },
          { name: "profile_picture", label: "Foto de Perfil", type: "file" },
          { name: "bio", label: "Biografía", type: "textarea" },
          { name: "roles", label: "Roles", type: "multiselect", options: groupsList, optionLabel: "name", optionValue: "id" },
          { name: "province", label: "Provincia", type: "select", options: provincesList, optionLabel: "name", optionValue: "id" }
        ]}
      />
       <button onClick={onCancel}>Cancel</button>
    </>
  );
}
