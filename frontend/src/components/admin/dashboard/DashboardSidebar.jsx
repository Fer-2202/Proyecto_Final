import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Ticket,
  Calendar,
  Settings,
  LogOut,
  Globe,
  Fish,
  ShoppingCart,
  Star,
  Landmark,
  Logs,
  Home,
  Menu as MenuIcon,
  X as CloseIcon,
} from "lucide-react";

const NAV_SECTIONS = [
  {
    title: "Gestión Principal",
    items: [
      { name: "Entradas", key: "tickets", icon: <Ticket size={18} />, desc: "Gestionar venta de entradas" },
      { name: "Secciones", key: "sections", icon: <LayoutDashboard size={18} />, desc: "Administrar secciones del parque" },
      { name: "Hábitats", key: "habitats", icon: <Globe size={18} />, desc: "Gestionar hábitats naturales" },
      { name: "Animales", key: "animals", icon: <Fish size={18} />, desc: "Catálogo de animales" },
    ],
  },
  {
    title: "Gestión Secundaria",
    items: [
      { name: "Visitas", key: "visits", icon: <Calendar size={18} />, desc: "Registro de visitas" },
      { name: "Órdenes", key: "orders", icon: <ShoppingCart size={18} />, desc: "Órdenes de compra" },
      { name: "Especies", key: "species", icon: <Star size={18} />, desc: "Catálogo de especies" },
      { name: "Estado de conservación", key: "conservation-status", icon: <Settings size={18} />, desc: "Estados de conservación" },
      { name: "Provincias", key: "provinces", icon: <Landmark size={18} />, desc: "Gestión de provincias" },
      {
        name: "Gestor de Exhibiciones",
        key: "crud-exhibit",
        icon: <Landmark size={18} />,
        desc: "Gestión de exhibiciones",
        children: [
          { name: "Exhibiciones", key: "exhibits", icon: <Landmark size={18} />, desc: "Estados de conservación" },
        ],
      },
    ],
  },
  {
    title: "Administración",
    items: [
      { name: "Perfiles de usuario", key: "user-profiles", icon: <Users size={18} />, desc: "Gestión de usuarios" },
      { name: "Log de Auditoría", key: "audit-log", icon: <Logs size={18} />, desc: "Registro de actividades" },
    ],
  },
];

function SidebarMenu({ items, activeTab, setActiveTab, level = 0 }) {
  return (
    <ul className={level === 0 ? "space-y-2" : "space-y-1 ml-4 border-l border-gray-100 pl-2"}>
      {items.map((item) => (
        <li key={item.key}>
          <button
            className={`flex items-center w-full gap-3 px-3 py-2 rounded-lg transition font-medium text-left group
              ${activeTab === item.key
                ? "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 shadow"
                : "text-gray-700 hover:bg-cyan-50 hover:text-blue-600"}
            `}
            title={item.desc}
            onClick={() => setActiveTab(item.key)}
          >
            <span>{item.icon}</span>
            <span className="truncate flex-1">{item.name}</span>
            {item.children && (
              <span className="ml-2 text-xs text-gray-400">▼</span>
            )}
          </button>
          {item.children && (
            <SidebarMenu
              items={item.children}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              level={level + 1}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

function DashboardSidebar({ activeTab, setActiveTab, logout, user, roleNames = [] }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Footer para el sidebar
  const sidebarFooter = (
    <div className="px-6 py-5 border-t border-gray-100 bg-white flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <span className="inline-block w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg">
          {user?.first_name?.charAt(0) || user?.username?.charAt(0) || "A"}
        </span>
        <div>
          <div className="font-semibold text-gray-900">{user?.first_name} {user?.last_name}</div>
          <div className="text-xs text-gray-500">{user?.email}</div>
          <div className="flex gap-1 mt-1">
            {roleNames.slice(0, 2).map((role, idx) => (
              <span key={idx} className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">{role}</span>
            ))}
            {roleNames.length > 2 && (
              <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">+{roleNames.length - 2}</span>
            )}
          </div>
        </div>
      </div>
      <button
        className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-semibold transition"
        onClick={logout}
      >
        <LogOut size={16} /> Cerrar sesión
      </button>
    </div>
  );

  // Sidebar principal
  const sidebarContent = (
    <nav className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} className="mb-6">
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-2 px-2">
              {section.title}
            </div>
            <SidebarMenu
              items={section.items}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
        ))}
      </div>
      {sidebarFooter}
    </nav>
  );

  // Mobile drawer
  if (isMobile) {
    return (
      <>
        <button
          className="fixed top-4 left-4 z-50 p-2 rounded-full bg-white shadow-lg border border-gray-200 text-blue-600 md:hidden"
          onClick={() => setIsMobileOpen(true)}
        >
          <MenuIcon size={24} />
        </button>
        {isMobileOpen && (
          <div className="fixed inset-0 z-40 bg-black/30" onClick={() => setIsMobileOpen(false)} />
        )}
        <aside
          className={`fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 md:hidden
            ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <span className="font-bold text-lg text-blue-700">Menú</span>
            <button onClick={() => setIsMobileOpen(false)} className="p-2 rounded-full hover:bg-gray-100">
              <CloseIcon size={20} />
            </button>
          </div>
          {sidebarContent}
        </aside>
      </>
    );
  }

  // Desktop sidebar
  return (
    <aside className="w-72 min-h-screen bg-white border-r border-gray-100 shadow-lg hidden md:flex flex-col">
      {sidebarContent}
    </aside>
  );
}

DashboardSidebar.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object,
  roleNames: PropTypes.array,
};

export default DashboardSidebar;