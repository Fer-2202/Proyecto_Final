import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
/* import './index.css' */
import App from "./App.jsx";
import "@radix-ui/themes/styles.css";
import "keen-slider/keen-slider.min.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { LayoutTransitionProvider } from "./context/LayoutTransitionContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LayoutTransitionProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </LayoutTransitionProvider>
  </StrictMode>
);