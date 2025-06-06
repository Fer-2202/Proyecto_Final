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
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  getSections,
  getHabitats,
  getAnimals,
  getTickets,
  getVisits,
  getPurchaseOrders,
  getSpecies,
  getConservationStatuses,
  getProvinces,
  getUsersProfiles,
  deleteSection,
  deleteHabitat,
  deleteAnimal,
  deleteTicket,
  deleteVisit,
  deletePurchaseOrder,
  deleteSpecies,
  deleteConservationStatus,
  deleteProvince,
  deleteUser
} from "../../api/api";

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
          getSections(),
          getHabitats(),
          getAnimals(),
          getTickets(),
          getVisits(),
          getPurchaseOrders(),
          getSpecies(),
          getConservationStatuses(),
          getProvinces(),
          getUsersProfiles()
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (tabKey, id) => {
    const type = typeMap[tabKey];
    try {
      switch(type) {
        case 'section': await deleteSection(id); break;
        case 'habitat': await deleteHabitat(id); break;
        case 'animal': await deleteAnimal(id); break;
        case 'ticket': await deleteTicket(id); break;
        case 'visit': await deleteVisit(id); break;
        case 'purchaseOrder': await deletePurchaseOrder(id); break;
        case 'species': await deleteSpecies(id); break;
        case 'conservationStatus': await deleteConservationStatus(id); break;
        case 'province': await deleteProvince(id); break;
        case 'userProfile': await deleteUser(id); break;
        default: console.error("Delete not implemented for:", type);
      }

      setData(prev => ({
        ...prev,
        [tabKey]: prev[tabKey].filter(item => item.id !== id)
      }));
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
  };

  const filteredData = () => {
    const currentData = data[activeTab];
    if (!searchTerm) return currentData;
    
    return currentData.filter(item => 
      Object.values(item).some(
        val => String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r px-6 py-8 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6">Panel de Control</h2>
          <p className="text-sm text-gray-500 mb-8">Bienvenido, {user?.username || 'Admin'}</p>
          <nav className="flex flex-col space-y-4">
            {CRUD_TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
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
          <Link 
            to={`/admin/${activeTab}/new`}
            className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
          >
            <Plus size={18} />
            Crear nuevo
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {Object.keys(data[activeTab][0] || {}).map(key => (
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
                    <Link 
                      to={`/admin/${activeTab}/${item.id}/edit`}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <Edit size={16} />
                    </Link>
                    <button 
                      onClick={() => handleDelete(activeTab, item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
