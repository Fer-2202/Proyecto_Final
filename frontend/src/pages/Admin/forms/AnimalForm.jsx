import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createAnimal, updateAnimal, getAnimalById } from "../../../api/animals";
import { getSpecies } from "../../../api/species";
import { getConservationStatuses } from "../../../api/conservationStatus";
import { getHabitats } from "../../../api/habitats";
import FormWrapper from "./FormWrapper";

export default function AnimalForm({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [speciesList, setSpeciesList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [habitatsList, setHabitatsList] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    id_species: "",
    id_conservation_status: "",
    id_habitats: ""
  });

  useEffect(() => {
    const fetchOptions = async () => {
      setSpeciesList(await getSpecies());
      setStatusList(await getConservationStatuses());
      setHabitatsList(await getHabitats());
    };
    fetchOptions();

    if (mode === "edit") {
      const fetchData = async () => {
        const animal = await getAnimalById(id);
        setFormData(animal);
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
      await createAnimal(formData);
    } else {
      await updateAnimal(id, formData);
    }
    navigate("/admin");
  };

  return (
    <FormWrapper
      title={mode === "create" ? "Crear Animal" : "Editar Animal"}
      onSubmit={handleSubmit}
      formData={formData}
      onChange={handleChange}
      fields={[
        { name: "name", label: "Nombre" },
        { name: "age", label: "Edad", type: "number" },
        { name: "id_species", label: "Especie", type: "select", options: speciesList, optionLabel: "name", optionValue: "id" },
        { name: "id_conservation_status", label: "Estado de conservación", type: "select", options: statusList, optionLabel: "name", optionValue: "id" },
        { name: "id_habitats", label: "Hábitat", type: "select", options: habitatsList, optionLabel: "name", optionValue: "id" }
      ]}
    />
  );
}
