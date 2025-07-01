import { Outlet } from "react-router-dom";
import Navbar from "@components/Navbar/Navbar";
import Loading from "@pages/Loading";
import { useEffect } from "react";
import { useLayoutTransition } from "@context/LayoutTransitionContext";

function ClientLayout() {
  const { isTransitioning, startTransition } = useLayoutTransition();

  useEffect(() => {
    startTransition(1200); // lanza transición al montar este layout
  }, [startTransition]);

  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-[#fafbfc] mt-24 w-full">
        {isTransitioning ? (
          <Loading text="Cargando panel de cliente..." />
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}

export default ClientLayout;