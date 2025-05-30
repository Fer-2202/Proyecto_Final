// layouts/PublicLayout.jsx
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

function PublicLayout() {
  return (
    <div>
      <Navbar />
      <main className='min-h-screen'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default PublicLayout
  