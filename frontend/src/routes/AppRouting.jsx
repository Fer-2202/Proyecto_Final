import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

/* Layout Publico */
import PublicLayout from '../layouts/Public/PublicLayout.jsx';
import Home from '../pages/Public/Home.jsx';

/* Layout Privado */
import ClientLayout from '../layouts/Client/ClientLayout.jsx';
import ClientHome from '../pages/Clients/Home.jsx';

/* Layout Admin */
import AdminLayout from '../layouts/Admin/AdminLayout.jsx';
import DashboardAdmin from '../pages/Admin/Home.jsx';
import Login from '../pages/Auth/Login.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import Register from '../pages/Auth/Register.jsx'; // Import the Register page
import ForgotPassword from '../pages/Auth/ForgotPassword.jsx'; // Import the ForgotPassword page
import Profile from '../pages/Profile.jsx'; // Import the Profile page
import Loading from '../pages/Loading.jsx'; // Import the Profile page
import InfoInstitucional from '../pages/Public/pages/InfoInstitucional.jsx';

/* Ruta privada */


function AppRouting() {
  return (
    <>
        <BrowserRouter>
            <Routes>

            {/* Rutas Públicas */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} /> {/* Add Register route */}
                <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Add Forgot Password route */}
                <Route path='/quienes-somos/informacion-institucional' element={<InfoInstitucional />} />
                
                
            </Route>

            {/* Rutas Privadas */}
            <Route element={<PrivateRoute>
                              <ClientLayout/> {/* Layout de cliente */}
                            </PrivateRoute>}>

                <Route path="/Client_Dashboard" element={<ClientHome />} />
                <Route path="/profile" element={<Profile />} /> {/* Add Profile route */}
            </Route>

            {/* Rutas Admin */}
            <Route element=
                              {<PrivateRoute>
                              <AdminLayout/> {/* Layout de administrador */}
                            </PrivateRoute>}>
                  <Route path="/admin/dashboard" element={<DashboardAdmin />} />

            </Route>

            <Route  path="/loading" element={<Loading />}/>



            </Routes>
        </BrowserRouter>
    </>
  )
}

export default AppRouting