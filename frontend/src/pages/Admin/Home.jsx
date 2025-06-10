import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Ticket, 
  Calendar, 
  Settings, 
  LogOut, 
  Eye,
  Plus,
  Search,
  Trash2,
  Edit,
  Globe,
  Fish,
  ShoppingCart,
  UserRound,
  Star,
  Landmark
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import * as api from "../../api/api";
import AnimalForm from "./forms/AnimalForm";
import SectionForm from "./forms/SectionForm";
import HabitatForm from "./forms/HabitatForm";
import TicketForm from "./forms/TicketForm";
import PurchaseOrderForm from "./forms/PurchaseOrderForm";
import SpeciesForm from "./forms/SpeciesForm";
import ConservationStatusForm from "./forms/ConservationStatusForm";
import ProvinceForm from "./forms/ProvinceForm";
import UserProfileForm from "./forms/UserProfileForm";
import VisitForm from "./forms/VisitForm";
import { useNotification } from '../../context/NotificationContext';

const CRUD_TABS = [
  { name: "Entradas", key: "tickets", icon: <Ticket size={16} /> },
  { name: "Secciones", key: "sections", icon: <LayoutDashboard size={16} /> },
  { name: "Hábitats", key: "habitats", icon: <Globe size={16} /> },
  { name: "Animales", key: "animals", icon: <Fish size={16} /> },
  { name: "Visitas", key: "visits", icon: <Calendar size={16} /> },
  { name: "Órdenes", key: "orders", icon: <ShoppingCart size={16} /> },
  { name: "Especies", key: "species", icon: <Star size={16} /> },
  { name: "Estado de conservación", key: "conservation-status", icon: <Settings size={16} /> },
  { name: "Provincias", key: "provinces", icon: <Landmark size={16} /> },
  { name: "Perfiles de usuario", key: "user-profiles", icon: <Users size={16} /> }
];

const typeMap = {
  "tickets": "ticket",
  "sections": "section",
  "habitats": "habitat",
  "animals": "animal",
  "visits": "visit",
  "orders": "purchaseOrder",
  "species": "species",
  "conservation-status": "conservationStatus",
  "provinces": "province",
  "user-profiles": "userProfile"
};

export default function DashboardAdmin() {
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState("tickets");
  const [data, setData] = useState({
    sections: [],
    habitats: [],
    animals: [],
    tickets: [],
    visits: [],
    orders: [],
    species: [],
    "conservation-status": [],
    provinces: [],
    "user-profiles": []
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const { showNotification } = useNotification();
  const navigate = useNavigate();

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
          userProfiles
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
          api.getUsersProfiles()
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
          "user-profiles": userProfiles
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        showNotification("Error fetching data", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const handleCreate = async (newData) => {
    const type = typeMap[activeTab];
    try {
      let createdItem;
      switch (type) {
        case 'animal':
          createdItem = await api.createAnimal(newData);
          break;
        case 'section':
          createdItem = await api.createSection(newData);
          break;
        case 'habitat':
          createdItem = await api.createHabitat(newData);
          break;
        case 'ticket':
          createdItem = await api.createTicket(newData);
          break;
        case 'purchaseOrder':
          createdItem = await api.createPurchaseOrder(newData);
          break;
        case 'species':
          createdItem = await api.createSpecies(newData);
          break;
        case 'conservationStatus':
          createdItem = await api.createConservationStatus(newData);
          break;
        case 'province':
          createdItem = await api.createProvince(newData);
          break;
        case 'userProfile':
          createdItem = await api.createUserProfile(newData);
          break;
        case 'visit':
          createdItem = await api.createVisit(newData);
          break;
        default:
          console.error("Create not implemented for:", type);
          return;
      }
      setData(prev => ({
        ...prev,
        [activeTab]: [...prev[activeTab], createdItem]
      }));
      showNotification(`${type} created successfully`, "success");
      setIsCreating(false);
      setEditingItemId(null);
    } catch (error) {
      console.error(`Error creating ${type}:`, error);
      showNotification(`Error creating ${type}`, "error");
    }
  };

  const handleUpdate = async (id, updatedData) => {
    const type = typeMap[activeTab];
    try {
      let updatedItem;
      switch (type) {
        case 'animal':
          updatedItem = await api.updateAnimal(id, updatedData);
          break;
        case 'section':
          updatedItem = await api.updateSection(id, updatedData);
          break;
        case 'habitat':
          updatedItem = await api.updateHabitat(id, updatedData);
          break;
        case 'ticket':
          updatedItem = await api.updateTicket(id, updatedData);
          break;
        case 'purchaseOrder':
          updatedItem = await api.updatePurchaseOrder(id, updatedData);
          break;
        case 'species':
          updatedItem = await api.updateSpecies(id, updatedData);
          break;
        case 'conservationStatus':
          updatedItem = await api.updateConservationStatus(id, updatedData);
          break;
        case 'province':
          updatedItem = await api.updateProvince(id, updatedData);
          break;
        case 'userProfile':
          updatedItem = await api.updateUserProfile(id, updatedData);
          break;
        case 'visit':
          updatedItem = await api.updateVisit(id, updatedData);
          break;
        default:
          console.error("Update not implemented for:", type);
          return;
      }
      setData(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].map(item => (item.id === id ? updatedItem : item))
      }));
      showNotification(`${type} updated successfully`, "success");
      setIsCreating(false);
      setEditingItemId(null);
    } catch (error) {
      console.error(`Error updating ${type}:`, error);
      showNotification(`Error updating ${type}`, "error");
    }
  };

  const handleDelete = async (id) => {
    const type = typeMap[activeTab];
    try {
      switch (type) {
        case 'section':
          await api.deleteSection(id);
          break;
        case 'habitat':
          await api.deleteHabitat(id);
          break;
        case 'animal':
          await api.deleteAnimal(id);
          break;
        case 'ticket':
          await api.deleteTicket(id);
          break;
        case 'visit':
          await api.deleteVisit(id);
          break;
        case 'purchaseOrder':
          await api.deletePurchaseOrder(id);
          break;
        case 'species':
          await api.deleteSpecies(id);
          break;
        case 'conservationStatus':
          await api.deleteConservationStatus(id);
          break;
        case 'province':
          await api.deleteProvince(id);
          break;
        case 'userProfile':
          await api.deleteUser(id);
          break;
        default:
          console.error("Delete not implemented for:", type);
          return;
      }

      setData(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].filter(item => item.id !== id)
      }));
      showNotification(`${type} deleted successfully`, "success");
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      showNotification(`Error deleting ${type}`, "error");
    }
  };

  const filteredData = () => {
    if (!data[activeTab] || !Array.isArray(data[activeTab])) {
      return []; // Return an empty array if data is not available or is not an array
    }
    const currentData = data[activeTab];
    if (!searchTerm) return currentData;

    return currentData.filter(item =>
      Object.values(item).some(
        val => String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleCreateNew = () => {
    setIsCreating(true);
    setEditingItemId(null);
  };

  const handleEdit = (itemId) => {
    setIsCreating(true);
    setEditingItemId(itemId);
  }

  const handleCancel = () => {
    setIsCreating(false);
    setEditingItemId(null);
  }

  const renderForm = () => {
    if (!isCreating && !editingItemId) return null;

    switch (activeTab) {
      case 'animals':
        return (
            <AnimalForm
                mode={editingItemId ? "edit" : "create"}
                initialData={data.animals?.find(item => item.id === editingItemId)}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onCancel={handleCancel}
            />
        );
      case 'sections':
        return (
            <SectionForm
                mode={editingItemId ? "edit" : "create"}
                initialData={data.sections?.find(item => item.id === editingItemId)}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onCancel={handleCancel}
            />
        );
      case 'habitats':
        return (
            <HabitatForm
                mode={editingItemId ? "edit" : "create"}
                initialData={data.habitats?.find(item => item.id === editingItemId)}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onCancel={handleCancel}
            />
        );
      case 'tickets':
        return (
            <TicketForm
                mode={editingItemId ? "edit" : "create"}
                initialData={data.tickets?.find(item => item.id === editingItemId)}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onCancel={handleCancel}
            />
        );
      case 'orders':
        return (
            <PurchaseOrderForm
                mode={editingItemId ? "edit" : "create"}
                initialData={data.orders?.find(item => item.id === editingItemId)}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onCancel={handleCancel}
            />
        );
      case 'species':
        return (
            <SpeciesForm
                mode={editingItemId ? "edit" : "create"}
                initialData={data.species?.find(item => item.id === editingItemId)}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onCancel={handleCancel}
            />
        );
      case 'conservation-status':
        return (
            <ConservationStatusForm
                mode={editingItemId ? "edit" : "create"}
                initialData={data["conservation-status"]?.find(item => item.id === editingItemId)}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onCancel={handleCancel}
            />
        );
      case 'provinces':
        return (
            <ProvinceForm
                mode={editingItemId ? "edit" : "create"}
                initialData={data.provinces?.find(item => item.id === editingItemId)}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onCancel={handleCancel}
            />
        );
      case 'user-profiles':
        return (
            <UserProfileForm
                mode={editingItemId ? "edit" : "create"}
                initialData={data["user-profiles"]?.find(item => item.id === editingItemId)}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onCancel={handleCancel}
            />
        );
      case 'visits':
        return (
            <VisitForm
                mode={editingItemId ? "edit" : "create"}
                initialData={data.visits?.find(item => item.id === editingItemId)}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onCancel={handleCancel}
            />
        );
      default:
        return null;
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r px-6 py-8 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6">Panel de Control</h2>
          <p className="text-sm text-gray-500 mb-8">Bienvenido, {user?.username || 'undefined'}</p>
          <nav className="flex flex-col space-y-4">
            {CRUD_TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  setIsCreating(false);
                  setEditingItemId(null)
                }}
                className={`flex items-center gap-3 ${activeTab === tab.key ? 'text-teal-600' : 'text-gray-700'} font-medium hover:text-teal-600`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex flex-col space-y-3">
          <Link to="/" className="flex items-center gap-3 text-gray-700 font-medium hover:text-teal-600">
            <Eye size={18} /> Ver sitio
          </Link>
          <button 
            onClick={logout}
            className="flex items-center gap-3 text-red-500 font-medium hover:text-red-600"
          >
            <LogOut size={18} /> Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 p-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
          <p className="text-gray-500">Gestiona el contenido y las operaciones del Parque Marino</p>
        </header>

        <div className="mb-8 flex justify-between items-center">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={handleCreateNew}
            className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
          >
            <Plus size={18} />
            Crear nuevo
          </button>
        </div>
        {/* Main Content with Form (Conditional Rendering) */}
        <div className="flex">
          <div className="w-full">
            {/* Table */}
            {!isCreating && editingItemId === null && (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {Object.keys(data[activeTab]?.[0] || {}).map(key => (
                        <th 
                          key={key} 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {key}
                        </th>
                      ))}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData().map(item => (
                      <tr key={item.id}>
                        {Object.entries(item).map(([key, value]) => (
                          <td key={key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {String(value)}
                          </td>
                        ))}
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleEdit(item.id)}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            )}
            {/* Render the form here */}
            {(isCreating || editingItemId) && (
              renderForm()
            )
          }
          </div>
        </div>
      </main>
    </div>
  );
}
