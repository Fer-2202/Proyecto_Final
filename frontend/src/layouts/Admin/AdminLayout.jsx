
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../../components/admin/ui/AdminSidebar'
import Navbar from '../../components/Navbar/Navbar'

function AdminLayout() {
  return (
    <div className="flex">
      <Navbar />
      <main className="min-h-screen bg-[#f3f4f6] mt-24 mb-45 w-full">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
