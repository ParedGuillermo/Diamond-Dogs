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

// Páginas nuevas
import GuiaRecluta from "./pages/GuiaRecluta";
import QueEsVapear from "./pages/GuiaDelRecluta/QueEsVapear";
import ComoEmpezar from "./pages/GuiaDelRecluta/ComoEmpezar";
import VapersIniciales from "./pages/GuiaDelRecluta/VapersIniciales";
import ErroresComunes from "./pages/GuiaDelRecluta/ErroresComunes";
import MiPerfil from "./pages/MiPerfil"; // <-- Agregada

import { CartProvider } from "./assets/context/CartContext";

export default function App() {
  return (
    <Router>
      <CartProvider>
        <LayoutMobile>
          <Routes>
            <Route path="/login" element={<LoginRegister />} />
            <Route path="/productos" element={<Productos />} />

            {/* Ruta nueva Guía del Recluta */}
            <Route path="/guia-del-recluta" element={<GuiaRecluta />} />
            <Route path="/guia-del-recluta/que-es-vapear" element={<QueEsVapear />} />
            <Route path="/guia-del-recluta/como-empezar" element={<ComoEmpezar />} />
            <Route path="/guia-del-recluta/vapers-iniciales" element={<VapersIniciales />} />
            <Route path="/guia-del-recluta/errores-comunes" element={<ErroresComunes />} />

            {/* Nueva ruta protegida: Mi Perfil */}
            <Route
              path="/mi-perfil"
              element={
                <ProtectedRoute>
                  <MiPerfil />
                </ProtectedRoute>
              }
            />

            {/* Inicio público */}
            <Route path="/" element={<Home />} />

            {/* Admin */}
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
