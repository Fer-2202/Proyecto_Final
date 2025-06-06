import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createHabitat, updateHabitat, getHabitatById } from "../../../api/habitats";
import { getSections } from "../../../api/sections";
import FormWrapper from "./FormWrapper";

export default function HabitatForm({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
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

    if (mode === "edit") {
      const fetchData = async () => {
        const habitat = await getHabitatById(id);
        setFormData(habitat);
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
      await createHabitat(formData);
    } else {
      await updateHabitat(id, formData);
    }
    navigate("/admin");
  };

  return (
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
  );
}
