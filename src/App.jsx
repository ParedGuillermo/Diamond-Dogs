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
import Pedidos from "./pages/Pedidos"; // ⬅️ ✅ IMPORTANTE
import Trakeo from "./pages/Trakeo";   // ⬅️ NUEVA PÁGINA TRACKEO

// Guía del Recluta
import GuiaRecluta from "./pages/GuiaRecluta";
import QueEsVapear from "./pages/GuiaDelRecluta/QueEsVapear";
import ComoEmpezar from "./pages/GuiaDelRecluta/ComoEmpezar";
import VapersIniciales from "./pages/GuiaDelRecluta/VapersIniciales";
import ErroresComunes from "./pages/GuiaDelRecluta/ErroresComunes";
import MiPerfil from "./pages/MiPerfil";

import { CartProvider } from "./assets/context/CartContext";

export default function App() {
  return (
    <Router>
      <CartProvider>
        <LayoutMobile>
          <Routes>
            <Route path="/login" element={<LoginRegister />} />
            <Route path="/productos" element={<Productos />} />

            {/* Guía del Recluta */}
            <Route path="/guia-del-recluta" element={<GuiaRecluta />} />
            <Route path="/guia-del-recluta/que-es-vapear" element={<QueEsVapear />} />
            <Route path="/guia-del-recluta/como-empezar" element={<ComoEmpezar />} />
            <Route path="/guia-del-recluta/vapers-iniciales" element={<VapersIniciales />} />
            <Route path="/guia-del-recluta/errores-comunes" element={<ErroresComunes />} />

            {/* Perfil protegido */}
            <Route
              path="/mi-perfil"
              element={
                <ProtectedRoute>
                  <MiPerfil />
                </ProtectedRoute>
              }
            />

            {/* Página pública de seguimiento de pedidos */}
            <Route path="/trakeo" element={<Trakeo />} />

            {/* Inicio */}
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
            <Route
              path="/pedidos"
              element={
                <AdminRoute>
                  <Pedidos />
                </AdminRoute>
              }
            />
          </Routes>
        </LayoutMobile>
      </CartProvider>
    </Router>
  );
}
