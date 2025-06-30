import { useState, useEffect } from "react";
import { Layout, Form, Button, Card, Statistic, Row, Col, Progress } from "antd";
import { 
  Edit, Trash2, Plus, Search, Users, Ticket, Calendar, 
  TrendingUp, Eye, DollarSign, Activity, Database
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Loading from "../../pages/Loading";
import * as api from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import { useUserRoles } from "../../hooks/useUserRoles";
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
} from "./ui/schemas";

import AdminSidebar from "../../components/admin/ui/AdminSidebar";
import AdminHeader from "../../components/admin/ui/AdminHeader";
import AdminTable from "../../components/admin/ui/AdminTable";
import AdminModal from "../../components/admin/ui/AdminModal";
import DashboardStats from "./DashboardStats";

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

export default function DashboardAdmin() {
  const { logout, user } = useAuth();
  const { roleNames } = useUserRoles();

  const [activeTab, setActiveTab] = useState("tickets");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form] = Form.useForm();

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
          species,  "conservation-status": conservationStatus,
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
        toast.error(`Error creating audit log entry: ${auditLogError?.message || auditLogError}`);
      }

    } catch (e) {
      toast.error(`No se pudo eliminar: ${e?.message || e}`);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

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
        apiCall = updateMap[type](item.id, payload);
      } else {
        apiCall = createMap[type](payload);
      }

      try {
        const result = await apiCall;

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
          return updatedData;
        });

        toast.success("Guardado");
        setFormVisible(false);
        setEditItem(null);
        form.resetFields();

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
          toast.error(`Error creating audit log entry: ${auditLogError?.message || auditLogError}`);
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
    data[activeTab]?.filter(row => searchTerm ?
      Object.values(row).some(v =>
        String(v).toLowerCase().includes(searchTerm),
      ) : true
    ) || [];

  /* --- columns for table --- */
  const columns = data[activeTab]?.[0]
    ? Object.keys(data[activeTab][0]).map(key => ({
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

  if (loading) return <Loading text="Cargando datos..." />;

  // Calcular estadísticas
  const stats = {
    totalUsers: data["user-profiles"]?.length || 0,
    totalTickets: data.tickets?.length || 0,
    totalAnimals: data.animals?.length || 0,
    totalVisits: data.visits?.length || 0,
  };

  const getTabTitle = (tabKey) => {
    const titles = {
      tickets: "Entradas",
      sections: "Secciones",
      habitats: "Hábitats",
      animals: "Animales",
      visits: "Visitas",
      orders: "Órdenes",
      species: "Especies",
      "conservation-status": "Estado de Conservación",
      provinces: "Provincias",
      "user-profiles": "Perfiles de Usuario",
      "audit-log": "Log de Auditoría"
    };
    return titles[tabKey] || tabKey;
  };

  return (
    <Layout className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <ToastNotifications />
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="bg-white shadow-xl border-r border-gray-200 w-64 p-0 flex flex-col">
          <AdminSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            logout={logout}
            user={user}
          />
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
            <AdminHeader
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              showModal={showModal}
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
              <div className="mb-8">
                <DashboardStats data={data} activeTab={activeTab} />
              </div>

              {/* User Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <Card className="bg-white shadow-lg border-0 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {user?.first_name?.charAt(0) || user?.username?.charAt(0) || 'A'}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {user?.first_name} {user?.last_name}
                        </h3>
                        <p className="text-gray-600">{user?.email}</p>
                        <div className="flex gap-2 mt-1">
                          {roleNames.map((role, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
                            >
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Última actividad</p>
                      <p className="text-sm font-medium text-gray-900">Hace 5 minutos</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Main Content Area */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
              >
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {getTabTitle(activeTab)}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        Gestiona los datos de {getTabTitle(activeTab).toLowerCase()}
                      </p>
                    </div>
                    <Button
                      type="primary"
                      icon={<Plus size={16} />}
                      onClick={() => showModal()}
                      className="bg-blue-600 hover:bg-blue-700 border-0 shadow-lg"
                      size="large"
                    >
                      Crear Nuevo
                    </Button>
                  </div>
                </div>

                <div className="p-6">
                  <AdminTable
                    columns={columns}
                    filteredRows={filteredRows}
                    handleDelete={handleDelete}
                    showModal={showModal}
                    activeTab={activeTab}
                    actionButtonClassName="rounded-full border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 shadow-sm transition-all duration-150"
                  />
                </div>
              </motion.div>
            </motion.div>
          </Content>
        </div>
      </div>

      {/* Modal */}
      <AdminModal
        formVisible={formVisible}
        setFormVisible={setFormVisible}
        editItem={editItem}
        handleSubmit={handleSubmit}
        form={form}
        data={data}
        modalClassName="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
        overlayClassName="bg-black/50 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
        buttonClassName="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold shadow-lg transition-all duration-150"
      />
    </Layout>
  );
}