import { useState, useEffect } from "react";
import { Layout, Form, Button, Card, Statistic, Row, Col, Progress, } from "antd";
import { Edit, Trash2, Plus, Search, Users, Ticket, Calendar, TrendingUp, Eye, DollarSign, Activity, Database, } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Loading from "@pages/Loading";
import * as api from "@api/api";
import { useAuth } from "@context/AuthContext";
import { useUserRoles } from "@hooks/useUserRoles";
import ToastNotifications from "@components/auth/forms/ToastNotifications";
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
} from "./ui/schemas";
import AdminHeader from "./ui/AdminHeader";
import DashboardStats from "./dashboard/DashboardStats";
import DashboardFilters from "./dashboard/DashboardFilters";
import DashboardTable from "./dashboard/DashboardTable";
import DashboardModal from "./dashboard/DashboardModal";
import DashboardSidebar from "./dashboard/DashboardSidebar";
import DashboardForm from "./dashboard/DashboardForm";
import "./dashboard/dashboard.css";
import ticketFormConfig from "./ui/forms/TicketFormConfig";
import animalFormConfig from "./ui/forms/AnimalFormConfig";
import habitatFormConfig from "./ui/forms/HabitatFormConfig";
import sectionFormConfig from "./ui/forms/SectionFormConfig";
import speciesFormConfig from "./ui/forms/SpeciesFormConfig";
import conservationStatusFormConfig from "./ui/forms/ConservationStatusFormConfig";
import visitFormConfig from "./ui/forms/VisitFormConfig";
import orderFormConfig from "./ui/forms/OrderFormConfig";
import provinceFormConfig from "./ui/forms/ProvinceFormConfig";
import userProfileFormConfig from "./ui/forms/UserProfileFormConfig";


const { Content } = Layout;

/* ----------------------- MAP DELETE ----------------------- */
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

  exhibits: api.deleteExhibit,
  exhibitsImgs: api.deleteImageExhibit,
};

/* ----------------------- MAP UPDATE ----------------------- */
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

  exhibits: api.updateExhibit,
};

/* ----------------------- MAP CREATE ----------------------- */
const createMap = {
  section: api.createSection,
  habitat: api.createHabitat,
  animal: api.createAnimal,
  ticket: api.createTicket,
  visit: api.createTicket,
  purchaseOrder: api.createPurchaseOrder,
  species: api.createSpecies,
  conservationStatus: api.createConservationStatus,
  province: api.createProvince,
  userProfile: api.createUserProfile,

  exhibits: api.createExhibit,
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
  exhibits: "exhibit",
};

// Mapeo de config y Yup por tab
const formConfigMap = {
  tickets: { config: ticketFormConfig, schema: YupTicketSchema },
  animals: { config: animalFormConfig, schema: YupAnimalSchema },
  habitats: { config: habitatFormConfig, schema: YupHabitatSchema },
  sections: { config: sectionFormConfig, schema: YupSectionSchema },
  species: { config: speciesFormConfig, schema: YupSpeciesSchema },
  "conservation-status": { config: conservationStatusFormConfig, schema: YupConservationStatusSchema },
  visits: { config: visitFormConfig, schema: YupVisitSchema },
  orders: { config: orderFormConfig, schema: YupOrderSchema },
  provinces: { config: provinceFormConfig, schema: YupProvinceSchema },
  "user-profiles": { config: userProfileFormConfig, schema: YupUserProfileSchema },
};

// --- Normaliza los valores iniciales para selects de FK ---
function normalizeInitialValues(item, activeTab) {
  // Configuración local para los campos de cada tab
  const FORM_CONFIGS = {
    tickets: [
      { name: "name", type: "input" },
      { name: "description", type: "textarea" },
      { name: "price", type: "number" },
      { name: "total_slots", type: "number" },
      { name: "currency", type: "select" },
    ],
    sections: [
      { name: "name", type: "input" },
    ],
    habitats: [
      { name: "name", type: "input" },
      { name: "nums_animals", type: "number" },
      { name: "description", type: "textarea" },
      { name: "section", type: "select" },
    ],
    animals: [
      { name: "name", type: "input" },
      { name: "age", type: "number" },
      { name: "species", type: "select" },
      { name: "conservation_status", type: "select" },
      { name: "habitat", type: "select" },
    ],
    visits: [
      { name: "day", type: "date" },
      { name: "total_slots", type: "number" },
    ],
    orders: [
      { name: "email", type: "input" },
      { name: "status", type: "select" },
      { name: "visit", type: "select" },
      { name: "user", type: "select" },
    ],
    species: [
      { name: "name", type: "input" },
      { name: "scientific_name", type: "input" },
      { name: "description", type: "textarea" },
      { name: "img", type: "file" },
    ],
    "conservation-status": [
      { name: "name", type: "select" },
    ],
    provinces: [
      { name: "name", type: "input" },
    ],
    "user-profiles": [
      { name: "user", type: "select" },
      { name: "province", type: "select" },
      { name: "phone", type: "input" },
      { name: "address", type: "input" },
      { name: "birth_date", type: "date" },
      { name: "profile_picture", type: "file" },
      { name: "bio", type: "textarea" },
    ],
    exhibits: [
      { name: "value", type: "input" },
      { name: "label", type: "input" },
      { name: "title", type: "input" },
    ],
  };
  const config = FORM_CONFIGS[activeTab] || [];
  const normalized = { ...item };
  config.forEach(field => {
    if (field.type === "select" && item[field.name]) {
      if (typeof item[field.name] === "object" && item[field.name] !== null && "id" in item[field.name]) {
        normalized[field.name] = item[field.name].id;
      }
      // Si el backend devuelve string pero el select espera número
      else if (typeof item[field.name] === "string" && !isNaN(Number(item[field.name]))) {
        normalized[field.name] = Number(item[field.name]);
      }
    }
  });
  return normalized;
}

export default function DashboardAdmin() {
  const { logout, user } = useAuth();
  const { roleNames } = useUserRoles();

  const [activeTab, setActiveTab] = useState("tickets");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          sections,
          habitats,
          animals,
          tickets,
          visits,
          orders,
          species,
          conservationStatus,
          provinces,
          userProfiles,
          auditLog,
          exhibits,
        ] = await Promise.all([
          api.getSections(),
          api.getHabitats(),
          api.getAnimals(),
          api.getTickets(),
          api.getVisits(),
          api.getPurchaseOrders(),
          api.getSpecies(),
          api.getConservationStatuses(),
          api.getProvinces(),
          api.getUsersProfiles(),
          api.getAuditLog(),
          api.getExhibits(),
        ]);

        setData({
          sections,
          habitats,
          animals,
          tickets,
          visits,
          orders,
          species,
          "conservation-status": conservationStatus,
          provinces,
          "user-profiles": userProfiles,
          "audit-log": auditLog,
          exhibits,
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
    setFormValues(normalizeInitialValues(item, tabKey));
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
      setData((prev) => ({
        ...prev,
        [tabKey]: prev[tabKey].filter((i) => i.id !== id),
      }));
      toast.success("Eliminado");

      // Create audit log entry for delete
      try {
        await api.createAuditLog({
          action: "delete",
          table_name: type,
          record_id: id,
          user: user.id,
        });
      } catch (auditLogError) {
        console.error("Error creating audit log entry:", auditLogError);
        toast.error(
          `Error creating audit log entry: ${auditLogError?.message || auditLogError}`
        );
      }
    } catch (e) {
      toast.error(`No se pudo eliminar: ${e?.message || e}`);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = formValues;
      console.log("Valores enviados:", values);
      // Select schema based on active tab
      let schema;
      const { item, tabKey } = editItem;
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
          // Aquí puedes mostrar los errores en el UI si lo deseas
          return;
        }
      }
      const hasFile = Object.values(values).some((v) => v instanceof File);
      const formData = new FormData();
      const plain = {};
      for (const [k, v] of Object.entries(values)) {
        if (v instanceof File) {
          formData.append(k, v);
        } else {
          plain[k] = v;
        }
      }
      const type = typeMap[tabKey];
      let apiCall;
      let payload = hasFile ? formData : plain;
      if (item?.id) {
        apiCall = updateMap[type](item.id, payload);
      } else {
        apiCall = createMap[type](payload);
      }
      try {
        const result = await apiCall;
        setData((prev) => {
          let updatedData;
          if (item?.id) {
            updatedData = {
              ...prev,
              [tabKey]: prev[tabKey].map((i) =>
                i.id === item.id ? { ...i, ...values } : i
              ),
            };
          } else {
            updatedData = {
              ...prev,
              [tabKey]: [...prev[tabKey], result],
            };
          }
          return updatedData;
        });
        toast.success("Guardado");
        setFormVisible(false);
        setEditItem(null);
        setFormValues({});
        // Create audit log entry for create/update
        try {
          await api.createAuditLog({
            action: item?.id ? "update" : "create",
            table_name: type,
            record_id: item?.id || result.id,
            user: user.id,
            old_values: item?.id ? item : null,
            new_values: values,
          });
        } catch (auditLogError) {
          console.error("Error creating audit log entry:", auditLogError);
          toast.error(
            `Error creating audit log entry: ${auditLogError?.message || auditLogError}`
          );
        }
      } catch (apiError) {
        console.error("API call failed:", apiError);
        toast.error(`Failed to save: ${apiError?.message || apiError}`);
      }
    } catch (validationError) {
      console.error("handleSubmit validation error:", validationError);
    }
  };

  const filteredRows =
    data[activeTab]?.filter((row) =>
      searchTerm
        ? Object.values(row).some((v) =>
            String(v).toLowerCase().includes(searchTerm)
          )
        : true
    ) || [];

  /* --- columns for table --- */
  const columns = data[activeTab]?.[0]
    ? Object.keys(data[activeTab][0]).map((key) => ({
        title: key,
        dataIndex: key,
        render: (val) =>
          typeof val === "string" || typeof val === "number"
            ? val
            : JSON.stringify(val),
      }))
    : [
        { title: "ID", dataIndex: "id" },
        { title: "Timestamp", dataIndex: "timestamp" },
        { title: "Action", dataIndex: "action" },
        { title: "Model", dataIndex: "model" },
        { title: "Record ID", dataIndex: "record_id" },
        { title: "Details", dataIndex: "details" },
        { title: "User", dataIndex: "user" },
      ];

  // Calcular estadísticas para DashboardStats
  const statsData = [
    {
      label: "Usuarios",
      value: data["user-profiles"]?.length || 0,
      icon: <Users size={22} />,
    },
    {
      label: "Entradas",
      value: data.tickets?.length || 0,
      icon: <Ticket size={22} />,
    },
    {
      label: "Animales",
      value: data.animals?.length || 0,
      icon: <Activity size={22} />,
    },
    {
      label: "Visitas",
      value: data.visits?.length || 0,
      icon: <Calendar size={22} />,
    },
  ];

  // Filtros de ejemplo para DashboardFilters
  const [filters, setFilters] = useState({
    dateRange: null,
    status: "",
    type: "",
  });

  const getTabTitle = (tabKey) => {
    const titles = {
      tickets: "Entrada",
      sections: "Sección",
      habitats: "Hábitat",
      animals: "Animal",
      visits: "Visita",
      orders: "Orden",
      species: "Especie",
      "conservation-status": "Estado de Conservación",
      provinces: "Provincia",
      "user-profiles": "Perfil de Usuario",
      "audit-log": "Log de Auditoría",
    };
    return titles[tabKey] || tabKey;
  };

  // handleCreate y handleEdit abren el modal
  const handleCreate = () => showModal({}, activeTab);
  const handleEdit = (item) => showModal(item, activeTab);
  const handleView = (item) => showModal(item, activeTab);

  if (loading) return <Loading text="Cargando datos..." />;

  return (
    <Layout className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <ToastNotifications />
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <DashboardSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          logout={logout}
          user={user}
          roleNames={roleNames}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-10">
            <AdminHeader
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onCreate={handleCreate}
              user={user}
            />
          </header>

          {/* Content */}
          <Content className="flex-1 p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-7xl mx-auto"
            >
              {/* Dashboard Stats */}
              <DashboardStats stats={statsData} />

              {/* Filtros avanzados */}
              <DashboardFilters
                filters={filters}
                setFilters={setFilters}
                activeTab={activeTab}
                onSearch={(searchTerm) => setSearchTerm(searchTerm)}
              />

              {/* Tabla avanzada */}
              <DashboardTable
                columns={columns}
                data={filteredRows}
                loading={loading}
                onEdit={handleEdit}
                onDelete={(row) => handleDelete(activeTab, row.id)}
                onView={handleView}
              />
            </motion.div>
          </Content>
        </div>
      </div>
      {/* Modal avanzado restaurado */}
      <DashboardModal
        open={formVisible}
        onClose={() => {
          setFormVisible(false);
          setEditItem(null);
          setFormValues({});
        }}
        title={
          editItem?.item?.id
            ? `Editar ${getTabTitle(activeTab)}`
            : `Crear ${getTabTitle(activeTab)}`
        }
        onOk={handleSubmit}
        loading={loading}
      >
        <DashboardForm
          activeTab={activeTab}
          formValues={formValues}
          setFormValues={setFormValues}
          initialValues={editItem?.item || {}}
        />
      </DashboardModal>
    </Layout>
  );
}