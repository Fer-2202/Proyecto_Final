import { Link } from "react-router-dom";
import { Button, Menu } from "antd";
import {
  LayoutDashboard, Users, Ticket, Calendar, Settings,
  LogOut, Eye, Globe,
  Fish, ShoppingCart, Star, Landmark, Logs
} from "lucide-react";

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
  { name: "Perfiles de usuario", key: "user-profiles", icon: <Users size={16} /> },
  { name: "Log de Auditoria", key: "audit-log", icon: <Logs size={16} /> },
];

function AdminSidebar({ activeTab, setActiveTab, logout, user }) {
  return (
    <div className="bg-gray-100 border-r border-gray-200">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Panel de Control</h2>
        <p className="text-sm text-gray-600 mb-6">
          Bienvenido, {user?.username || "Admin"}
        </p>
      </div>

      <Menu
        mode="inline"
        selectedKeys={[activeTab]}
        className="px-2"
        itemClassName="rounded-md"
      >
        {CRUD_TABS.map(tab => (
          <Menu.Item
            key={tab.key}
            icon={tab.icon}
            className="hover:!bg-teal-100 rounded-md"
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.name}
          </Menu.Item>
        ))}
      </Menu>

      <div className="p-6 space-y-3">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-700 hover:text-teal-600"
        >
          <Eye size={16} /> Ver sitio
        </Link>
        <Button
          icon={<LogOut size={16} />}
          danger
          type="text"
          onClick={logout}
        >
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}

export { AdminSidebar as default };

