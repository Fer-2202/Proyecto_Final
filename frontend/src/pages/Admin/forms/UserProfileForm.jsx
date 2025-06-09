import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createUserProfile, updateUserProfile, getUserProfileById } from "../../../api/userProfile";
import { getProvinces } from "../../../api/provinces";
import { getRoles } from "../../../api/roles"; // Endpoint para traer los grupos (roles)
import { getUsers } from "../../../api/users";
import FormWrapper from "./FormWrapper";

export default function UserProfileForm({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();

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

    if (mode === "edit") {
      const fetchData = async () => {
        if (id) { // Only fetch if id is defined
          const profile = await getUserProfileById(id);
          // Ajuste para roles (M2M)
          profile.roles = profile.roles?.map(role => role.id) || [];
          setFormData(profile);
        }
      };
      fetchData();
    }
  }, [id, mode]);

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
      await createUserProfile(dataToSend);
    } else {
      await updateUserProfile(id, dataToSend);
    }
    navigate("/admin/dashboard");
  };

  return (
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
  );
}
