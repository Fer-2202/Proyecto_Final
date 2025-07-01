import React from "react";
import { Outlet } from "react-router-dom";
import Loading from "@pages/Loading";
import { useEffect } from "react";
import { useLayoutTransition } from "@context/LayoutTransitionContext";

function AdminLayout() {
  const { isTransitioning, startTransition } = useLayoutTransition();

  useEffect(() => {
    startTransition(800); // Reducir el tiempo de transición
  }, []);

  return (
    <div className="min-h-screen">
      {isTransitioning ? (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          <Loading text="Cargando panel de administrador..." />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
}

export default AdminLayout;