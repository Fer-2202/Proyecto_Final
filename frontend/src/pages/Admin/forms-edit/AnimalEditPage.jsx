import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AnimalForm from "../forms/AnimalForm";
import * as api from "../../../api/api";

function AnimalEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    api.getAnimalById(id).then(setInitialData);
  }, [id]);

  const handleUpdate = async (id, data) => {
    await api.updateAnimal(id, data);
    navigate("/admin/dashboard");
  };

  return initialData ? (
    <AnimalForm
      mode="edit"
      initialData={initialData}
      onUpdate={handleUpdate}
      onCancel={() => navigate("/admin/dashboard")}
    />
  ) : <div>Cargando...</div>;
} 

export default AnimalEditPage