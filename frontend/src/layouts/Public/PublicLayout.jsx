import React, { useEffect } from "react";
import { useLayoutTransition } from "../../context/LayoutTransitionContext";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Loading from "../../pages/Loading";

function PublicLayout() {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-[#fafbfc]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;