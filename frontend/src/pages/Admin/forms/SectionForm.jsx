import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createSection, updateSection, getSectionById } from "../../../api/sections";
import FormWrapper from "./FormWrapper";

export default function SectionForm({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    num_habitats: ""
  });

  useEffect(() => {
    if (mode === "edit") {
      const fetchData = async () => {
        const section = await getSectionById(id);
        setFormData(section);
      };
      fetchData();
    }
  }, [id, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === "create") {
      await createSection(formData);
    } else {
      await updateSection(id, formData);
    }
    navigate("/admin/dashboard");
  };

  return (
    <FormWrapper
      title={mode === "create" ? "Crear Sección" : "Editar Sección"}
      onSubmit={handleSubmit}
      formData={formData}
      onChange={handleChange}
      fields={[
        { name: "name", label: "Nombre" },
        { name: "num_habitats", label: "Número de Hábitats", type: "number" }
      ]}
    />
  );
}
