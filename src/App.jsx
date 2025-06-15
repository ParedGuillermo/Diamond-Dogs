import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";  // Importar AdminRoute
import LoginRegister from "./pages/LoginRegister";
import Home from "./pages/Home";
import AdminUsuarios from "./pages/AdminUsuarios";
import Productos from "./pages/Productos";
import AdminProductos from "./pages/AdminProductos";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/productos" element={<Productos />} />
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
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
            <AdminRoute>  {/* Protegemos con AdminRoute */}
              <AdminProductos />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}
