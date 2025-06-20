import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ProvinceForm from '../forms/ProvinceForm'
import * as api from './../../../api/api'

function ProvincesEditPage() {
 const { id } = useParams()
 const navigate = useNavigate()
 const [initialData, setInitialData] = useState(null)

 useEffect(() => {
  api.getProvinceById(id).then(setInitialData)
 }, [id]);

const handleUpdate = async (id, data) => {
    await api.updateAnimal(id, data);
    navigate("/admin/dashboard");
  };

  return initialData ?(
    <ProvinceForm
    mode='edit'
    initialData={initialData}
    onUpdate={handleUpdate}
    onCancel={() => navigate('/admin/dashboard')} />
  ) : <div>Cargando...</div>
}

export default ProvincesEditPage