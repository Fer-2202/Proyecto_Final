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
const InfoInstitucional = React.lazy(() => import('../pages/Public/pages/InfoInstitucional.jsx'));

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
