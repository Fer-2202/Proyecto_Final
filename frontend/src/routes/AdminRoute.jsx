import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUserRoles } from '../hooks/useUserRoles';
import Loading from '../pages/Loading';
import AccessDenied from '../pages/AccessDenied';

export default function AdminRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const { isAdmin, loading } = useUserRoles();

  if (loading) {
    return <Loading text="Verificando permisos..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin()) {
    return <AccessDenied />;
  }

  return children;
} 