import React from 'react'
import './App.css'
import AppRouting from './routes/AppRouting.jsx'
import { Theme, ThemePanel } from "@radix-ui/themes";
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NotificationProvider } from './context/NotificationContext.jsx';


function App() {


  return (
    <>
    <Theme accentColor="jade" grayColor="gray" panelBackground="solid" radius="small" scaling="90%">
        <AuthProvider>
          <NotificationProvider>
            <ToastContainer  />
            <AppRouting />
          </NotificationProvider>
        </AuthProvider>
      </Theme> 
    </>
  )
}

export default App



