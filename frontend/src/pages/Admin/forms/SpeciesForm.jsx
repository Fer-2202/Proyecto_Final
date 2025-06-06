import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createSpecies, updateSpecies, getSpeciesById } from "../../../api/species";
import FormWrapper from "./FormWrapper";

export default function SpeciesForm({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: ""
  });

  useEffect(() => {
    if (mode === "edit") {
      const fetchData = async () => {
        const species = await getSpeciesById(id);
        setFormData(species);
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
      await createSpecies(formData);
    } else {
      await updateSpecies(id, formData);
    }
    navigate("/admin");
  };

  return (
    <FormWrapper
      title={mode === "create" ? "Crear Especie" : "Editar Especie"}
      onSubmit={handleSubmit}
      formData={formData}
      onChange={handleChange}
      fields={[
        { name: "name", label: "Nombre de la Especie" }
      ]}
    />
  );
}
