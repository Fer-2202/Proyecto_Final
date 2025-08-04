import React, {Suspense} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ToastifyContainer from '@/components/shared/ToastifyContainer';
import { PublicLayout } from '../layouts';
import { Home, Login, Register } from '../pages';

function AppRouting() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <ToastifyContainer />
        <Routes>
          <Route path='/' element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default AppRouting
