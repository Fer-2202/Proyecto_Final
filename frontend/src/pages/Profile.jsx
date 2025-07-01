import React, { useEffect, useState, useRef } from "react";
import {
  getCurrentUserProfile,
  updateCurrentUserProfile,
} from "@api/userProfile";
import { useAuth } from "@context/AuthContext";
import { useUserRoles } from "@hooks/useUserRoles";
import Loading from "@pages/Loading";
import { AnimatePresence, motion } from "framer-motion";
import { getProvinces } from "@api/provinces";
import {
  LogOut,
  User,
  Shield,
  SlidersHorizontal,
  Ticket,
  MapPin,
  Camera,
  Edit3,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Calendar,
  Phone,
  Mail,
  MapPin as LocationIcon,
  FileText,
  Eye,
  EyeOff,
  Bell,
  Globe,
  DollarSign,
  Download,
  Upload,
} from "lucide-react";
import RoleBadge from "@components/ui/RoleBadge";
import { getAbsoluteMediaUrl } from "@utils/getAbsoluteMediaUrl";

export default function Profile() {
  const { user, isAuthenticated, logout } = useAuth();
  const {
    roleNames,
    isAdmin,
    isCliente,
    loading: rolesLoading,
  } = useUserRoles();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [saveLoading, setSaveLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    newsletter: true,
    smsNotifications: false,
    language: "es",
    currency: "CRC",
  });
  const fileInputRef = useRef(null);

  const tabs = [
    {
      key: "personal",
      label: "Personal",
      icon: <User size={18} />,
      description: "Información básica de tu cuenta",
    },
    {
      key: "seguridad",
      label: "Seguridad",
      icon: <Shield size={18} />,
      description: "Contraseña y sesiones",
    },
    {
      key: "preferencias",
      label: "Preferencias",
      icon: <SlidersHorizontal size={18} />,
      description: "Configuración personal",
    },
    {
      key: "entradas",
      label: "Mis Entradas",
      icon: <Ticket size={18} />,
      description: "Historial de visitas",
    },
  ];

  const handleLogout = () => {
    logout();
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        setSaveLoading(true);
        // Usar FormData para enviar el archivo real
        const formData = new FormData();
        formData.append("profile_picture", file);
        // Si el usuario está editando otros campos, agrega aquí:
        if (profileData) {
          if (profileData.first_name)
            formData.append("first_name", profileData.first_name);
          if (profileData.last_name)
            formData.append("last_name", profileData.last_name);
          if (profileData.phone) formData.append("phone", profileData.phone);
          if (profileData.address)
            formData.append("address", profileData.address);
          if (profileData.birth_date)
            formData.append("birth_date", profileData.birth_date);
          if (profileData.bio) formData.append("bio", profileData.bio);
          if (profileData.province)
            formData.append("province", profileData.province);
        }
        await updateCurrentUserProfile(formData, setSaveLoading);
        const updatedProfile = await getCurrentUserProfile();
        setProfileData(updatedProfile);
        setSuccess("Imagen de perfil actualizada exitosamente");
      } catch (error) {
        console.error("Error uploading image:", error);
        setError("Error al subir la imagen de perfil");
      } finally {
        setSaveLoading(false);
      }
    }
  };

  const handleSaveProfile = async () => {
    try {
      setSaveLoading(true);
      setError(null);
      setSuccess(null);

      const updatedData = {
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        phone: profileData.phone,
        address: profileData.address,
        birth_date: profileData.birth_date,
        bio: profileData.bio,
        province: profileData.province,
      };

      await updateCurrentUserProfile(updatedData, setSaveLoading);
      const updatedProfile = await getCurrentUserProfile();
      setProfileData(updatedProfile);
      setIsEditing(false);
      setSuccess("Perfil actualizado exitosamente");

      // Auto-hide success message
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Error al actualizar el perfil. Por favor, intenta de nuevo.");
    } finally {
      setSaveLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setError("La nueva contraseña debe tener al menos 8 caracteres");
      return;
    }

    try {
      setSaveLoading(true);
      setError(null);
      // Here you would call the password change API
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setSuccess("Contraseña actualizada exitosamente");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setError("Error al cambiar la contraseña");
    } finally {
      setSaveLoading(false);
    }
  };

  const handlePreferencesSave = async () => {
    try {
      setSaveLoading(true);
      // Here you would save preferences to backend
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setSuccess("Preferencias guardadas exitosamente");
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setError("Error al guardar las preferencias");
    } finally {
      setSaveLoading(false);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!isAuthenticated || !user) {
        setLoading(true);
        return;
      }
      try {
        const data = await getCurrentUserProfile(setLoading);
        setProfileData(data);

        // Fetch provinces
        const provincesData = await getProvinces();
        setProvinces(provincesData);
      } catch (err) {
        console.error(err);
        setError("Error al cargar el perfil.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, user]);

  if (loading) return <Loading isVisible={true} text="Cargando tu perfil..." />;
  if (!isAuthenticated || !profileData)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <User size={32} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            Acceso Requerido
          </h2>
          <p className="text-gray-500">Inicia sesión para ver tu perfil</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Success/Error Messages */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
          >
            <CheckCircle size={20} />
            {success}
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
          >
            <AlertCircle size={20} />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
            <p className="text-gray-600">
              Gestiona tu información personal y preferencias
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
                {/* Profile Card */}
                <div className="text-center mb-8">
                  <div className="relative inline-block mb-4">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold overflow-hidden shadow-lg">
                      {profileData.profile_picture ? (
                        <img
                          src={getAbsoluteMediaUrl(profileData.profile_picture)}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>
                          {user.first_name?.charAt(0) ||
                            user.username?.charAt(0) ||
                            "U"}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={saveLoading}
                      className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg"
                    >
                      <Camera size={16} />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    {user.first_name} {user.last_name}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">{user.email}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {roleNames.length > 0 ? (
                      roleNames.map((roleName, index) => (
                        <RoleBadge key={index} roleName={roleName} size="sm" />
                      ))
                    ) : (
                      <RoleBadge roleName="Sin rol asignado" size="sm" />
                    )}
                  </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-2 ">
                  {tabs.map((tab, index) => (
                    <motion.button
                      key={tab.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => {
                        setActiveTab(tab.key);
                        setIsEditing(false);
                        setError(null);
                        setSuccess(null);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                        activeTab === tab.key
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {tab.icon}
                      <div>
                        <div className="font-medium">{tab.label}</div>
                        <div
                          className={`text-xs ${activeTab === tab.key ? "text-blue-100" : "text-gray-400"}`}
                        >
                          {tab.description}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </nav>

                {/* Logout Button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={handleLogout}
                  className="w-full mt-8 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                >
                  <LogOut size={18} />
                  Cerrar sesión
                </motion.button>
              </div>
            </motion.aside>

            {/* Main Content */}
            <motion.main
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Tab Headers */}
                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                  <div className="flex space-x-8 gap-4">
                    {tabs.map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => {
                          setActiveTab(tab.key);
                          setIsEditing(false);
                          setError(null);
                          setSuccess(null);
                        }}
                        className={`relative pb-2 transition-colors duration-200 ${
                          activeTab === tab.key
                            ? "text-blue-600 font-semibold"
                            : "text-gray-500 hover:text-blue-600"
                        }`}
                      >
                        {tab.label}
                        {activeTab === tab.key && (
                          <motion.div
                            layoutId="underline"
                            className="absolute left-0 right-0 h-0.5 bg-blue-600 bottom-0"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* PERSONAL TAB */}
                      {activeTab === "personal" && (
                        <div className="space-y-6">
                          <div className="flex justify-between items-center">
                            <div>
                              <h2 className="text-2xl font-bold text-gray-900">
                                Información Personal
                              </h2>
                              <p className="text-gray-600">
                                Actualiza tu información personal y de contacto
                              </p>
                            </div>
                            {!isEditing ? (
                              <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                              >
                                <Edit3 size={16} />
                                Editar
                              </button>
                            ) : (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setIsEditing(false)}
                                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                  disabled={saveLoading}
                                >
                                  <X size={16} />
                                  Cancelar
                                </button>
                                <button
                                  onClick={handleSaveProfile}
                                  disabled={saveLoading}
                                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-lg disabled:opacity-50"
                                >
                                  <Save size={16} />
                                  {saveLoading ? "Guardando..." : "Guardar"}
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Basic Information */}
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <User size={20} className="text-blue-600" />
                                Información Básica
                              </h3>

                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nombre
                                  </label>
                                  <input
                                    type="text"
                                    disabled={isCliente() || !isEditing}
                                    value={profileData.first_name || ""}
                                    onChange={(e) => {
                                      if (!isCliente() && isEditing) {
                                        setProfileData({
                                          ...profileData,
                                          first_name: e.target.value,
                                        });
                                      }
                                    }}
                                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 ${
                                      isCliente() || !isEditing
                                        ? "bg-gray-50 text-gray-500"
                                        : "focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    }`}
                                  />
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Apellido
                                  </label>
                                  <input
                                    type="text"
                                    disabled={isCliente() || !isEditing}
                                    value={profileData.last_name || ""}
                                    onChange={(e) => {
                                      if (!isCliente() && isEditing) {
                                        setProfileData({
                                          ...profileData,
                                          last_name: e.target.value,
                                        });
                                      }
                                    }}
                                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 ${
                                      isCliente() || !isEditing
                                        ? "bg-gray-50 text-gray-500"
                                        : "focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    }`}
                                  />
                                </div>

                                <div>
                                  <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                                    <Mail size={16} />
                                    Email
                                  </label>
                                  <input
                                    type="email"
                                    value={user.email}
                                    disabled={true}
                                    className="w-full px-4 py-3 border rounded-lg bg-gray-50 text-gray-500"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <Phone size={20} className="text-green-600" />
                                Información de Contacto
                              </h3>

                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Teléfono
                                  </label>
                                  <input
                                    type="tel"
                                    disabled={isCliente() || !isEditing}
                                    value={profileData.phone || ""}
                                    onChange={(e) => {
                                      if (!isCliente() && isEditing) {
                                        setProfileData({
                                          ...profileData,
                                          phone: e.target.value,
                                        });
                                      }
                                    }}
                                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 ${
                                      isCliente() || !isEditing
                                        ? "bg-gray-50 text-gray-500"
                                        : "focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    }`}
                                  />
                                </div>

                                <div>
                                  <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                                    <Calendar size={16} />
                                    Fecha de Nacimiento
                                  </label>
                                  <input
                                    type="date"
                                    disabled={isCliente() || !isEditing}
                                    value={profileData.birth_date || ""}
                                    onChange={(e) => {
                                      if (!isCliente() && isEditing) {
                                        setProfileData({
                                          ...profileData,
                                          birth_date: e.target.value,
                                        });
                                      }
                                    }}
                                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 ${
                                      isCliente() || !isEditing
                                        ? "bg-gray-50 text-gray-500"
                                        : "focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    }`}
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Location Information */}
                            <div className="md:col-span-2 space-y-4">
                              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <LocationIcon
                                  size={20}
                                  className="text-purple-600"
                                />
                                Ubicación
                              </h3>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Provincia
                                  </label>
                                  <select
                                    disabled={isCliente() || !isEditing}
                                    value={profileData.province || ""}
                                    onChange={(e) => {
                                      if (!isCliente() && isEditing) {
                                        setProfileData({
                                          ...profileData,
                                          province: e.target.value,
                                        });
                                      }
                                    }}
                                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 ${
                                      isCliente() || !isEditing
                                        ? "bg-gray-50 text-gray-500"
                                        : "focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    }`}
                                  >
                                    <option value="">
                                      Seleccionar provincia
                                    </option>
                                    {provinces.map((province) => (
                                      <option
                                        key={province.id}
                                        value={province.id}
                                      >
                                        {province.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Dirección
                                  </label>
                                  <input
                                    type="text"
                                    disabled={isCliente() || !isEditing}
                                    value={profileData.address || ""}
                                    onChange={(e) => {
                                      if (!isCliente() && isEditing) {
                                        setProfileData({
                                          ...profileData,
                                          address: e.target.value,
                                        });
                                      }
                                    }}
                                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 ${
                                      isCliente() || !isEditing
                                        ? "bg-gray-50 text-gray-500"
                                        : "focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    }`}
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Bio */}
                            <div className="md:col-span-2 space-y-4">
                              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <FileText
                                  size={20}
                                  className="text-orange-600"
                                />
                                Biografía
                              </h3>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Cuéntanos sobre ti
                                </label>
                                <textarea
                                  disabled={isCliente() || !isEditing}
                                  value={profileData.bio || ""}
                                  onChange={(e) => {
                                    if (!isCliente() && isEditing) {
                                      setProfileData({
                                        ...profileData,
                                        bio: e.target.value,
                                      });
                                    }
                                  }}
                                  placeholder="Comparte algo sobre ti, tus intereses, o tu experiencia con el parque marino..."
                                  rows={4}
                                  className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 resize-none ${
                                    isCliente() || !isEditing
                                      ? "bg-gray-50 text-gray-500"
                                      : "focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  }`}
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                  {profileData.bio?.length || 0}/500 caracteres
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SECURITY TAB */}
                      {activeTab === "seguridad" && (
                        <div className="space-y-8">
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                              Seguridad
                            </h2>
                            <p className="text-gray-600">
                              Gestiona tu contraseña y sesiones activas
                            </p>
                          </div>

                          {/* Password Change */}
                          <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                              Cambiar Contraseña
                            </h3>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Contraseña Actual
                                </label>
                                <div className="relative">
                                  <input
                                    type={showPassword ? "text" : "password"}
                                    value={passwordData.currentPassword}
                                    onChange={(e) =>
                                      setPasswordData({
                                        ...passwordData,
                                        currentPassword: e.target.value,
                                      })
                                    }
                                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                                  />
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                  >
                                    {showPassword ? (
                                      <EyeOff size={20} />
                                    ) : (
                                      <Eye size={20} />
                                    )}
                                  </button>
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Nueva Contraseña
                                </label>
                                <input
                                  type="password"
                                  value={passwordData.newPassword}
                                  onChange={(e) =>
                                    setPasswordData({
                                      ...passwordData,
                                      newPassword: e.target.value,
                                    })
                                  }
                                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Confirmar Nueva Contraseña
                                </label>
                                <input
                                  type="password"
                                  value={passwordData.confirmPassword}
                                  onChange={(e) =>
                                    setPasswordData({
                                      ...passwordData,
                                      confirmPassword: e.target.value,
                                    })
                                  }
                                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                              </div>

                              <button
                                onClick={handlePasswordChange}
                                disabled={
                                  saveLoading ||
                                  !passwordData.currentPassword ||
                                  !passwordData.newPassword ||
                                  !passwordData.confirmPassword
                                }
                                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {saveLoading
                                  ? "Actualizando..."
                                  : "Actualizar Contraseña"}
                              </button>
                            </div>
                          </div>

                          {/* Active Sessions */}
                          <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                              Sesiones Activas
                            </h3>
                            <div className="space-y-3">
                              <div className="bg-white p-4 rounded-lg border flex justify-between items-center">
                                <div>
                                  <p className="font-medium text-gray-900">
                                    Sesión Actual
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    San José, Costa Rica • Chrome en Windows
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    Última actividad: hace 5 minutos
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <span className="text-sm text-green-600 font-medium">
                                    Activa
                                  </span>
                                </div>
                              </div>

                              <div className="bg-white p-4 rounded-lg border flex justify-between items-center">
                                <div>
                                  <p className="font-medium text-gray-900">
                                    Móvil - iPhone
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    San José, Costa Rica • Safari en iOS
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    Última actividad: hace 2 horas
                                  </p>
                                </div>
                                <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                                  Cerrar sesión
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* PREFERENCES TAB */}
                      {activeTab === "preferencias" && (
                        <div className="space-y-8">
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                              Preferencias
                            </h2>
                            <p className="text-gray-600">
                              Personaliza tu experiencia en el parque marino
                            </p>
                          </div>

                          {/* Notifications */}
                          <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                              <Bell size={20} className="text-blue-600" />
                              Notificaciones
                            </h3>
                            <div className="space-y-4">
                              {[
                                {
                                  key: "emailNotifications",
                                  label: "Notificaciones por Email",
                                  description:
                                    "Recibe actualizaciones importantes por correo electrónico",
                                },
                                {
                                  key: "newsletter",
                                  label: "Boletín Informativo",
                                  description:
                                    "Recibe noticias y eventos del parque marino",
                                },
                                {
                                  key: "smsNotifications",
                                  label: "Notificaciones SMS",
                                  description:
                                    "Recibe alertas importantes por mensaje de texto",
                                },
                              ].map((notification) => (
                                <label
                                  key={notification.key}
                                  className="flex items-start gap-3 p-4 bg-white rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    checked={preferences[notification.key]}
                                    onChange={(e) =>
                                      setPreferences({
                                        ...preferences,
                                        [notification.key]: e.target.checked,
                                      })
                                    }
                                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                  />
                                  <div>
                                    <div className="font-medium text-gray-900">
                                      {notification.label}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {notification.description}
                                    </div>
                                  </div>
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* Language and Region */}
                          <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                              <Globe size={20} className="text-green-600" />
                              Idioma y Región
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Idioma
                                </label>
                                <select
                                  value={preferences.language}
                                  onChange={(e) =>
                                    setPreferences({
                                      ...preferences,
                                      language: e.target.value,
                                    })
                                  }
                                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                  <option value="es">Español</option>
                                  <option value="en">English</option>
                                </select>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                                  <DollarSign size={16} />
                                  Moneda
                                </label>
                                <select
                                  value={preferences.currency}
                                  onChange={(e) =>
                                    setPreferences({
                                      ...preferences,
                                      currency: e.target.value,
                                    })
                                  }
                                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                  <option value="CRC">
                                    Colón Costarricense (₡)
                                  </option>
                                  <option value="USD">
                                    Dólar Estadounidense ($)
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>

                          {/* Data Export */}
                          <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                              <Download size={20} className="text-purple-600" />
                              Exportar Datos
                            </h3>
                            <p className="text-gray-600 mb-4">
                              Descarga una copia de tus datos personales en
                              formato JSON
                            </p>
                            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                              <Download size={16} />
                              Exportar Datos
                            </button>
                          </div>

                          <div className="flex justify-end">
                            <button
                              onClick={handlePreferencesSave}
                              disabled={saveLoading}
                              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                              <Save size={16} />
                              {saveLoading
                                ? "Guardando..."
                                : "Guardar Preferencias"}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* TICKETS TAB */}
                      {activeTab === "entradas" && (
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                              Mis Entradas
                            </h2>
                            <p className="text-gray-600">
                              Historial de tus visitas al parque marino
                            </p>
                          </div>

                          <div className="bg-gray-50 rounded-xl p-8 text-center">
                            <Ticket
                              size={48}
                              className="mx-auto text-gray-400 mb-4"
                            />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              Próximamente
                            </h3>
                            <p className="text-gray-600">
                              Aquí podrás ver el historial de todas tus entradas
                              y visitas al parque marino.
                            </p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.main>
          </div>
        </div>
      </div>
    </div>
  );
}