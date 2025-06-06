import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createProvince, updateProvince, getProvinceById } from "../../../api/provinces";
import FormWrapper from "./FormWrapper";

export default function ProvinceForm({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: ""
  });

  useEffect(() => {
    if (mode === "edit") {
      const fetchData = async () => {
        const province = await getProvinceById(id);
        setFormData(province);
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
      await createProvince(formData);
    } else {
      await updateProvince(id, formData);
    }
    navigate("/admin");
  };

  return (
    <FormWrapper
      title={mode === "create" ? "Crear Provincia" : "Editar Provincia"}
      onSubmit={handleSubmit}
      formData={formData}
      onChange={handleChange}
      fields={[
        { name: "name", label: "Nombre de la Provincia" }
      ]}
    />
  );
}
