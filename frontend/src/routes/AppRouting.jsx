import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../layouts/Layout';

import Home from '../pages/Home';

function AppRouting() {
  return (
<>
    <Router>
      <Routes>

        {/* Rute pública */}
        <Route element={<Layout/>}>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/contact" element={<h1>Contact</h1>} />
        </Route>

        {/* Ruta de auth */}
        <Route element={<Layout/>}>
          <Route path="/login" element={<h1>Login</h1>} />
          <Route path="/register" element={<h1>Register</h1>} />
          <Route path='/recuperar-contrasenia'/>
        </Route>

        {/* Rute privada */}
        <Route element={<Layout/>}>
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          <Route path="/profile" element={<h1>Profile</h1>} />
          <Route path="/settings" element={<h1>Settings</h1>} />
        </Route>


      </Routes>
    </Router>
</>
  )
}

export default AppRouting
