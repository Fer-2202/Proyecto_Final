import React, { useEffect, useState } from 'react';
import { getUserProfileById, updateUserProfile } from '../api/userProfile';
import { useAuth } from '../context/AuthContext';
import Loading from '../pages/Loading';
import { AnimatePresence, motion } from 'framer-motion';
import { getRoleById } from '../api/roles';
import { LogOut, User, Shield, SlidersHorizontal, Ticket } from 'lucide-react';

export default function Profile() {
  const { user, isAuthenticated, logout } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [roleNames, setRoleNames] = useState([]);

  console.log(profileData);
  console.log(user);

  const tabs = [
    { key: 'personal', label: 'Personal', icon: <User size={16} /> },
    { key: 'seguridad', label: 'Seguridad', icon: <Shield size={16} /> },
    { key: 'preferencias', label: 'Preferencias', icon: <SlidersHorizontal size={16} /> },
    { key: 'entradas', label: 'Mis Entradas', icon: <Ticket size={16} /> }
  ];

  const handleLogout = () => {
    logout();
  };

  const handleSaveProfile = async () => {
    try {
      const updatedData = {
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        phone: profileData.phone,
        address: profileData.address,
        birth_date: profileData.birth_date
      };
      await updateUserProfile(user.id, updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Error al actualizar el perfil.');
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!isAuthenticated || !user) {
        setLoading(true);
        return;
      }
      try {
        const data = await getUserProfileById(user.id);
        setLoading(false);
        setProfileData(data);
        // Fetch role names if roles exist
        if (data.roles && data.roles.length > 0) {
          const names = await Promise.all(data.roles.map(async (roleId) => {
            try {
              const role = await getRoleById(roleId);
              return role.name;
            } catch {
              return roleId;
            }
          }));
          setRoleNames(names);
        } else {
          setRoleNames([]);
        }
      } catch (err) {
        console.error(err);
        setError('Error al cargar el perfil.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, user]);

 /*  if (loading) return <Loading isVisible={true} text="Cargando tu perfil..." />; */
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600 text-lg font-semibold">{error}</div>;
  if (!isAuthenticated || !profileData) return <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">Inicia sesión para ver tu perfil.</div>;

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4 md:px-8 animate-fadeIn">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        {/* SIDEBAR */}
        <aside className="w-full md:w-64 bg-[#0F172A] text-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
          <div>
            <div className="flex flex-col items-center text-center space-y=2 mb-6 group">
              <div className="w-20 h-20 rounded-full bg-blue=600 text-white flex items-center justify-center text-3xl font-bold transition-transform group-hover:scale-105">
                {user.first_name?.[0]}{user.last_name?.[0] || 'U'}
              </div>
              <h2 className="text-lg font-bold">{user.first_name} {user.last_name}</h2>
              <p className="text-sm text-gray-400">{user.email}</p>
              <p className="text-xs text-gray-500">{
                (roleNames && roleNames.length > 0) ? roleNames.join(', ') : 'Sin rol asignado'
              }</p>
            </div>

            <nav className="flex flex-col space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key);
                    setIsEditing(false);
                  }}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                    activeTab === tab.key
                      ? 'bg-blue-600 text-white shadow-inner'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <button
            onClick={handleLogout}
            className="mt-8 flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 border border-red-400 hover:bg-red-500 hover:text-white transition"
          >
            <LogOut size={16} /> Cerrar sesión
          </button>
        </aside>

        {/* CONTENIDO */}
        <section className="flex-1 bg-white p-6 rounded-xl shadow-lg">
          <div className="mb-6 border-b pb-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#0F172A]">Mi Perfil</h1>
          </div>

          <div className="flex mb-6 space-x-6 border-b text-sm font-medium">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  setIsEditing(false);
                }}
                className={`relative pb-2 transition-colors duration-200 ${
                  activeTab === tab.key
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-500 hover:text-blue-600'
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

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* PERSONAL */}
              {activeTab === 'personal' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Información Personal</h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 text-sm border rounded-lg text-blue-600 border-blue-600 hover:bg-blue-50 transition"
                      >
                        Editar
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px=4 py-2 text-sm border rounded-lg text-gray-600 border-gray-400 hover:bg-gray-100 transition"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={handleSaveProfile}
                          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                          Guardar
                        </button>
                      </div>
                    )}
                  </div>

                  <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: 'Nombre completo', value: `${user.first_name} ${user.last_name || ''}`, disabled: !isEditing },
                      { label: 'Nombre', value: profileData.first_name || '', disabled: !isEditing },
                      { label: 'Email', value: user.email, disabled: true },
                      { label: 'Teléfono', value: profileData.phone || '', disabled: !isEditing, field: 'phone' },
                      { label: 'Fecha de nacimiento', value: profileData.birth_date ? new Date(profileData.birth_date).toLocaleDateString('es-ES') : '', disabled: !isEditing, field: 'birth_date' },
                      { label: 'Dirección', value: profileData.address || '', disabled: !isEditing, full: true, field: 'address' }
                    ].map((field, idx) => (
                      <div key={idx} className={field.full ? 'md:col-span-2' : ''}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                        <input
                          type="text"
                          disabled={field.disabled}
                          value={field.value}
                          onChange={(e) => {
                            if (field.field) {
                              setProfileData({
                                ...profileData,
                                [field.field]: e.target.value
                              });
                            }
                          }}
                          placeholder={field.label}
                          className={`w-full px-4 py-2 border rounded-lg transition-all duration-200 ${
                            field.disabled
                              ? 'bg-gray-100 text-gray-500'
                              : 'focus:ring-2 focus:ring-blue-500 focus:bg-white'
                          }`}
                        />
                      </div>
                    ))}
                  </form>
                </div>
              )}

              {/* SEGURIDAD */}
              {activeTab === 'seguridad' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Seguridad</h2>
                  <form className="space-y-6">
                    {['Contraseña actual', 'Nueva contraseña', 'Confirmar nueva contraseña'].map((label, idx) => (
                      <div key={idx}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                        <input type="password" placeholder={label} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                      </div>
                    ))}
                    <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                      Actualizar contraseña
                    </button>
                  </form>

                  <div className="mt-10">
                    <h3 className="font-semibold text-gray-700 mb-2">Sesiones activas</h3>
                    <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="text-sm">Sesión actual</p>
                        <p className="text-xs text-gray-500">San José, Costa Rica • Chrome en Windows</p>
                      </div>
                      <button type="button" className="text-sm text-red-600 hover:underline" onClick={handleLogout}>
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* PREFERENCIAS */}
              {activeTab === 'preferencias' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Preferencias</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Notificaciones</h3>
                      {['Notificaciones por email', 'Boletín informativo', 'Notificaciones SMS'].map((label, idx) => (
                        <label key={idx} className="flex items-center gap-3 mt-2 text-sm">
                          <input type="checkbox" defaultChecked={idx < 2} className="h-4 w-4 text-blue-600 focus:ring-blue-500" />
                          {label}
                        </label>
                      ))}
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Idioma y región</h3>
                      <div className="flex flex-wrap gap-4 mt-2">
                        {[
                          { label: 'Idioma', options: ['Español'] },
                          { label: 'Moneda', options: ['Colón Costarricense (₡)'] }
                        ].map((field, idx) => (
                          <div key={idx}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                            <select className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500">
                              {field.options.map(opt => (
                                <option key={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>
                        ))}
                      </div>
                      <button className="mt-4 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        <SlidersHorizontal size={16} /> Guardar preferencias
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}