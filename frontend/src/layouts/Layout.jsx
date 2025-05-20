import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { PAGE_TITLES } from '../constants/pageTitles';
import Navbar from './../components/navbar/Navbar';
 


function Layout() {

  const location = useLocation();

  useEffect(() => {
    const title = PAGE_TITLES[location.pathname];
    document.title = title;
  }, [location.pathname]);

  return (
<>
    <Navbar />
    <Outlet />
</>
  )
}

export default Layout
