import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { User, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@context/AuthContext";
import { useUserRoles } from "@hooks/useUserRoles";
import { getAbsoluteMediaUrl } from "@utils/getAbsoluteMediaUrl";

function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
}

export default function Avatar({ user, size = 40, className = "", onLogout }) {
  const { logout } = useAuth();
  const { isAdmin, loading: rolesLoading } = useUserRoles();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const initials =
    `${user?.first_name?.[0] || ""}${user?.last_name?.[0] || ""}`.toUpperCase();
  const bgColor = stringToColor(user?.email || user?.username || "avatar");

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`flex items-center gap-2 focus:outline-none ${className}`}
        onClick={() => setShowDropdown((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={showDropdown ? "true" : "false"}
      >
        {user?.profile_picture ? (
          <img
            src={getAbsoluteMediaUrl(user.profile_picture)}
            alt={user.first_name || user.username}
            className="rounded-full object-cover border-2 border-white shadow"
            style={{ width: size, height: size }}
          />
        ) : (
          <div
            className="rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow"
            style={{ width: size, height: size, background: bgColor }}
            title={user?.first_name || user?.username}
          >
            {initials || <span>U</span>}
          </div>
        )}
      </button>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden"
          >
            {!rolesLoading && isAdmin() && (
              <Link
                to="/admin/dashboard"
                className="flex items-center px-5 py-3 text-sm text-gray-800 hover:bg-[#e6f7f6] hover:text-[#1cb6b0] transition"
                onClick={() => setShowDropdown(false)}
              >
                <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
              </Link>
            )}
            <Link
              to="/profile"
              className="flex items-center px-5 py-3 text-sm text-gray-800 hover:bg-[#e6f7f6] hover:text-[#1cb6b0] transition"
              onClick={() => setShowDropdown(false)}
            >
              <User className="w-4 h-4 mr-2" /> Perfil de usuario
            </Link>
            <button
              className="flex items-center w-full text-left px-5 py-3 text-sm text-gray-800 hover:bg-[#e6f7f6] hover:text-[#1cb6b0] transition"
              onClick={() => {
                handleLogout();
                onLogout?.();
                setShowDropdown(false);
              }}
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}