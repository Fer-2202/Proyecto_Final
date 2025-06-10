import { useState, useEffect } from "react";
import { createConservationStatus, updateConservationStatus } from "../../../api/conservationStatus";
import FormWrapper from "./FormWrapper";

export default function ConservationStatusForm({
    mode,
    initialData,
    onCreate,
    onUpdate,
    onCancel,
}) {
  const STATUS_CHOICES = [
    { value: "LC", label: "Least Concern" },
    { value: "NT", label: "Near Threatened" },
    { value: "VU", label: "Vulnerable" },
    { value: "EN", label: "Endangered" },
    { value: "CR", label: "Critically Endangered" },
    { value: "EW", label: "Extinct in the Wild" },
    { value: "EX", label: "Extinct" }
  ];
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
        title={mode === "create" ? "Crear Estado de Conservación" : "Editar Estado de Conservación"}
        onSubmit={handleSubmit}
        formData={formData}
        onChange={handleChange}
        fields={[
          {
            name: "name",
            label: "Estado de Conservación",
            type: "select",
            options: STATUS_CHOICES,
            optionLabel: "label",
            optionValue: "value"
          }
        ]}
      />
       <button onClick={onCancel}>Cancel</button>
    </>
  );
}
