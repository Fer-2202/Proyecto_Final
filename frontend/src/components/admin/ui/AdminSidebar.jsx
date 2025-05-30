// AdminSidebar.jsx
import { motion } from 'framer-motion';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip';
import { LayoutDashboard, Users, FileText, Image, Calendar, Settings, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const items = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { label: 'Usuarios', icon: Users, href: '/admin/usuarios' },
  { label: 'Entradas', icon: FileText, href: '/admin/entradas' },
  { label: 'Contenido', icon: Image, href: '/admin/contenido' },
  { label: 'Eventos', icon: Calendar, href: '/admin/eventos' },
  { label: 'Configuración', icon: Settings, href: '/admin/configuracion' }
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <TooltipProvider>
      <motion.aside
        animate={{ width: collapsed ? 64 : 220 }}
        className="h-screen bg-white border-r border-gray-200 shadow-md flex flex-col items-start px-2 py-4 transition-all duration-300"
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between w-full px-3 mb-6">
          {!collapsed && (
            <div>
              <h2 className="text-xl font-semibold">Panel de Admin</h2>
              <p className="text-sm text-gray-500">Bienvenido, Admin User</p>
            </div>
          )}
          <button
            onClick={() => setCollapsed((prev) => !prev)}
            className="flex items-center justify-center"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="space-y-1 w-full">
          {items.map(({ label, icon: Icon, href }) => {
            const active = location.pathname === href;
            return (
              <Tooltip key={label} delayDuration={300}>
                <TooltipTrigger asChild>
                  <Link
                    to={href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors ${
                      active ? 'bg-gray-100 font-semibold' : ''
                    }`}
                  >
                    <Icon className="w-5 h-5 text-gray-700" />
                    {!collapsed && <span className="text-gray-800">{label}</span>}
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent
                    side="right"
                    className="z-50 bg-black text-white text-sm px-2 py-1 rounded shadow"
                  >
                    {label}
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </nav>

        {/* Spacer */}
        <div className="border-t my-4 w-full"></div>

        {/* Logout Link */}
        <div className="mt-auto w-full">
          <Link
            to="/logout"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-100 text-red-600"
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span>Cerrar sesión</span>}
          </Link>
        </div>
      </motion.aside>
    </TooltipProvider>
  );
}
