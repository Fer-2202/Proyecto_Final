import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/admin/ui/AdminSidebar';
import Navbar from '../../components/Navbar/Navbar';
import Loading from '../../pages/Loading';
import { useEffect } from 'react';
import { useLayoutTransition } from '../../context/LayoutTransitionContext';
// {{change 1}}
import AdminHandlers from '../../components/admin/AdminHandlers';

function AdminLayout() {
  const { isTransitioning, startTransition } = useLayoutTransition();
  // {{change 2}}
    const {
    handleCreateAnimal,
    handleCreateHabitat,
    handleCreateTicket,
    handleCreateSection,
    handleCreateVisit,
    handleCreatePurchaseOrder,
    handleCreateSpecies,
    handleCreateConservationStatus,
    handleCreateProvince,
    handleCreateUserProfile
  } = AdminHandlers();

  useEffect(() => {
    startTransition(1200); // cada vez que este layout monta, lanza la transición
  }, []);

  // {{change 3}}
  const contextValue = {
    handleCreateAnimal,
    handleCreateHabitat,
    handleCreateTicket,
    handleCreateSection,
    handleCreateVisit,
    handleCreatePurchaseOrder,
    handleCreateSpecies,
    handleCreateConservationStatus,
    handleCreateProvince,
    handleCreateUserProfile
  };

  return (
    <div className="flex">
      <Navbar />
      <main className="min-h-screen bg-[#f3f4f6] mt-24 w-full">
       {/* {{change 4}} */}
        <AdminHandlersContext.Provider value={contextValue}>
        {isTransitioning ? (
          <Loading text="Cargando panel de administrador..." />
        ) : (
            <Outlet />
        )}
         </AdminHandlersContext.Provider>
      </main>
    </div>
  );
}
// {{change 5}}
export const AdminHandlersContext = React.createContext(null);
export default AdminLayout;