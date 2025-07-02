import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Drawer, Tooltip } from "antd";
import { LayoutDashboard, Users, Ticket, Calendar, Settings, LogOut, Globe, Fish, ShoppingCart, Star, Landmark, Logs, Home, Book} from "lucide-react";
import { useUserRoles } from "@hooks/useUserRoles";
import { motion, AnimatePresence } from "framer-motion";

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
      {
        name: "Exhibiciones",
        key: "exhibits",
        icon: <Book/>,
        desc: "Gestión avanzada de exhiciones"
      }
    ],
  },
];

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  logout,
  user,
}) {
  const { roleNames } = useUserRoles();
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

  const handleSelect = (key) => {
    setActiveTab(key);
    if (isMobile) setIsMobileOpen(false);
  };

  // Detectar si el usuario es admin para el borde del avatar
  const isAdmin = roleNames.some((r) => r.toLowerCase().includes("admin"));

  // Framer Motion variants para animaciones
  const itemVariants = {
    initial: { x: 0, opacity: 1 },
    hover: {
      x: 6,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    tap: { scale: 0.98 },
  };

  const sidebarContent = (
    <aside className="admin-sidebar-minimal w-full h-full flex flex-col bg-white border-r border-gray-200">
      {/* Usuario */}
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

      {/* Navegación */}
      <nav className="flex-1 overflow-y-auto px-2 py-6">
        {NAV_SECTIONS.map((section, idx) => (
          <div key={section.title} className="mb-7">
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide px-2 mb-3">
              {section.title}
            </div>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.key}>
                  <Tooltip
                    title={item.desc}
                    placement="right"
                    mouseEnterDelay={0.3}
                  >
                    <motion.button
                      onClick={() => handleSelect(item.key)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
                        ${
                          activeTab === item.key
                            ? "bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-500 pl-2"
                            : "text-gray-700 hover:bg-gray-100 hover:text-blue-600 border-l-4 border-transparent pl-2"
                        }
                      `}
                      tabIndex={0}
                      aria-current={activeTab === item.key ? "page" : undefined}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                      variants={itemVariants}
                    >
                      <span
                        className={`flex items-center justify-center ${activeTab === item.key ? "text-blue-600" : "text-gray-400"}`}
                      >
                        {item.icon}
                      </span>
                      <span className="truncate">{item.name}</span>
                    </motion.button>
                  </Tooltip>
                </li>
              ))}
            </ul>
            {idx < NAV_SECTIONS.length - 1 && (
              <div className="my-6 border-b border-gray-100" />
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
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
      {/* Drawer para móvil con animación */}
      <AnimatePresence>
        {isMobile && isMobileOpen && (
          <Drawer
            placement="left"
            closable={false}
            onClose={() => setIsMobileOpen(false)}
            open={isMobileOpen}
            bodyStyle={{ padding: 0, background: "white" }}
            width={270}
            className="admin-drawer"
            maskStyle={{ background: "rgba(0,0,0,0.3)" }}
          >
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="h-full"
            >
              {sidebarContent}
            </motion.div>
          </Drawer>
        )}
      </AnimatePresence>
    </>
  );
}