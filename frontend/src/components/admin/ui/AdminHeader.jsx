import { Input, Button, Badge, Avatar, Dropdown } from "antd";
import { Search, Plus, Bell, Settings, User, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useUserRoles } from "@hooks/useUserRoles";

function AdminHeader({ searchTerm, setSearchTerm, showModal, user }) {
  const { roleNames } = useUserRoles();

  const userMenuItems = [
    {
      key: "profile",
      label: (
        <div className="flex items-center gap-3 p-2">
          <Avatar
            size={32}
            className="bg-gradient-to-br from-blue-500 to-purple-600"
          >
            {user?.first_name?.charAt(0) || user?.username?.charAt(0) || "A"}
          </Avatar>
          <div>
            <p className="font-medium text-gray-900">
              {user?.first_name} {user?.last_name}
            </p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "settings",
      icon: <Settings size={16} />,
      label: "Configuración",
    },
    {
      key: "logout",
      icon: <LogOut size={16} />,
      label: "Cerrar sesión",
      danger: true,
    },
  ];

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/95 backdrop-blur-md border-b border-gray-200 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Panel de Administración
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Gestiona el Parque Marino desde un solo lugar
            </p>
          </div>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <Input
              placeholder="Buscar en la base de datos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              size="large"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <Bell size={20} className="text-gray-600" />
            <Badge
              count={3}
              size="small"
              className="absolute -top-1 -right-1"
            />
          </motion.button>

          {/* Create Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="primary"
              icon={<Plus size={16} />}
              onClick={() => showModal()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg"
              size="large"
            >
              Crear Nuevo
            </Button>
          </motion.div>

          {/* User Menu */}
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Avatar
                size={40}
                className="bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg"
              >
                {user?.first_name?.charAt(0) ||
                  user?.username?.charAt(0) ||
                  "A"}
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900">
                  {user?.first_name} {user?.last_name}
                </p>
                <div className="flex gap-1">
                  {roleNames.slice(0, 2).map((role, index) => (
                    <span
                      key={index}
                      className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full"
                    >
                      {role}
                    </span>
                  ))}
                  {roleNames.length > 2 && (
                    <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{roleNames.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          </Dropdown>
        </div>
      </div>
    </motion.div>
  );
}

export default AdminHeader;