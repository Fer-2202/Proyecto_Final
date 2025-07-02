import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Drawer, Menu, Tooltip } from "antd";
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
} from "lucide-react";

// Fix: Ensure nested menu items are rendered correctly in Ant Design Menu
const NAV_SECTIONS = [
  {
    title: "Gestión Principal",
    items: [
      {
        name: "Entradas",
        key: "tickets",
        icon: <Ticket size={18} />,
        desc: "Gestionar venta de entradas",
      },
      {
        name: "Secciones",
        key: "sections",
        icon: <LayoutDashboard size={18} />,
        desc: "Administrar secciones del parque",
      },
      {
        name: "Hábitats",
        key: "habitats",
        icon: <Globe size={18} />,
        desc: "Gestionar hábitats naturales",
      },
      {
        name: "Animales",
        key: "animals",
        icon: <Fish size={18} />,
        desc: "Catálogo de animales",
      },
    ],
  },
  {
    title: "Gestión Secundaria",
    items: [
      {
        name: "Visitas",
        key: "visits",
        icon: <Calendar size={18} />,
        desc: "Registro de visitas",
      },
      {
        name: "Órdenes",
        key: "orders",
        icon: <ShoppingCart size={18} />,
        desc: "Órdenes de compra",
      },
      {
        name: "Especies",
        key: "species",
        icon: <Star size={18} />,
        desc: "Catálogo de especies",
      },
      {
        name: "Estado de conservación",
        key: "conservation-status",
        icon: <Settings size={18} />,
        desc: "Estados de conservación",
      },
      {
        name: "Provincias",
        key: "provinces",
        icon: <Landmark size={18} />,
        desc: "Gestión de provincias",
      },
      {
        name: "Gestor de Exhibiciones",
        key: "crud-exhibit",
        icon: <Landmark size={18} />,
        desc: "Gestión de exhibiciones",
        children: [
          {
            name: "Exhibiciones",
            key: "exhibits",
            icon: <Landmark size={18} />,
            desc: "Estados de conservación",
          }
        ]
      }
    ],
  },
  {
    title: "Administración",
    items: [
      {
        name: "Perfiles de usuario",
        key: "user-profiles",
        icon: <Users size={18} />,
        desc: "Gestión de usuarios",
      },
      {
        name: "Log de Auditoría",
        key: "audit-log",
        icon: <Logs size={18} />,
        desc: "Registro de actividades",
      },
    ],
  },
];

// Helper to recursively build menu items, including nested children
function buildMenuItems(items, activeTab) {
  return items.map((item) => {
    if (item.children && Array.isArray(item.children)) {
      return {
        key: item.key,
        icon: (
          <Tooltip title={item.desc} placement="right" mouseEnterDelay={0.3}>
            <span className={activeTab === item.key ? "text-blue-600" : "text-gray-400"}>
              {item.icon}
            </span>
          </Tooltip>
        ),
        label: <span className="truncate">{item.name}</span>,
        className:
          activeTab === item.key
            ? "bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-500 pl-2"
            : "text-gray-700 hover:bg-gray-100 hover:text-blue-600 border-l-4 border-transparent pl-2",
        children: buildMenuItems(item.children, activeTab),
      };
    }
    return {
      key: item.key,
      icon: (
        <Tooltip title={item.desc} placement="right" mouseEnterDelay={0.3}>
          <span className={activeTab === item.key ? "text-blue-600" : "text-gray-400"}>
            {item.icon}
          </span>
        </Tooltip>
      ),
      label: <span className="truncate">{item.name}</span>,
      className:
        activeTab === item.key
          ? "bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-500 pl-2"
          : "text-gray-700 hover:bg-gray-100 hover:text-blue-600 border-l-4 border-transparent pl-2",
    };
  });
}

function DashboardSidebar({
  activeTab,
  setActiveTab,
  logout,
  user,
  roleNames = [],
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelect = ({ key }) => {
    setActiveTab(key);
    if (isMobile) setIsMobileOpen(false);
  };

  // Detectar si el usuario es admin para el borde del avatar
  const isAdmin = roleNames.some((r) => r.toLowerCase().includes("admin"));

  // Fix: Use recursive buildMenuItems to support nested menu items
  const menuItems = NAV_SECTIONS.map((section) => ({
    type: "group",
    label: (
      <span className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
        {section.title}
      </span>
    ),
    key: section.title,
    children: buildMenuItems(section.items, activeTab),
  }));

  // Footer para el sidebar
  const sidebarFooter = (
    <div className="px-6 py-5 border-t border-gray-100 bg-white flex flex-col gap-2">
      <Link
        to="/"
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
      >
        <Home size={17} />
        <span className="text-sm font-medium">Ver sitio</span>
      </Link>
      <button
        onClick={logout}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
      >
        <LogOut size={17} />
        <span className="text-sm font-medium">Cerrar sesión</span>
      </button>
    </div>
  );

  // Header de usuario
  const sidebarHeader = (
    <div className="px-6 pt-8 pb-5 border-b border-gray-100">
      <div className="flex items-center gap-4 mb-2">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center text-gray-500 text-xl font-bold bg-gray-100 transition-all duration-200 ${isAdmin ? "ring-2 ring-blue-500" : ""}`}
          tabIndex={0}
          aria-label="Avatar usuario"
        >
          {user?.first_name?.charAt(0) || user?.username?.charAt(0) || "A"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-gray-900 truncate text-base">
            {user?.first_name} {user?.last_name}
          </div>
          <div className="text-xs text-gray-400 truncate">{user?.email}</div>
          <div className="flex gap-1 mt-2 flex-wrap">
            {roleNames.map((role, idx) => (
              <span
                key={idx}
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${role.toLowerCase().includes("admin") ? "bg-blue-100 text-blue-700 border border-blue-200" : "bg-gray-100 text-gray-600 border border-gray-200"}`}
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const sidebarContent = (
    <aside className="admin-sidebar-minimal w-full h-full flex flex-col bg-white border-r border-gray-200">
      {sidebarHeader}
      <nav className="flex-1 overflow-y-auto px-2 py-6">
        <Menu
          mode="inline"
          selectedKeys={[activeTab]}
          onClick={handleSelect}
          items={menuItems}
          className="admin-sidebar-menu bg-transparent border-0"
        />
      </nav>
      {sidebarFooter}
    </aside>
  );

  return (
    <>
      {isMobile && (
        <Button
          icon={<LayoutDashboard size={18} />}
          onClick={() => setIsMobileOpen(true)}
          className="m-2 bg-blue-600 hover:bg-blue-700 border-0"
          type="primary"
        />
      )}
      {!isMobile && (
        <div className="w-[270px] min-h-screen shadow-sm">{sidebarContent}</div>
      )}
      {isMobile && (
        <Drawer
          placement="left"
          closable={false}
          onClose={() => setIsMobileOpen(false)}
          open={isMobileOpen}
          bodyStyle={{ padding: 0, background: "white" }}
          width={270}
          className="admin-drawer"
          maskStyle={{ background: "rgba(0,0,0,0.3)" }}
          maskClosable={true}
          destroyOnClose={false}
        >
          <div
            className="h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </Drawer>
      )}
    </>
  );
}

DashboardSidebar.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  roleNames: PropTypes.array,
};

export default DashboardSidebar;