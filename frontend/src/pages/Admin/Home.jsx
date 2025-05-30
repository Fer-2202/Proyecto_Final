import { useState } from "react";
import { LayoutDashboard, Users, Ticket, Calendar, Settings, LogOut, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { useAuth } from "../../context/AuthContext";

export default function DashboardAdmin() {
 
  
  const [activeTab, setActiveTab] = useState("Entradas");

  const entries = [
    { id: "T-1234", client: "María Rodríguez", date: "2023-05-15", quantity: 4, total: "₡11 600" },
    { id: "T-1235", client: "Carlos Jiménez", date: "2023-05-14", quantity: 2, total: "₡5 800" },
    { id: "T-1236", client: "Laura Méndez", date: "2023-05-14", quantity: 6, total: "₡17 400" },
    { id: "T-1237", client: "Juan Pérez", date: "2023-05-13", quantity: 3, total: "₡8 700" },
    { id: "T-1238", client: "Ana Castro", date: "2023-05-12", quantity: 5, total: "₡14 500" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r px-6 py-8 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6">Panel de Control</h2>
          <p className="text-sm text-gray-500 mb-8">Bienvenido, Admin User</p>
          <nav className="flex flex-col space-y-4">
            <a href="#" className="flex items-center gap-3 text-gray-700 font-medium hover:text-teal-600">
              <LayoutDashboard size={18} /> Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 text-gray-700 font-medium hover:text-teal-600">
              <Users size={18} /> Usuarios
            </a>
            <a href="#" className="flex items-center gap-3 text-gray-700 font-medium hover:text-teal-600">
              <Ticket size={18} /> Entradas
            </a>
            <a href="#" className="flex items-center gap-3 text-gray-700 font-medium hover:text-teal-600">
              <Calendar size={18} /> Eventos
            </a>
            <a href="#" className="flex items-center gap-3 text-gray-700 font-medium hover:text-teal-600">
              <Settings size={18} /> Configuración
            </a>
          </nav>
        </div>
        <div className="flex flex-col space-y-3">
          <a href="#" className="flex items-center gap-3 text-gray-700 font-medium hover:text-teal-600">
            <Eye size={18} /> Ver sitio
          </a>
          <a href="#" className="flex items-center gap-3 text-red-500 font-medium hover:text-red-600">
            <LogOut size={18} /> Cerrar sesión
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
          <p className="text-gray-500">Gestiona el contenido y las operaciones del Parque Marino</p>
        </header>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-5 rounded-lg shadow border">
            <p className="text-gray-500 mb-1">Visitantes Hoy</p>
            <h3 className="text-2xl font-bold">124</h3>
            <p className="text-green-500 text-sm mt-1">↑ 12% desde ayer</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow border">
            <p className="text-gray-500 mb-1">Ventas Hoy</p>
            <h3 className="text-2xl font-bold">₡358,900</h3>
            <p className="text-green-500 text-sm mt-1">↑ 8% desde ayer</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow border">
            <p className="text-gray-500 mb-1">Usuarios Registrados</p>
            <h3 className="text-2xl font-bold">1,248</h3>
            <p className="text-green-500 text-sm mt-1">↑ 3% esta semana</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow border">
            <p className="text-gray-500 mb-1">Eventos Activos</p>
            <h3 className="text-2xl font-bold">8</h3>
            <p className="text-orange-500 text-sm mt-1">2 próximos esta semana</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-4 border-b flex space-x-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab("Entradas")}
            className={`pb-2 ${activeTab === "Entradas" ? "border-b-2 border-teal-600 text-teal-600" : "text-gray-600"}`}
          >
            Entradas Recientes
          </button>
          <button
            onClick={() => setActiveTab("Contenido")}
            className={`pb-2 ${activeTab === "Contenido" ? "border-b-2 border-teal-600 text-teal-600" : "text-gray-600"}`}
          >
            Contenido
          </button>
        </div>

        {/* Table */}
        {activeTab === "Entradas" && (
          <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-xl font-bold mb-1">Entradas Recientes</h2>
            <p className="text-gray-500 text-sm mb-4">Últimas compras de entradas realizadas en el sistema</p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Cliente</th>
                    <th className="px-4 py-2">Fecha</th>
                    <th className="px-4 py-2">Cantidad</th>
                    <th className="px-4 py-2">Total</th>
                    <th className="px-4 py-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry.id} className="border-t">
                      <td className="px-4 py-2">{entry.id}</td>
                      <td className="px-4 py-2">{entry.client}</td>
                      <td className="px-4 py-2">{entry.date}</td>
                      <td className="px-4 py-2">{entry.quantity}</td>
                      <td className="px-4 py-2">{entry.total}</td>
                      <td className="px-4 py-2 flex space-x-2">
                        <button className="text-gray-500 hover:text-teal-600">
                          <Pencil2Icon />
                        </button>
                        <button className="text-gray-500 hover:text-teal-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button className="border border-gray-300 px-4 py-2 text-sm rounded hover:bg-gray-100">Exportar</button>
              <button className="bg-teal-600 text-white px-4 py-2 text-sm rounded hover:bg-teal-700">Ver Todos</button>
            </div>
          </div>
        )}

        {activeTab === "Contenido" && (
          <div className="bg-white p-6 rounded-lg shadow border">
            <p className="text-gray-500">Contenido en construcción...</p>
          </div>
        )}
      </main>
    </div>
  );
}
