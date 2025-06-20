import { useState, useEffect } from "react";
import { createTicket, updateTicket } from "../../../api/tickets";
import FormWrapper from "./FormWrapper";

export default function TicketForm({
    mode,
    initialData,
    onCreate,
    onUpdate,
    onCancel,
}) {
  const [formData, setFormData] = useState({
    price: "",
    name: "",
    description: ""
  });

  useEffect(() => {
   
    if (initialData) {
     
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'price' ? parseFloat(value) : value;
    setFormData(prev => ({ ...prev, [name]: newValue }));
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
        title={mode === "create" ? "Crear Ticket" : "Editar Ticket"}
        onSubmit={handleSubmit}
        formData={formData}
        onChange={handleChange}
        fields={[
          { name: "price", label: "Precio", type: "number" },
          { name: "name", label: "Nombre" },
          { name: "description", label: "Descripción", type: "textarea" }
        ]}
      />
       <button onClick={onCancel}>Cancel</button>
    </>
  );
}
