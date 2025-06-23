import { useState, useEffect } from "react";
import { Layout, Form, Button } from "antd";
import { Edit, Trash2 } from "lucide-react"
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Loading from "../Loading";
import * as api from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import ToastNotifications from "../../components/auth/forms/ToastNotifications";
import {
  YupTicketSchema,
  YupSectionSchema,
  YupHabitatSchema,
  YupAnimalSchema,
  YupVisitSchema,
  YupOrderSchema,
  YupSpeciesSchema,
  YupConservationStatusSchema,
  YupProvinceSchema,
  YupUserProfileSchema,
} from "./../../components/admin/ui/schemas";

import AdminSidebar from "../../components/admin/ui/AdminSidebar";
import AdminHeader from "../../components/admin/ui/AdminHeader";
import AdminTable from "../../components/admin/ui/AdminTable";
import AdminModal from "../../components/admin/ui/AdminModal";

const { Content } = Layout;

/* ----------------------- MAPS ----------------------- */
const deleteMap = {
  section: api.deleteSection,
  habitat: api.deleteHabitat,
  animal: api.deleteAnimal,
  ticket: api.deleteTicket,
  visit: api.deleteVisit,
  purchaseOrder: api.deletePurchaseOrder,
  species: api.deleteSpecies,
  conservationStatus: api.deleteConservationStatus,
  province: api.deleteProvince,
  userProfile: api.deleteUserProfile,
};

const updateMap = {
  section: api.updateSection,
  habitat: api.updateHabitat,
  animal: api.updateAnimal,
  ticket: api.updateTicket,
  visit: api.updateVisit,
  purchaseOrder: api.updatePurchaseOrder,
  species: api.updateSpecies,
  conservationStatus: api.updateConservationStatus,
  province: api.updateProvince,
  userProfile: api.updateUserProfile,
};

const createMap = {
  section: api.createSection,
  habitat: api.createHabitat,
  animal: api.createAnimal,
  ticket: api.createTicket,
  visit: api.createVisit,
  purchaseOrder: api.createPurchaseOrder,
  species: api.createSpecies,
  conservationStatus: api.createConservationStatus,
  province: api.createProvince,
  userProfile: api.createUserProfile,
};

const typeMap = {
  tickets: "ticket",
  sections: "section",
  habitats: "habitat",
  animals: "animal",
  visits: "visit",
  orders: "purchaseOrder",
  species: "species",
  "conservation-status": "conservationStatus",
  provinces: "province",
  "user-profiles": "userProfile",
  "audit-log": "auditLog",
};

/* -------------------- COMPONENT -------------------- */
export default function DashboardAdmin() {
  const { logout, user } = useAuth();

  /* --- state --- */
  const [activeTab, setActiveTab] = useState("tickets");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form] = Form.useForm();

  /* --- initial data --- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          sections, habitats, animals, tickets, visits, orders,
          species, conservationStatus, provinces, userProfiles, auditLog,
        ] = await Promise.all([
          api.getSections(), api.getHabitats(), api.getAnimals(),
          api.getTickets(), api.getVisits(), api.getPurchaseOrders(),
          api.getSpecies(), api.getConservationStatuses(),
          api.getProvinces(), api.getUsersProfiles(), api.getAuditLog(),
        ]);

        setData({
          sections, habitats, animals, tickets, visits, orders,
          species, "conservation-status": conservationStatus,
          provinces, "user-profiles": userProfiles, "audit-log": auditLog,
        });
      } catch (e) {
        toast.error(`Error al cargar datos: ${e?.message || e}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  /* --- helpers --- */
  const showModal = (item = {}, tabKey = activeTab) => {
    setEditItem({ item, tabKey });
    setFormVisible(true);
    form.setFieldsValue(item);
  };

  const handleDelete = async (tabKey, id) => {
    const type = typeMap[tabKey];
    const ok = await Swal.fire({
      title: "¿Eliminar?",
      text: `Esta acción eliminará el ${type}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (!ok.isConfirmed) return;

    try {
      await deleteMap[type](id);
      setData(prev => ({
        ...prev,
        [tabKey]: prev[tabKey].filter(i => i.id !== id),
      }));
      toast.success("Eliminado");
    } catch (e) {
      toast.error(`No se pudo eliminar: ${e?.message || e}`);
    }
  };

 const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
       console.log("Form values:", values);

      // Select schema based on active tab
      let schema;
      const { item, tabKey } = editItem
      switch (tabKey) {
        case "tickets":
          schema = YupTicketSchema;
          break;
        case "sections":
          schema = YupSectionSchema;
          break;
        case "habitats":
          schema = YupHabitatSchema;
          break;
        case "animals":
          schema = YupAnimalSchema;
          break;
        case "visits":
          schema = YupVisitSchema;
          break;
        case "orders":
          schema = YupOrderSchema;
          break;
        case "species":
          schema = YupSpeciesSchema;
          break;
        case "conservation-status":
          schema = YupConservationStatusSchema;
          break;
        case "provinces":
          schema = YupProvinceSchema;
          break;
        case "user-profiles":
          schema = YupUserProfileSchema;
          break;
        default:
          schema = null;
      }

      if (schema) {
        try {
          await schema.validate(values, { abortEarly: false });
        } catch (yupError) {
          console.error("Yup validation error:", yupError);
          yupError.inner.forEach(error => {
            console.log("Errorpath:", error.message);
            console.log("Error message:", error.message);
            form.setFields([{ name: error.path, errors: [error.message] }]);
          });
          return;
        }
      }

      const hasFile = Object.values(values).some(v => v?.file);
      const formData = new FormData();
      const plain = {};

      for (const [k, v] of Object.entries(values)) {
        if (v?.file) {
          formData.append(k, v.file.originFileObj);
        } else {
          plain[k] = v;
        }
      }

      const type = typeMap[tabKey];
      let apiCall;
      let payload = hasFile ? formData : plain;

      if (item?.id) {
        console.log(`Updating ${type} with ID: ${item.id} and payload:`, payload);
        apiCall = updateMap[type](item.id, payload);
      } else {
        console.log(`Creating ${type} with payload:`, payload);
        apiCall = createMap[type](payload);
      }

      console.log("Calling API:", apiCall);

      try {
        const result = await apiCall;
        console.log("API call successful, result:", result);

        setData(prev => {
          let updatedData;
          if (item?.id) {
            updatedData = {
              ...prev,
              [tabKey]: prev[tabKey].map(i => (i.id === item.id ? { ...i, ...values } : i)),
            };
          } else {
            updatedData = {
              ...prev,
              [tabKey]: [...prev[tabKey], result],
            };
          }
          console.log("Updated data:", updatedData);
          return updatedData;
        });

        toast.success("Guardado");
        setFormVisible(false);
        setEditItem(null);
        form.resetFields();
      } catch (apiError) {
        console.error("API call failed:", apiError);
        toast.error(`Failed to save: ${apiError?.message || apiError}`);
      }
    } catch (validationError) {
      console.error("handleSubmit validation error:", validationError);
      // handled by Ant Design form
    }
  };

  const filteredRows =
    data[activeTab]?.filter(row =>
      Object.values(row).some(v =>
        String(v).toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    ) || [];

  /* --- columns for table --- */
  const columns = [
    ...(data[activeTab]?.[0]
      ? Object.keys(data[activeTab][0]).map(key => ({
          title: key,
          dataIndex: key,
          render: val =>
            typeof val === "string" || typeof val === "number"
              ? val
              : JSON.stringify(val),
        }))
      : []),
    {
      title: "Acciones",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            icon={<Edit size={14} />}
            size="small"
            onClick={() => showModal(record, activeTab)}
          />
          <Button
            icon={<Trash2 size={14} />}
            size="small"
            danger
            onClick={() => handleDelete(activeTab, record.id)}
          />
        </div>
      ),
    },
  ];

  if (loading) return <Loading text="Cargando datos..." />;

  /* --------------------------- JSX --------------------------- */
 return (
  <Layout className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
    <ToastNotifications />
    <div className="flex min-h-screen">
      <aside className="bg-white shadow-lg border-r border-blue-100 w-64 p-0 flex flex-col">
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          logout={logout}
          user={user}
        />
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-blue-100 shadow-sm px-8 py-4">
          <AdminHeader
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            showModal={showModal}
          />
        </header>
        <Content className="flex-1 flex flex-col items-center justify-start p-8">
          <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl p-10 mt-8 border border-blue-100">
            <AdminTable
              columns={columns}
              filteredRows={filteredRows}
              handleDelete={handleDelete}
              showModal={showModal}
              actionButtonClassName="rounded-full border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 shadow-sm transition-all duration-150"
            />
          </div>
        </Content>
      </div>
    </div>
    <AdminModal
      formVisible={formVisible}
      setFormVisible={setFormVisible}
      editItem={editItem}
      handleSubmit={handleSubmit}
      form={form}
      data={data}
        modalClassName="bg-white rounded-2xl shadow-2xl p-8 border border-blue-100"
        overlayClassName="bg-blue-900/40 fixed inset-0 z-40 flex items-center justify-center"
        buttonClassName="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 font-semibold shadow transition-all duration-150"
    />
  </Layout>
);
};