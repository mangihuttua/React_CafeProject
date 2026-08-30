import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import AppRoutes from "./routes/AppRoutes";
import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  </StrictMode>
);