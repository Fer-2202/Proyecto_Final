import { useState, useEffect } from "react";
import { createVisit, updateVisit } from "../../../api/visits";
import FormWrapper from "./FormWrapper";

export default function VisitForm({
    mode,
    initialData,
    onCreate,
    onUpdate,
    onCancel,
}) {
  const [formData, setFormData] = useState({
    day: "",
    total_slots: "",
    occupied_slots: ""
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
        title={mode === "create" ? "Crear Visita" : "Editar Visita"}
        onSubmit={handleSubmit}
        formData={formData}
        onChange={handleChange}
        fields={[
          { name: "day", label: "Fecha de la Visita", type: "date" },
          { name: "total_slots", label: "Cupos Totales", type: "number" },
          { name: "occupied_slots", label: "Cupos Ocupados", type: "number" }
        ]}
      />
       <button onClick={onCancel}>Cancel</button>
    </>
  );
}
