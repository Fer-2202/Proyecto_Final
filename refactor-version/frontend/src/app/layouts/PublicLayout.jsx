import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/common/Navbar';

function PublicLayout() {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <header className="bg-white shadow-md">
        <Navbar />
      </header>
      
      <main className="px-4 mt-23 py-6 bg-[#fafbfc] overflow-y-auto">
        <Outlet />
      </main>
      
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2024 All rights reserved</p>
      </footer>
    </div>
  );
}

export default PublicLayout;
