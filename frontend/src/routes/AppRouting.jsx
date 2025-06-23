import React, { Suspense } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* Layout Publico */
const PublicLayout = React.lazy(() => import('../layouts/Public/PublicLayout.jsx'));
const Home = React.lazy(() => import('../pages/Public/Home.jsx'));

/* Layout Privado */
const ClientLayout = React.lazy(() => import('../layouts/Client/ClientLayout.jsx'));
const ClientHome = React.lazy(() => import('../pages/Clients/Home.jsx'));

/* Layout Admin */
const AdminLayout = React.lazy(() => import('../layouts/Admin/AdminLayout.jsx'));
const DashboardAdmin = React.lazy(() => import('../pages/Admin/Home.jsx'));
const LogsAdmin = React.lazy(() => import('../pages/Admin/Logs.jsx'));

/* Auth */
const Login = React.lazy(() => import('../pages/Auth/Login.jsx'));
const Register = React.lazy(() => import('../pages/Auth/Register.jsx'));
const ForgotPassword = React.lazy(() => import('../pages/Auth/ForgotPassword.jsx'));
const PrivateRoute = React.lazy(() => import('./PrivateRoute.jsx'));

/* Pages */
const Profile = React.lazy(() => import('../pages/Profile.jsx'));
const Loading = React.lazy(() => import('../pages/Loading.jsx'));
const InfoInstitucional = React.lazy(() => import('../pages/Public/pages/Quienes_Somos/Pages/Info_Institucional.jsx'));
const Historia = React.lazy(() => import('../pages/Public/pages/Quienes_Somos/Pages/Historia.jsx'));
const Equipo = React.lazy(() => import('../pages/Public/pages/Quienes_Somos/Pages/Equipo.jsx'));
const TransparenciaInstitucional = React.lazy(() => import('../pages/Public/pages/Quienes_Somos/Pages/Transparencia_Institucional.jsx'));
const Exhibiciones = React.lazy(() => import('../pages/Public/pages/Exhibiciones_Y_Servicios/Pages/Exhibiciones.jsx'));
const ServiciosEducativos = React.lazy(() => import('../pages/Public/pages/Exhibiciones_Y_Servicios/Pages/Servicio_Educativo.jsx'));
const VisitasGuiadas = React.lazy(() => import('../pages/Public/pages/Exhibiciones_Y_Servicios/Pages/Visita_Guiada.jsx'));
const AcuiculturaYBiotecnologiaMarina = React.lazy(() => import('../pages/Public/pages/Investigacion_Y_Conservacion/Pages/Acuicultura_Y_Biotecnologia_Marina.jsx'));
const CentroDeRescateYRehabilitacion = React.lazy(() => import('../pages/Public/pages/Investigacion_Y_Conservacion/Pages/Centro_De_Rescate_Y_Rehabilitacion.jsx'));
const Investigacion = React.lazy(() => import('../pages/Public/pages/Investigacion_Y_Conservacion/Pages/Investigacion.jsx'));
const Proyectos = React.lazy(() => import('../pages/Public/pages/Investigacion_Y_Conservacion/Pages/Proyecto.jsx'));
const Voluntariado = React.lazy(() => import('../pages/Public/pages/Apoyo/Pages/Voluntariado.jsx'));
const Donacion = React.lazy(() => import('../pages/Public/pages/Apoyo/Pages/Donacion.jsx'));
const Ticketera = React.lazy(() => import('../pages/Public/pages/Ticketera.jsx'));
const Terminos = React.lazy(() => import('../pages/Public/pages/Termino_Y_Condiciones.jsx'));
const PoliticaDePrivacidad = React.lazy(() => import('../pages/Public/pages/Politica_De_Privacidad.jsx'));






function AppRouting() {
  

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={5000} />
      <Suspense fallback={<Loading />}>
        <Routes>

          {/* Rutas Publicas */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/quienes-somos/informacion-institucional" element={<InfoInstitucional />} />
            <Route path="/quienes-somos/historia" element={<Historia />} />
            <Route path="/quienes-somos/equipo" element={<Equipo />} />
            <Route path="/quienes-somos/transparencia-institucional" element={<TransparenciaInstitucional />} />
            <Route path="/exhibiciones-y-servicios/exhibiciones" element={<Exhibiciones />} />
            <Route path="/exhibiciones-y-servicios/servicios-educativos" element={<ServiciosEducativos />} />
            <Route path="/exhibiciones-y-servicios/visitas-guiadas" element={<VisitasGuiadas />} />
            <Route path="/investigacion-y-conservacion/acuicultura-y-biotecnologia-marina" element={<AcuiculturaYBiotecnologiaMarina />} />
            <Route path="/investigacion-y-conservacion/centro-de-rescate-y-rehabilitacion" element={<CentroDeRescateYRehabilitacion />} />
            <Route path="/investigacion-y-conservacion/investigacion" element={<Investigacion />} />
            <Route path="/investigacion-y-conservacion/proyectos" element={<Proyectos />} />
            <Route path="/apoyo/voluntariado" element={<Voluntariado />} />
            <Route path="/apoyo/donaciones" element={<Donacion />} />
            <Route path="/purchase-form/ticketera" element={<Ticketera />} />
            <Route path="/terminos-y-condiciones/terminos" element={<Terminos />} />
            <Route path="/privacidad/politica-de-privicidad" element={<PoliticaDePrivacidad />} />
          </Route>

          {/* Rutas Privadas Cliente */}
          <Route element={
            <PrivateRoute>
              <ClientLayout />
            </PrivateRoute>
          }>
            <Route path="/Client_Dashboard" element={<ClientHome />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Rutas Privadas Admin */}
          <Route element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }>
            <Route path="/admin/dashboard" element={<DashboardAdmin />} />
            

           
          </Route>

          {/* Loading */}
          <Route path="/loading" element={<Loading />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouting;