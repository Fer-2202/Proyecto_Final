import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Button, Drawer } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import {
  LayoutDashboard, Users, Ticket, Calendar, Settings,
  LogOut, Eye, Globe, Fish, ShoppingCart, Star, Landmark, Logs
} from "lucide-react";
import { motion } from "framer-motion";

const CRUD_TABS = [
  {
    name: "Crud",
    key: "submenu",
    children: [
      { name: "Entradas", key: "tickets", icon: <Ticket size={18} /> },
      { name: "Secciones", key: "sections", icon: <LayoutDashboard size={18} /> },
      { name: "Hábitats", key: "habitats", icon: <Globe size={18} /> },
      { name: "Animales", key: "animals", icon: <Fish size={18} /> },
      { name: "Visitas", key: "visits", icon: <Calendar size={18} /> },
      { name: "Órdenes", key: "orders", icon: <ShoppingCart size={18} /> },
      { name: "Especies", key: "species", icon: <Star size={18} /> },
      { name: "Estado de conservación", key: "conservation-status", icon: <Settings size={18} /> },
      { name: "Provincias", key: "provinces", icon: <Landmark size={18} /> },
    ],
  },
  { name: "Perfiles de usuario", key: "user-profiles", icon: <Users size={18} /> },
  { name: "Log de Auditoria", key: "audit-log", icon: <Logs size={18} /> },
];

export default function AdminSidebar({ activeTab, setActiveTab, logout, user }) {
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem("sidebar-collapsed") === "true";
  });
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

  const toggleCollapse = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    localStorage.setItem("sidebar-collapsed", newCollapsed.toString());
  };

  const handleSelect = (key) => {
    setActiveTab(key);
    if (isMobile) setIsMobileOpen(false);
  };

  const sidebarContent = (
    <motion.div
      initial={{ x: -240, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -240, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="min-h-screen flex flex-col bg-white shadow-md w-full"
    >
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-teal-700">Panel de Control</h2>
        <p className="text-sm text-gray-500 mb-4">
          Bienvenido, <span className="font-semibold">{user?.username || "Admin"}</span>
        </p>
        {!isMobile && (
          <Button
            onClick={toggleCollapse}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            className="w-full"
          >
            {collapsed ? "Expandir" : "Colapsar"}
          </Button>
        )}
      </div>

      <Menu
        mode="inline"
        selectedKeys={[activeTab]}
        inlineCollapsed={!isMobile && collapsed}
        className="flex-1 border-none font-medium text-gray-700"
        style={{ background: "white" }}
      >
        {CRUD_TABS.map((tab) =>
          tab.children ? (
            <Menu.SubMenu
              key={tab.key}
              icon={tab.icon}
              title={tab.name}
              className="rounded-md font-semibold"
            >
              {tab.children.map((child) => (
                <Menu.Item
                  key={child.key}
                  icon={child.icon}
                  onClick={() => handleSelect(child.key)}
                  className={`rounded-md hover:!bg-teal-50 ${
                    activeTab === child.key ? "!text-white !bg-teal-500 font-semibold" : ""
                  }`}
                >
                  {child.name}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item
              key={tab.key}
              icon={tab.icon}
              onClick={() => handleSelect(tab.key)}
              className={`rounded-md hover:!bg-teal-50 ${
                activeTab === tab.key ? "!text-white !bg-teal-500 font-semibold" : ""
              }`}
            >
              {tab.name}
            </Menu.Item>
          )
        )}
      </Menu>

      <div className="p-4 border-t border-gray-200">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-700 hover:text-teal-600"
        >
          <Eye size={18} />
          Ver sitio
        </Link>
        <Button
          icon={<LogOut size={18} />}
          danger
          type="primary"
          block
          onClick={logout}
          className="mt-3"
        >
          Cerrar sesión
        </Button>
      </div>
    </motion.div>
  );

  return (
    <>
      {isMobile && (
        <Button
          icon={<MenuUnfoldOutlined />}
          onClick={() => setIsMobileOpen(true)}
          className="m-2"
        />
      )}

      {!isMobile && (
        <div className={`transition-all duration-300 ${collapsed ? "w-[80px]" : "w-[240px]"}`}>
          {sidebarContent}
        </div>
      )}

      <Drawer
        placement="left"
        closable={false}
        onClose={() => setIsMobileOpen(false)}
        open={isMobileOpen}
        bodyStyle={{ padding: 0 }}
        width={240}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
}
