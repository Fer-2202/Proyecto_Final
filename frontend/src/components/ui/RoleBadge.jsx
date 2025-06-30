import React from 'react';
import { motion } from 'framer-motion';
import { Crown, User, Shield } from 'lucide-react';

const RoleBadge = ({ roleName, size = 'md', className = '' }) => {
  const getRoleConfig = (role) => {
    const roleLower = role?.toLowerCase();
    
    switch (roleLower) {
      case 'admin':
        return {
          icon: <Crown size={14} />,
          bgColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
          textColor: 'text-white',
          borderColor: 'border-purple-200'
        };
      case 'cliente':
        return {
          icon: <User size={14} />,
          bgColor: 'bg-gradient-to-r from-blue-500 to-cyan-500',
          textColor: 'text-white',
          borderColor: 'border-blue-200'
        };
      default:
        return {
          icon: <Shield size={14} />,
          bgColor: 'bg-gradient-to-r from-gray-500 to-gray-600',
          textColor: 'text-white',
          borderColor: 'border-gray-200'
        };
    }
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const config = getRoleConfig(roleName);
  const displayName = roleName || 'Sin rol';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1.5 rounded-full border ${config.bgColor} ${config.textColor} ${config.borderColor} ${sizes[size]} font-medium shadow-sm ${className}`}
    >
      {config.icon}
      <span className="capitalize">{displayName}</span>
    </motion.div>
  );
};

export default RoleBadge; 