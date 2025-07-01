import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  User,
  Ticket,
  Info,
  Phone,
  ChevronDown,
  LogOut,
  Settings,
  Bell,
  Search,
} from "lucide-react";
import { useAuth } from "@context/AuthContext";
import { useLocation, Link } from "react-router-dom";
import Button from "@components/ui/Button";
import LoadingSpinner from "@pages/Loading";

const ModernLayout = ({ children }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Inicio", href: "/", icon: Home },
    { name: "Animales", href: "/animals", icon: Info },
    { name: "Exhibiciones", href: "/exhibits", icon: Info },
    { name: "Tickets", href: "/tickets", icon: Ticket },
    { name: "Contacto", href: "/contact", icon: Phone },
  ];

  const userMenuItems = [
    { name: "Mi Perfil", href: "/profile", icon: User },
    { name: "Configuración", href: "/settings", icon: Settings },
    { name: "Notificaciones", href: "/notifications", icon: Bell },
  ];

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PM</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Parque Marino
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon size={16} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden sm:flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-200">
                <Search size={16} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="bg-transparent outline-none text-sm w-32"
                />
              </div>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {user?.first_name?.charAt(0) ||
                        user?.username?.charAt(0) ||
                        "U"}
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-gray-700">
                      {user?.first_name || user?.username}
                    </span>
                    <ChevronDown size={16} className="text-gray-400" />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2"
                      >
                        {userMenuItems.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <item.icon size={16} />
                            <span>{item.name}</span>
                          </Link>
                        ))}
                        <hr className="my-2" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full"
                        >
                          <LogOut size={16} />
                          <span>Cerrar sesión</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    Iniciar sesión
                  </Button>
                  <Button size="sm">Registrarse</Button>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="px-4 py-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                    >
                      <item.icon size={20} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main className="pt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Parque Marino</h3>
              <p className="text-gray-400 text-sm">
                Descubre la maravillosa vida marina en nuestro parque temático.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Enlaces</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    to="/animals"
                    className="hover:text-white transition-colors"
                  >
                    Animales
                  </Link>
                </li>
                <li>
                  <Link
                    to="/exhibits"
                    className="hover:text-white transition-colors"
                  >
                    Exhibiciones
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tickets"
                    className="hover:text-white transition-colors"
                  >
                    Tickets
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Información</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors"
                  >
                    Sobre nosotros
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacidad
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="hover:text-white transition-colors"
                  >
                    Términos
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>San José, Costa Rica</p>
                <p>+506 1234-5678</p>
                <p>info@parquemarino.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Parque Marino. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ModernLayout;