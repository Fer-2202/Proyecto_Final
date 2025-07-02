import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  HamburgerMenuIcon,
  Cross1Icon,
  ChevronDownIcon
} from "@radix-ui/react-icons";
import { BiDonateHeart } from 'react-icons/bi'
import {
  Ticket,
  User,
  LogOut
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@assets/img/LOGO.webp";
import { useAuth } from "@context/AuthContext";
import Avatar from "../auth/Avatar";
import TopBarRedes from "./components/TopBarRedes";

const links = [
  {
    name: "Quienes Somos",
    href: "/quienes-somos",
    dropdown: true,
    sublinks: [
      { name: "Información Institucional", href: "/quienes-somos/informacion-institucional" },
/*       { name: "Historia", href: "/quienes-somos/historia" },
      { name: "Equipo", href: "/quienes-somos/equipo" }, */
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
      /* { name: "Investigación", href: "/investigacion-y-conservacion/investigacion" }, */
      /* { name: "Proyectos", href: "/investigacion-y-conservacion/proyectos" }, */
    ],
  }
];

const ticketLink = {
  name: "Ticketera",
  href: "/purchase-form/ticketera",
};
const DonarLink = {
  name: "Donar",
  href: "/apoyo/donaciones",
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
    <nav className="w-full fixed top-0 z-50 bg-gradient-to-r from-white/90 via-[#e6f7f6]/80 to-white/90 backdrop-blur-md shadow-lg border-b border-gray-200">
      {/* Top bar redes */}
      <TopBarRedes />

      {/* Main navbar */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.img
            src={logo}
            alt="Logo"
            className="h-12 w-auto drop-shadow-[0_2px_8px_rgba(38,183,173,0.10)] group-hover:scale-110 transition-transform duration-200 rounded-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
          <div className="leading-tight flex flex-col">
            <span className="text-base font-extrabold text-gray-800 uppercase tracking-wide group-hover:text-[#26b7ad] transition-colors">Parque Marino</span>
            <span className="text-xs text-gray-600 group-hover:text-[#26b7ad] transition-colors">Del Pacífico</span>
          </div>
        </Link>

        <ul className="hidden md:flex gap-8 items-center flex-1 justify-end pr-10" ref={dropdownRef}>
          {links.map((link, index) => (
            <motion.li
              key={link.name}
              className="relative group mt-4 "
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.07, duration: 0.4, ease: 'easeOut' }}
              whileHover={{ scale: 1.06 }}
            >
              {link.dropdown ? (
                <>
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="flex items-center gap-1 text-gray-800 font-medium hover:text-[#26b7ad] transition relative"
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen === index}
                  >
                    {link.name}
                    <ChevronDownIcon className="w-4 h-4" />
                    <span className="absolute left-0 -bottom-1 w-full h-1 bg-[#26b7ad] shadow-[0_2px_8px_0_rgba(38,183,173,0.15)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200 rounded-full" />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen === index && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 mt-2 w-max bg-white/80 backdrop-blur-2xl shadow-2xl rounded-3xl z-50 border border-gray-100 transition-all duration-200 group-hover:scale-105 group-hover:shadow-[0_8px_32px_0_rgba(38,183,173,0.18)] ring-1 ring-[#26b7ad]/10 py-3 px-1"
                      >
                        <div className="py-2">
                          {link.sublinks.map((sublink) => (
                            <Link
                              key={sublink.href}
                              to={sublink.href}
                              className="block px-5 py-2 text-sm text-gray-700 hover:bg-[#e6f7f6] whitespace-nowrap transition rounded-md"
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
                <Link to={link.href} className="text-gray-800 font-medium hover:text-[#26b7ad] transition relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26b7ad] focus-visible:ring-offset-2">
                  {link.name}
                  <span className="absolute left-0 -bottom-1 w-full h-1 bg-[#26b7ad] shadow-[0_2px_8px_0_rgba(38,183,173,0.15)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200 rounded-full" />
                </Link>
              )}
            </motion.li>
          ))}
        </ul>

        {/* Botón de Ticket y avatar */}
        <div className="hidden md:flex items-center gap-6">
          <span className="h-8 w-px bg-gray-200 mx-2 block rounded-full" />
          <Link
            to={DonarLink.href}
            className="bg-[#26b7ad] hover:bg-[#239e99] transition text-white font-semibold text-sm px-5 py-2.5 rounded-2xl shadow-[0_2px_8px_rgba(38,183,173,0.10)] hover:shadow-[0_8px_32px_0_rgba(38,183,173,0.18)] flex items-center gap-2 focus:ring-2 focus:ring-[#26b7ad] focus:ring-offset-2 focus:outline-none"
          >
            <BiDonateHeart className="w-4 h-4" />
            {DonarLink.name}
          </Link>
          <Link
            to={ticketLink.href}
            className="bg-[#26b7ad] hover:bg-[#239e99] transition text-white font-semibold text-sm px-5 py-2.5 rounded-2xl shadow-[0_2px_8px_rgba(38,183,173,0.10)] hover:shadow-[0_8px_32px_0_rgba(38,183,173,0.18)] flex items-center gap-2 focus:ring-2 focus:ring-[#26b7ad] focus:ring-offset-2 focus:outline-none"
          >
            <Ticket className="w-4 h-4" />
            {ticketLink.name}
          </Link>
          {    isAuthenticated && user ? (
      <div className="relative group">
        <button
          className="flex items-center gap-2 focus:outline-none group/avatar"
          onClick={() => setShowUserDropdown((prev) => !prev)}
          aria-haspopup="true"
          aria-expanded={showUserDropdown ? "true" : "false"}
        >
          <motion.span
            className="rounded-2xl transition-all duration-300 group-hover/avatar:ring-2 group-hover/avatar:ring-[#26b7ad] group-hover/avatar:ring-offset-2 focus-visible:ring-2 focus-visible:ring-[#26b7ad] focus-visible:ring-offset-2"
            whileHover={{ scale: 1.10 }}
            transition={{ type: 'spring', stiffness: 300 }}
            tabIndex={0}
          >
            <Avatar user={user} size={40} />
          </motion.span>
        </button>
      </div>
    ) : null}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Abrir menú" className="p-2 rounded hover:bg-gray-100 transition">
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
            className="md:hidden bg-white px-4 py-4 space-y-4 shadow-xl border-t border-gray-200"
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
                        className="block py-1 text-gray-700 hover:text-[#26b7ad] rounded transition px-2"
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
                      ? "bg-[#26b7ad] text-white font-semibold text-center py-2 rounded-md mt-2 flex items-center justify-center gap-2 shadow-lg"
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
