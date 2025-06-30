import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Shield } from 'lucide-react';
import RoleBadge from './RoleBadge';
import { useUserRoles } from '../../hooks/useUserRoles';

const UserInfo = ({ user, showRoles = true, className = '' }) => {
  const { roleNames, loading: rolesLoading } = useUserRoles();

  if (!user) {
    return (
      <div className={`bg-gray-50 rounded-lg p-4 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <User size={20} className="text-gray-400" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Usuario no disponible</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-lg border border-gray-200 p-4 shadow-sm ${className}`}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
          {user.profile_picture ? (
            <img 
              src={user.profile_picture} 
              alt={user.first_name || user.username}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span>
              {user.first_name?.charAt(0) || user.username?.charAt(0) || 'U'}
            </span>
          )}
        </div>

        {/* User Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 truncate">
              {user.first_name && user.last_name 
                ? `${user.first_name} ${user.last_name}`
                : user.username
              }
            </h3>
            {showRoles && !rolesLoading && roleNames.length > 0 && (
              <div className="flex gap-1">
                {roleNames.map((roleName, index) => (
                  <RoleBadge 
                    key={index} 
                    roleName={roleName} 
                    size="sm"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-1">
            {user.email && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail size={14} />
                <span className="truncate">{user.email}</span>
              </div>
            )}
            
            {user.created_at && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar size={14} />
                <span>Miembro desde {new Date(user.created_at).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          {showRoles && rolesLoading && (
            <div className="flex items-center gap-2 mt-2">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-gray-500">Cargando roles...</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default UserInfo; 