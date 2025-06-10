import { useState, useEffect } from "react";
import { createHabitat, updateHabitat } from "../../../api/habitats";
import { getSections } from "../../../api/sections";
import FormWrapper from "./FormWrapper";

export default function HabitatForm({
    mode,
    initialData,
    onCreate,
    onUpdate,
    onCancel,
}) {
  const [sectionsList, setSectionsList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    nums_animals: "",
    description: "",
    id_section: ""
  });

  useEffect(() => {
    const fetchOptions = async () => {
      setSectionsList(await getSections());
    };
    fetchOptions();
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
        title={mode === "create" ? "Crear Hábitat" : "Editar Hábitat"}
        onSubmit={handleSubmit}
        formData={formData}
        onChange={handleChange}
        fields={[
          { name: "name", label: "Nombre" },
          { name: "nums_animals", label: "Número de Animales", type: "number" },
          { name: "description", label: "Descripción", type: "textarea" },
          { name: "id_section", label: "Sección", type: "select", options: sectionsList, optionLabel: "name", optionValue: "id" }
        ]}
      />
      <button onClick={onCancel}>Cancel</button>
    </>
  );
}
