import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createVisit, updateVisit, getVisitById } from "../../../api/visits";
import FormWrapper from "./FormWrapper";

export default function VisitForm({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    day: "",
    total_slots: "",
    occupied_slots: ""
  });

  useEffect(() => {
    if (mode === "edit") {
      const fetchData = async () => {
        const visit = await getVisitById(id);
        setFormData(visit);
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
      await createVisit(formData);
    } else {
      await updateVisit(id, formData);
    }
    navigate("/admin/dashboard");
  };

  return (
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
  );
}
