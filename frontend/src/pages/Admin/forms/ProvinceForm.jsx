import { useState, useEffect } from "react";
import { createProvince, updateProvince } from "../../../api/provinces";
import FormWrapper from "./FormWrapper";

export default function ProvinceForm({
    mode,
    initialData,
    onCreate,
    onUpdate,
    onCancel,
}) {
  const [formData, setFormData] = useState({
    name: ""
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
        title={mode === "create" ? "Crear Provincia" : "Editar Provincia"}
        onSubmit={handleSubmit}
        formData={formData}
        onChange={handleChange}
        fields={[
          { name: "name", label: "Nombre de la Provincia" }
        ]}
      />
       <button onClick={onCancel}>Cancel</button>
    </>
  );
}
