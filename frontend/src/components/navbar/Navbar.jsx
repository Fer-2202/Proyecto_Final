import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  HamburgerMenuIcon,
  Cross1Icon,
  ChevronDownIcon
} from "@radix-ui/react-icons";
import {
  Ticket,
  User,
  LogOut
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/img/LOGO.webp";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../auth/Avatar";
import TopBarRedes from "./components/TopBarRedes";

const links = [
  {
    name: "Quienes Somos",
    href: "/quienes-somos",
    dropdown: true,
    sublinks: [
      { name: "Información Institucional", href: "/quienes-somos/informacion-institucional" },
      { name: "Historia", href: "/quienes-somos/historia" },
      { name: "Equipo", href: "/quienes-somos/equipo" },
      { name: "Transparencia Institucional", href: "/quienes-somos/transparencia-institucional" },
    ],
  },
  {
    name: "Exhibiciones y Servicios",
    href: "/exhibiciones-y-servicios",
    dropdown: true,
    sublinks: [
      { name: "Exhibiciones", href: "/exhibiciones-y-servicios/exhibiciones" },
      { name: "Servicios Educativos", href: "/exhibiciones-y-servicios/servicios-educativos" }
    ],
  },
  {
    name: "Investigación y Conservación",
    href: "/investigacion-y-conservacion",
    dropdown: true,
    sublinks: [
      { name: "Acuicultura y Biotecnología Marina", href: "/investigacion-y-conservacion/acuicultura-y-biotecnologia-marina" },
      { name: "Centro de Rescate y Rehabilitación", href: "/investigacion-y-conservacion/centro-de-rescate-y-rehabilitacion" },
      { name: "Investigación", href: "/investigacion-y-conservacion/investigacion" },
      { name: "Proyectos", href: "/investigacion-y-conservacion/proyectos" },
    ],
  },
  {
    name: "Apoyo",
    href: "/apoyo",
    dropdown: true,
    sublinks: [
      { name: "Voluntariado", href: "/apoyo/voluntariado" },
      { name: "Donaciones", href: "/apoyo/donaciones" },
    ],
  },
];

const ticketLink = {
  name: "Ticketera",
  href: "/purchase-form/ticketera",
  isButton: true,
};



export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef = useRef();
  const { isAuthenticated, user, logout } = useAuth();
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(null);
        setShowUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full fixed top-0 z-50 backdrop-blur-md bg-white/90 shadow-md border-b border-gray-200">
      {/* Top bar redes */}
      <TopBarRedes />

      {/* Main navbar */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-10 w-auto drop-shadow" />
          <div className="leading-tight flex flex-col">
            <span className="text-base font-extrabold text-gray-800 uppercase">Parque Marino</span>
            <span className="text-xs text-gray-600">Del Pacífico Sur</span>
          </div>
        </Link>

        <ul className="hidden md:flex gap-6 items-center flex-1 justify-end pr-10" ref={dropdownRef}>
          {links.map((link, index) => (
            <li key={link.name} className="relative group">
              {link.dropdown ? (
                <>
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="flex items-center gap-1 text-gray-800 font-medium hover:text-[#26b7ad] transition"
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen === index}
                  >
                    {link.name}
                    <ChevronDownIcon className="w-4 h-4" />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen === index && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 mt-2 w-max bg-white shadow-xl rounded-lg z-50 border border-gray-200"
                      >
                        <div className="py-2">
                          {link.sublinks.map((sublink) => (
                            <Link
                              key={sublink.href}
                              to={sublink.href}
                              className="block px-5 py-2 text-sm text-gray-700 hover:bg-[#e6f7f6] whitespace-nowrap transition"
                            >
                              {sublink.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link to={link.href} className="text-gray-800 font-medium hover:text-[#26b7ad] transition">
                  {link.name}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Botón de Ticket y avatar */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to={ticketLink.href}
            className="bg-[#26b7ad] hover:bg-[#239e99] transition text-white font-semibold text-sm px-4 py-2 rounded-md shadow flex items-center gap-2"
          >
            <Ticket className="w-4 h-4" />
            {ticketLink.name}
          </Link>
          {    isAuthenticated && user ? (
      <div className="relative group">
        <button
          className="flex items-center gap-2 focus:outline-none"
          onClick={() => setShowUserDropdown((prev) => !prev)}
          aria-haspopup="true"
          aria-expanded={showUserDropdown ? "true" : "false"}
        >
          <Avatar user={user} size={40} />
        </button>
      </div>
    ) : null}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Abrir menú">
            {isOpen ? <Cross1Icon /> : <HamburgerMenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white px-4 py-4 space-y-4"
          >
            {[...links, ticketLink].map((link) =>
              link.dropdown ? (
                <div key={link.href}>
                  <span className="font-medium text-gray-700">{link.name}</span>
                  <div className="pl-4">
                    {link.sublinks.map((sublink) => (
                      <Link
                        key={sublink.href}
                        to={sublink.href}
                        className="block py-1 text-gray-700 hover:text-[#26b7ad]"
                      >
                        {sublink.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`block text-gray-700 hover:text-gray-700 transition ${link.isButton ? "cursor-pointer" : ""}- ${
                    link.isButton
                      ? "bg-[#26b7ad] text-white font-semibold text-center py-2 rounded-md mt-2 flex items-center justify-center gap-2"
                      : ""
                  }`}
                >
                  {link.isButton && <Ticket className="w-4 h-4" />}
                  {link.name}
                </Link>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
