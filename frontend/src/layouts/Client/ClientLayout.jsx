// layouts/ClientLayout.jsx
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'

function ClientLayout() {
  return (
    <div>
      <Navbar />
      <main className='min-h-screen bg-[#f3f4f6] mt-24  w-full'>
        <Outlet />
      </main>

    </div>
  )
}

export default ClientLayout
