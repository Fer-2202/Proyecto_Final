import { useState, useEffect } from "react";
import { createSection, updateSection } from "../../../api/sections";
import FormWrapper from "./FormWrapper";

export default function SectionForm({
  mode,
  initialData,
  onCreate,
  onUpdate,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    name: "",
    num_habitats: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === "create") {
      onCreate(formData);
    } else {
      onUpdate(initialData.id, formData);
    }
  };

  return (
    <>
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
      <button onClick={onCancel}>Cancel</button>
    </>
  );
}
