import React from 'react'
import './App.css'
import './styles/admin.css'
import AppRouting from './routes/AppRouting.jsx'
import { Theme, ThemePanel } from "@radix-ui/themes";
import { AuthProvider } from './context/AuthContext.jsx';
import { NotificationProvider } from './context/NotificationContext.jsx';
import { ToastProvider, useToastContext } from './context/ToastContext.jsx';
import { LayoutTransitionProvider } from './context/LayoutTransitionContext.jsx';
import { ToastContainer } from './components/ui/Toast';

// Toast Container Component
const ToastContainerWrapper = () => {
  const { toasts, removeToast } = useToastContext();
  return <ToastContainer toasts={toasts} onRemove={removeToast} />;
};

function App() {
  return (
    <>
      <Theme accentColor="jade" grayColor="gray" panelBackground="solid" radius="small" scaling="90%">
        <AuthProvider>
          <NotificationProvider>
            <LayoutTransitionProvider>
              <ToastProvider>
                <AppRouting />
                <ToastContainerWrapper />
              </ToastProvider>
            </LayoutTransitionProvider>
          </NotificationProvider>
        </AuthProvider>
      </Theme> 
    </>
  )
}

export default App



