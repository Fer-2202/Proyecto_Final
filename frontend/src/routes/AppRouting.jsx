import React, { Suspense, useCallback } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import * as api from "../api/api.js"

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

/* Admin Forms */
const AnimalForm = React.lazy(() => import('../pages/Admin/forms/AnimalForm.jsx'));
const HabitatForm = React.lazy(() => import('../pages/Admin/forms/HabitatForm.jsx'));
const TicketForm = React.lazy(() => import('../pages/Admin/forms/TicketForm.jsx'));
const SectionForm = React.lazy(() => import('../pages/Admin/forms/SectionForm.jsx'));
const VisitForm = React.lazy(() => import('../pages/Admin/forms/VisitForm.jsx'));
const PurchaseOrderForm = React.lazy(() => import('../pages/Admin/forms/PurchaseOrderForm.jsx'));
const SpeciesForm = React.lazy(() => import('../pages/Admin/forms/SpeciesForm.jsx'));
const ConservationStatusForm = React.lazy(() => import('../pages/Admin/forms/ConservationStatusForm.jsx'));
const ProvinceForm = React.lazy(() => import('../pages/Admin/forms/ProvinceForm.jsx'));
const UserProfileForm = React.lazy(() => import('../pages/Admin/forms/UserProfileForm.jsx'));

function AppRouting() {
  // --- CREATE HANDLERS ---
  const handleCreateAnimal = useCallback((animalData) => {
    api.createAnimal(animalData)
      .then(response => {
        console.log('Animal created successfully:', response);
        // Handle success (e.g., show a success message, redirect)
      })
      .catch(error => {
        console.error('Error creating animal:', error);
        // Handle error (e.g., show an error message)
      });
  }, []);

  const handleCreateHabitat = useCallback((habitatData) => {
    api.createHabitat(habitatData)
      .then(response => {
        console.log('Habitat created successfully:', response);
        // Handle success (e.g., show a success message, redirect)
        
      })
      .catch(error => {
        console.error('Error creating habitat:', error);
        // Handle error (e.g., show an error message)
      });
  }, []);

  const handleCreateTicket = useCallback((ticketData) => {
    api.createTicket(ticketData)
      .then(response => {
        console.log('Ticket created successfully:', response);
        // Handle success (e.g., show a success message, redirect)
      })
      .catch(error => {
        console.error('Error creating ticket:', error);
        // Handle error (e.g., show an error message)
      });
  }, []);

  const handleCreateSection = useCallback((sectionData) => {
    api.createSection(sectionData)
      .then(response => {
        console.log('Section created successfully:', response);
        // Handle success (e.g., show a success message, redirect)
      })
      .catch(error => {
        console.error('Error creating section:', error);
        // Handle error (e.g., show an error message)
      });
  }, []);

  const handleCreateVisit = useCallback((visitData) => {
    api.createVisit(visitData)
      .then(response => {
        console.log('Visit created successfully:', response);
        // Handle success (e.g., show a success message, redirect)
      })
      .catch(error => {
        console.error('Error creating visit:', error);
        // Handle error (e.g., show an error message)
      });
  }, []);

  const handleCreatePurchaseOrder = useCallback((purchaseOrderData) => {
    api.createPurchaseOrder(purchaseOrderData)
      .then(response => {
        console.log('Purchase order created successfully:', response);
        // Handle success (e.g., show a success message, redirect)
      })
      .catch(error => {
        console.error('Error creating purchase order:', error);
        // Handle error (e.g., show an error message)
      });
  }, []);

  const handleCreateSpecies = useCallback((speciesData) => {
    api.createSpecies(speciesData)
      .then(response => {
        console.log('Species created successfully:', response);
        // Handle success (e.g., show a success message, redirect)
      })
      .catch(error => {
        console.error('Error creating species:', error);
        // Handle error (e.g., show an error message)
      });
  }, []);

  const handleCreateConservationStatus = useCallback((conservationStatusData) => {
    api.createConservationStatus(conservationStatusData)
      .then(response => {
        console.log('Conservation status created successfully:', response);
        // Handle success (e.g., show a success message, redirect)
      })
      .catch(error => {
        console.error('Error creating conservation status:', error);
        // Handle error (e.g., show an error message)
      });
  }, []);

  const handleCreateProvince = useCallback((provinceData) => {
    api.createProvince(provinceData)
      .then(response => {
        console.log('Province created successfully:', response);
        // Handle success (e.g., show a success message, redirect)
      })
      .catch(error => {
        console.error('Error creating province:', error);
        // Handle error (e.g., show an error message)
      });
  }, []);

  const handleCreateUserProfile = useCallback((userProfileData) => {
    api.createUserProfile(userProfileData)
      .then(response => {
        console.log('User profile created successfully:', response);
        // Handle success (e.g., show a success message, redirect)
      })
      .catch(error => {
        console.error('Error creating user profile:', error);
        // Handle error (e.g., show an error message)
      });
  }, []);

  return (
    <BrowserRouter>
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
            <Route path="/admin/logs" element={<LogsAdmin />} />

            {/* CRUD Routes Admin */}
            <Route path="/admin/animals/new" element={<AnimalForm mode="create" onCreate={handleCreateAnimal} />} />
            <Route path="/admin/animals/:id/edit" element={<AnimalForm mode="edit"  />} />
            <Route path="/admin/habitats/new" element={<HabitatForm mode="create" onCreate={handleCreateHabitat} />} />
            <Route path="/admin/habitats/:id/edit" element={<HabitatForm mode="edit" />} />
            <Route path="/admin/tickets/new" element={<TicketForm mode="create" onCreate={handleCreateTicket} />} />
            <Route path="/admin/tickets/:id/edit" element={<TicketForm mode="edit" />} />
            <Route path="/admin/sections/new" element={<SectionForm mode="create" onCreate={handleCreateSection} />} />
            <Route path="/admin/sections/:id/edit" element={<SectionForm mode="edit"  />} />
            <Route path="/admin/visits/new" element={<VisitForm mode="create" onCreate={handleCreateVisit} />} />
            <Route path="/admin/visits/:id/edit" element={<VisitForm mode="edit" />} />
            <Route path="/admin/orders/new" element={<PurchaseOrderForm mode="create" onCreate={handleCreatePurchaseOrder} />} />
            <Route path="/admin/orders/:id/edit" element={<PurchaseOrderForm mode="edit"  />} />
            <Route path="/admin/species/new" element={<SpeciesForm mode="create" onCreate={handleCreateSpecies}  />} />
            <Route path="/admin/species/:id/edit" element={<SpeciesForm mode="edit" />} />
            <Route path="/admin/conservation-status/new" element={<ConservationStatusForm mode="create" onCreate={handleCreateConservationStatus} />} />
            <Route path="/admin/conservation-status/:id/edit" element={<ConservationStatusForm mode="edit" />} />
            <Route path="/admin/provinces/new" element={<ProvinceForm mode="create" onCreate={handleCreateProvince} />} />
            <Route path="/admin/provinces/:id/edit" element={<ProvinceForm mode="edit" />} />
            <Route
              path="/admin/animals/new"
              element={<AnimalForm mode="create" onCreate={handleCreateAnimal} />}
            />
            <Route path="/admin/animals/:id/edit" element={<AnimalForm mode="edit" />} />
            <Route
              path="/admin/habitats/new"
              element={<HabitatForm mode="create" onCreate={handleCreateHabitat} />}
            />
            <Route path="/admin/habitats/:id/edit" element={<HabitatForm mode="edit" />} />
            <Route
              path="/admin/tickets/new"
              element={<TicketForm mode="create" onCreate={handleCreateTicket} />}
            />
            <Route path="/admin/tickets/:id/edit" element={<TicketForm mode="edit" />} />
            <Route
              path="/admin/sections/new"
              element={<SectionForm mode="create" onCreate={handleCreateSection} />}
            />
            <Route path="/admin/sections/:id/edit" element={<SectionForm mode="edit" />} />
            <Route
              path="/admin/visits/new"
              element={<VisitForm mode="create" onCreate={handleCreateVisit} />}
            />
            <Route path="/admin/visits/:id/edit" element={<VisitForm mode="edit" />} />
            <Route
              path="/admin/orders/new"
              element={<PurchaseOrderForm mode="create" onCreate={handleCreatePurchaseOrder} />}
            />
            <Route path="/admin/orders/:id/edit" element={<PurchaseOrderForm mode="edit" />} />
            <Route
              path="/admin/species/new"
              element={<SpeciesForm mode="create" onCreate={handleCreateSpecies} />}
            />
            <Route path="/admin/species/:id/edit" element={<SpeciesForm mode="edit" />} />
            <Route
              path="/admin/conservation-status/new"
              element={<ConservationStatusForm mode="create" onCreate={handleCreateConservationStatus} />} />
            />
            <Route path="/admin/conservation-status/:id/edit" element={<ConservationStatusForm mode="edit" />} />
            <Route
              path="/admin/provinces/new"
              element={<ProvinceForm mode="create" onCreate={handleCreateProvince} />} />
            />
            <Route path="/admin/provinces/:id/edit" element={<ProvinceForm mode="edit" />} />
            <Route
              path="/admin/user-profiles/new"
              element={<UserProfileForm mode="create" onCreate={handleCreateUserProfile} />}
            />
            <Route path="/admin/user-profiles/:id/edit" element={<UserProfileForm mode="edit" />} />
          </Route>

          {/* Loading */}
          <Route path="/loading" element={<Loading />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouting;
