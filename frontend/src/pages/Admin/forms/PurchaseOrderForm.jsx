import { useState, useEffect } from "react";
import { createPurchaseOrder, updatePurchaseOrder } from "../../../api/purchaseOrders";
import { getVisits } from "../../../api/visits";
import { getUsers } from "../../../api/users";
import FormWrapper from "./FormWrapper";

export default function PurchaseOrderForm({
    mode,
    initialData,
    onCreate,
    onUpdate,
    onCancel,
}) {
  const [visitsList, setVisitsList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [formData, setFormData] = useState({
    total_amount: "",
    email: "",
    total_price: "",
    quantity: "",
    qr_image: null,
    id_visit: "",
    id_user: ""
  });

  useEffect(() => {
    const fetchOptions = async () => {
      setVisitsList(await getVisits());
      setUsersList(await getUsers());
    };
    fetchOptions();
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (e.target.type === "file") {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        dataToSend.append(key, value);
      }
    });
    if (mode === "create") {
        onCreate(dataToSend);
    } else {
        onUpdate(initialData.id, dataToSend);
    }
  };

  return (
    <>
      <FormWrapper
        title={mode === "create" ? "Crear Orden de Compra" : "Editar Orden de Compra"}
        onSubmit={handleSubmit}
        formData={formData}
        onChange={handleChange}
        fields={[
          { name: "total_amount", label: "Monto Total", type: "number" },
          { name: "email", label: "Correo", type: "email" },
          { name: "total_price", label: "Precio Total", type: "number" },
          { name: "quantity", label: "Cantidad", type: "number" },
          { name: "qr_image", label: "Imagen QR", type: "file" },
          { name: "id_visit", label: "Visita", type: "select", options: visitsList, optionLabel: "day", optionValue: "id" },
          { name: "id_user", label: "Usuario", type: "select", options: usersList, optionLabel: "username", optionValue: "id" }
        ]}
      />
      <button onClick={onCancel}>Cancel</button>
    </>
  );
}
