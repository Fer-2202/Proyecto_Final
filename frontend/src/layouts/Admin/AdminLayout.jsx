import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/admin/ui/AdminSidebar';
import Navbar from '../../components/Navbar/Navbar';
import Loading from '../../pages/Loading';
import { useEffect } from 'react';
import { useLayoutTransition } from '../../context/LayoutTransitionContext';

function AdminLayout() {
  const { isTransitioning, startTransition } = useLayoutTransition();

  useEffect(() => {
    startTransition(1200); // cada vez que este layout monta, lanza la transición
  }, []);

  return (
    <div className="flex">
      <Navbar />
      <main className="min-h-screen bg-[#f3f4f6] mt-24 w-full">
        {isTransitioning ? (
          <Loading text="Cargando panel de administrador..." />
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}

export default AdminLayout;
