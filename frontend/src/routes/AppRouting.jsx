import React, { Suspense } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';


/* Layout Publico */
const PublicLayout = React.lazy(() => import('../layouts/Public/PublicLayout.jsx'));
const Home = React.lazy(() => import('../pages/Public/Home.jsx'));

/* Layout Privado */
const ClientLayout = React.lazy(() => import('../layouts/Client/ClientLayout.jsx'));
const ClientHome = React.lazy(() => import('../pages/Clients/Home.jsx'));

/* Layout Admin */
const AdminLayout = React.lazy(() => import('../layouts/Admin/AdminLayout.jsx'));
const DashboardAdmin = React.lazy(() => import('../pages/Admin/Home.jsx'));

/* Auth */
const Login = React.lazy(() => import('../pages/Auth/Login.jsx'));
const Register = React.lazy(() => import('../pages/Auth/Register.jsx'));
const ForgotPassword = React.lazy(() => import('../pages/Auth/ForgotPassword.jsx'));
const PrivateRoute = React.lazy(() => import('./PrivateRoute.jsx'));

/* Pages */
const Profile = React.lazy(() => import('../pages/Profile.jsx'));
const Loading = React.lazy(() => import('../pages/Loading.jsx'));
const InfoInstitucional = React.lazy(() => import('./../pages/Public/pages/Quienes_Somos/Pages/Info_Institucional.jsx'));



/* /quienes-somos */
const Historia = React.lazy(() => import('./../pages/Public/pages/Quienes_Somos/Pages/Historia.jsx'));
const Equipo = React.lazy(() => import('./../pages/Public/pages/Quienes_Somos/Pages/Equipo.jsx'));
const TransparenciaInstitucional = React.lazy(() => import('./../pages/Public/pages/Quienes_Somos/Pages/Transparencia_Institucional.jsx'));

/* /exhibiciones-y-servicios */
const Exhibiciones = React.lazy(() => import('../pages/Public/pages/Exhibiciones_Y_Servicios/Pages/Exhibiciones.jsx'));

const ServiciosEducativos = React.lazy(() => import('../pages/Public/pages/Exhibiciones_Y_Servicios/Pages/Servicio_Educativo.jsx'));
const VisitasGuiadas = React.lazy(() => import('../pages/Public/pages/Exhibiciones_Y_Servicios/Pages/Visita_Guiada.jsx'));

/* /acuicultura-y-biotecnologia-marina */
const AcuiculturaYBiotecnologiaMarina = React.lazy(() => import('../pages/Public/pages/AcuiculturaYBiotecnologiaMarina.jsx'));
const CentroDeRescateYRehabilitacion = React.lazy(() => import('../pages/Public/pages/CentroDeRescateYRehabilitacion.jsx'));
const Investigacion = React.lazy(() => import('../pages/Public/pages/investigacion.jsx'));
const Proyectos = React.lazy(() => import('../pages/Public/pages/Proyectos.jsx'));

/* /apoyo */
const Voluntariado = React.lazy(() => import('../pages/Public/pages/Voluntariado.jsx'));
const Donaciones = React.lazy(() => import('../pages/Public/pages/Donaciones.jsx'));

/* /purchase-form */
const Ticketera = React.lazy(() => import('../pages/Public/pages/Ticketera.jsx'));

/* /terminos-y-condiciones */
const Terminos = React.lazy(() => import('../pages/Public/pages/Terminos.jsx'));

/* /privacidad */
const PoliticaDePrivacidad = React.lazy(() => import('../pages/Public/pages/PoliticaDePrivacidad.jsx'))




function AppRouting() {
  return (
  <BrowserRouter>
    <Suspense fallback={<Loading/>}>
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
        <Route path="/apoyo/donaciones" element={<Donaciones />} />

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
