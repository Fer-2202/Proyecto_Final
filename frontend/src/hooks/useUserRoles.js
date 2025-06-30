import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getRoleById } from '../api/roles';

export const useUserRoles = () => {
  const { user } = useAuth();
  const [roleNames, setRoleNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoleNames = async () => {
      if (!user) {
        setRoleNames([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        let allRoles = [];
        
        // Obtener roles del UserProfile (si existen)
        if (user.roles && user.roles.length > 0) {
          const profileRoleNames = await Promise.all(
            user.roles.map(async (role) => {
              try {
                // Si el rol ya tiene nombre, usarlo directamente
                if (typeof role === 'object' && role.name) {
                  return role.name;
                }
                // Si es solo un ID, obtener el nombre
                const roleData = await getRoleById(role);
                return roleData.name;
              } catch (error) {
                console.error(`Error fetching role ${role}:`, error);
                return null;
              }
            })
          );
          allRoles = [...allRoles, ...profileRoleNames.filter(name => name !== null)];
        }
        
        // Obtener roles del User (groups) - estos son los principales
        if (user.user_roles && user.user_roles.length > 0) {
          const userRoleNames = user.user_roles.map(role => role.name).filter(name => name !== null);
          allRoles = [...allRoles, ...userRoleNames];
        }
        
        // Eliminar duplicados y establecer los nombres
        const uniqueRoles = [...new Set(allRoles)];
        setRoleNames(uniqueRoles);
        
      } catch (error) {
        console.error('Error fetching role names:', error);
        setError(error);
        setRoleNames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRoleNames();
  }, [user]);

  // Helper functions
  const hasRole = (roleName) => {
    return roleNames.some(name => 
      name && name.toLowerCase() === roleName.toLowerCase()
    );
  };

  const isAdmin = () => hasRole('admin');
  const isCliente = () => hasRole('cliente');

  return {
    roleNames,
    loading,
    error,
    hasRole,
    isAdmin,
    isCliente
  };
}; 