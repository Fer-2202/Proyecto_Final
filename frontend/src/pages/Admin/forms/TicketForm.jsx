import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createTicket, updateTicket, getTicketById } from "../../../api/tickets";
import FormWrapper from "./FormWrapper";

export default function TicketForm({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    price: "",
    name: "",
    description: ""
  });

  useEffect(() => {
    if (mode === "edit") {
      const fetchData = async () => {
        const ticket = await getTicketById(id);
        setFormData(ticket);
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
      await createTicket(formData);
    } else {
      await updateTicket(id, formData);
    }
    navigate("/admin");
  };

  return (
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
  );
}
