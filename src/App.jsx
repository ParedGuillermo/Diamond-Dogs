import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutMobile from "./components/LayoutMobile";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import LoginRegister from "./pages/LoginRegister";
import Home from "./pages/Home";
import AdminUsuarios from "./pages/AdminUsuarios";
import Productos from "./pages/Productos";
import AdminProductos from "./pages/AdminProductos";

import { CartProvider } from "./assets/context/CartContext";  // <-- ruta corregida

export default function App() {
  return (
    <Router>
      <CartProvider>
        <LayoutMobile>
          <Routes>
            <Route path="/login" element={<LoginRegister />} />
            <Route path="/productos" element={<Productos />} />

            {/* Inicio público, sin protección */}
            <Route path="/" element={<Home />} />

            {/* Rutas protegidas */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminUsuarios />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adminproductos"
              element={
                <AdminRoute>
                  <AdminProductos />
                </AdminRoute>
              }
            />
          </Routes>
        </LayoutMobile>
      </CartProvider>
    </Router>
  );
}
